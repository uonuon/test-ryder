import { bytesToHex, hexToBytes, hexToInt } from '@stacks/common';
import { StacksNetwork } from '@stacks/network';
import {
  AddressVersion,
  AnchorMode,
  AuthType,
  MessageSignature,
  PubKeyEncoding,
  SingleSigSpendingCondition,
  StacksPrivateKey,
  StacksTransaction,
  UnsignedTokenTransferOptions,
  broadcastTransaction,
  createMessageSignature,
  createStacksPublicKey,
  makeSigHashPreSign,
  makeUnsignedSTXTokenTransfer,
  publicKeyFromSignatureVrs,
  publicKeyToAddress,
} from '@stacks/transactions';
import * as fte from 'fast-text-encoding';
import { Dispatch } from 'react';
import { TransactionStateType } from '../src/Utils/transactions';
import { AppendLogger } from '../src/context/AppendLoggerContext';
import { signHash } from './ryder-one';
import { DerivationPath } from './ryder-one-apdus';
import { AccountsApi, MempoolApi, TransactionsApi } from '@stacks/blockchain-api-client';
console.log(fte);

export type SimpleStxTransaction = {
  derivationPath: DerivationPath;
  amountInUstx: number;
  recipient: string;
  fees: number;
  publicKey: string;
};

export type StacksAccount = {
  name: string;
  txState: TransactionStateType;
  totalUSD: number;
  txAmount: number;
};

export type StacksProps = {
  network: StacksNetwork;
  setNetwork: Dispatch<React.SetStateAction<StacksNetwork>>;
  currentAccount: StacksAccount;
  setCurrentAccount: Dispatch<React.SetStateAction<StacksAccount>>;
  pendingTxs: StacksTransaction[];
  setPendingTxs: Dispatch<React.SetStateAction<StacksTransaction[]>>;
  recentTxs: StacksTransaction[];
  setRecentTxs: Dispatch<React.SetStateAction<StacksTransaction[]>>;
  transactionsApi: TransactionsApi;
  mempoolApi: MempoolApi;
  accountsApi: AccountsApi;
};

export type MempoolTransaction = {
  tx_id: string;
};

export function createTxLink(txid: string, network: StacksNetwork) {
  return `https://explorer.hiro.so/txid/${txid}?chain=${network.isMainnet() ? 'mainnet' : 'testnet'}`;
}
export function pubKeyToAddr(publicKey: string, network: StacksNetwork) {
  return publicKeyToAddress(
    network.isMainnet() ? AddressVersion.MainnetSingleSig : AddressVersion.TestnetSingleSig,
    createStacksPublicKey(publicKey),
  );
}

export async function makeUnsignedTransferTransaction(
  tx: SimpleStxTransaction,
  network: StacksNetwork,
  nonce?: number
) {
  const publicKey = tx.publicKey;
  console.log(pubKeyToAddr(publicKey, network), publicKey);

  const options: UnsignedTokenTransferOptions = {
    recipient: tx.recipient,
    amount: tx.amountInUstx,
    anchorMode: AnchorMode.Any,
    network,
    fee: tx.fees,
    publicKey,
  };
  if (nonce)
    options.nonce = nonce;
  const stxTx = await makeUnsignedSTXTokenTransfer(options).catch((e) => {
    console.log(e, options);
  });
  if (stxTx === undefined) {
    return Promise.reject('Failed to create unsigned tx');
  }
  return stxTx;
}

export async function signStxTransaction(
  tx: SimpleStxTransaction,
  logger: AppendLogger,
  network: StacksNetwork,
) {
  console.log(`sign stx transaction`);
  const stxTx = await makeUnsignedTransferTransaction(tx, network);
  // start MCU
  const condition = stxTx.auth.spendingCondition as SingleSigSpendingCondition;
  let signHashBuffer = stxTx.signBegin();
  signHashBuffer = await makeSigHashPreSign(
    signHashBuffer,
    AuthType.Standard,
    condition.fee,
    condition.nonce,
  );
  const signatureDER = await signHash(0x01, hexToBytes(signHashBuffer), tx.derivationPath, logger);
  const signatureStx = signatureDERToStacksSignatureVrs(signatureDER);

  for (let v of [0, 1, 2, 3]) {
    try {
      const s = bytesToHex(new Uint8Array([v, ...signatureStx.slice(1)]));
      const signature = createMessageSignature(s);
      const pubkey1 = publicKeyFromSignatureVrs(
        signHashBuffer,
        signature,
        PubKeyEncoding.Compressed,
      );
      if (pubkey1 === tx.publicKey) {
        console.log('signature', bytesToHex(signatureDER), bytesToHex(signatureStx));
        condition.signature = signature;
        // end MCU
        return stxTx;
      }
    } catch (e) {
      // ignore
    }
  }
  return undefined;
}

export async function broadcastWithSignature(
  stxTx: StacksTransaction,
  signature: MessageSignature,
  network: StacksNetwork,
) {
  const condition = stxTx.auth.spendingCondition as SingleSigSpendingCondition;
  condition.signature = signature;
  return broadcastStxTransaction(stxTx, network);
}

export async function broadcastStxTransaction(signedTx: StacksTransaction, network: StacksNetwork) {
  try {
    console.log('raw tx', bytesToHex(signedTx.serialize()));
    signedTx.verifyOrigin();
    const result = await broadcastTransaction(signedTx, network);
    return result;
  } catch (e) {
    console.log(e, JSON.stringify(e));
    return undefined;
  }
}

function signatureDERToStacksSignatureVrs(signature: Uint8Array) {
  const lengthR = hexToInt(bytesToHex(signature.slice(4, 5)));
  const startR = 5 + (lengthR === 33 ? 1 : 0);
  const lengthS = hexToInt(bytesToHex(signature.slice(startR + 33, startR + 34)));
  const startS = startR + 34 + (lengthS === 33 ? 1 : 0);
  const s = BigInt('0x' + bytesToHex(signature.slice(startS, startS + 32)));

  const B256 = 2n ** 256n; // secp256k1 is short weierstrass curve
  const P = B256 - 0x1000003d1n; // curve's field prime
  const N = B256 - 0x14551231950b75fc4402da1732fc9bebfn; // curve (group) order
  const mod = (a: bigint, b = P) => {
    let r = a % b;
    return r >= 0n ? r : b + r;
  }; // mod division
  const moreThanHalfN = (n: bigint): boolean => n > N >> 1n; // if a number is bigger than CURVE.n/2
  let normS = s;
  if (moreThanHalfN(normS)) {
    normS = mod(-normS, N);
  }
  return new Uint8Array([
    0,
    ...signature.slice(startR, startR + 32),
    ...hexToBytes(normS.toString(16)),
  ]);
}

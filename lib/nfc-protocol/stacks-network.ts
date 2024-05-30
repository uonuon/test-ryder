global.Buffer = global.Buffer || require('buffer').Buffer;
import { HDKey } from '@scure/bip32';
import { bytesToHex, hexToBytes } from '@stacks/common';
import { StacksNetwork } from '@stacks/network';
import {
  SingleSigSpendingCondition,
  StacksTransaction,
  TransactionVersion,
  createMessageSignature,
  getAddressFromPublicKey,
} from '@stacks/transactions';
import * as fte from 'fast-text-encoding';
import { broadcastStxTransaction } from '../stacks';
console.log(fte);

export async function broadcastWithSignature(
  stxTx: StacksTransaction,
  signature: Uint8Array,
  network: StacksNetwork,
) {
  const condition = stxTx.auth.spendingCondition as SingleSigSpendingCondition;
  const sig = createMessageSignature(bytesToHex(signature));
  condition.signature = sig;
  return broadcastStxTransaction(stxTx, network);
}

// interface HDKeyOpt {
//   versions?: Versions;
//   depth?: number;
//   index?: number;
//   parentFingerprint?: number;
//   chainCode?: Uint8Array;
//   publicKey?: Uint8Array;
//   privateKey?: Uint8Array | bigint;
// }

// function testDerive() {
//   const testMasterchain = "0dffd8942337c12b9edfcbc478a0ed92b33fbad1ad04056ffff1063a27454b53261e5f475fc271998c95a2a1ed9cb93a6c6e7931dd2645f6134c6b1a6c5ef741";
//   const DERIVATION_PATH = "m/44'/5757'/0'/0/0";
//   const node = new HDKey({
//     depth: 0,
//     index: 0,
//     chainCode: hexToBytes(testMasterchain.substring(64, 128)),
//     privateKey: hexToBytes(testMasterchain.substring(0, 64))
//   });
//   const derived = node.derive(DERIVATION_PATH);
//   const pk = derived.publicKey as Uint8Array;
//   const firstStxAddress = getAddressFromPublicKey(pk, TransactionVersion.Testnet);
//   console.log("derive test", firstStxAddress);
// }

// this is the extended key for the Clarinet account on the STX account level
//extendedPublicKey = "52b92be6190bbb8db9fbc24e4bc8cf99bb692e97fc8446b350b2fe534688ff2fce0f5658e1b56250017b85fb328e8a654ea2046914da3f25313a3aae02a1462c";

export function publicKeyFromXtendedPubKey(extendedPublicKey: string, accountIndex: number) {
  let stxNode;
  console.log("decode pubkey", extendedPublicKey);
  if (extendedPublicKey.substring(0, 4) === "xpub")
    stxNode = HDKey.fromExtendedKey(extendedPublicKey);
  else
    stxNode = new HDKey({
      depth: 4,
      index: 0,
      chainCode: hexToBytes(extendedPublicKey.substring(64, 128)),
      privateKey: hexToBytes(extendedPublicKey.substring(0, 64))
    });
  console.log(stxNode.publicExtendedKey);
  const firstStxNode = stxNode.deriveChild(accountIndex);
  const pubKey = firstStxNode.publicKey as Uint8Array;
  console.log(bytesToHex(pubKey));
  const firstStxAddress = getAddressFromPublicKey(pubKey, TransactionVersion.Testnet);
  console.log(firstStxAddress);
  return pubKey;
}

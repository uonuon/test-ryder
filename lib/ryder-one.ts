import { StacksTransaction, deserializeTransaction } from '@stacks/transactions';
import NfcProxy from '../src/NfcProxy';
import { AppendLogger } from '../src/context/AppendLoggerContext';
import { APDUs, DerivationPath } from './ryder-one-apdus';
import { bytesToHex } from '@stacks/common';

export type RyderOneKey = string;
export const RYDER_ONE_AID = '01020304050001';
const DERIVATION_INDEX_MAX_VALUE = 268435455; // uint31

export const derivationPathStringToArray = (derivationPath: string): DerivationPath => {
  const pathArray = derivationPath.split('/');
  pathArray.shift();
  const path: DerivationPath = pathArray.map((component) => ({
    hardened: component.slice(-1) === "'",
    index: parseInt(component),
  }));
  if (path.find((component) => component.index > DERIVATION_INDEX_MAX_VALUE) !== undefined) {
    console.error('one of the indexes is too high');
    return [];
  }
  return path;
};

export async function pairDevice({setupWallet, logger}: {setupWallet: boolean, logger: AppendLogger}): Promise<RyderOneKey> {
  const [result, responses] = (await NfcProxy.customSelectAndTransceiveIsoDep(
    setupWallet ? 
    [
      APDUs.getTagInfo(),
      APDUs.setupWallet(),
      APDUs.exportPublicKey([
        { hardened: true, index: 0 },
        { hardened: true, index: 0 },
        { hardened: true, index: 0 }
      ]),
      APDUs.retrieveResult(),
    ]:
    [
      APDUs.getTagInfo(),
      APDUs.exportPublicKey([
        { hardened: true, index: 0 },
        { hardened: true, index: 0 },
        { hardened: true, index: 0 }
      ]),
      APDUs.retrieveResult(),
    ],
    logger,
    'Pair device',
  )) as [boolean, number[][]];
  console.log('pairDevice', result, responses);
  if (result) {
    return bytesToHex(new Uint8Array(responses[setupWallet ? 3: 2]));
  } else {
    return '';
  }
}

export async function exportPublicKey(
  path: DerivationPath,
  logger: AppendLogger,
): Promise<number[]> {
  const [result, responses] = (await NfcProxy.customSelectAndTransceiveIsoDep(
    [APDUs.exportPublicKey(path)],
    logger,
    'Export public key',
  )) as [boolean, number[][]];
  if (result) {
    const responsePubKey = responses[0].slice(1, -2);
    return responsePubKey;
  }
  return Promise.reject('Error exporting public key');
}

export async function exportXtendedPublicKey(
  logger: AppendLogger,
): Promise<number[]> {
  const [result, responses] = (await NfcProxy.customSelectAndTransceiveIsoDep(
    [APDUs.exportXtendedPubKeyPublicKey()],
    logger,
    'Export extended public key',
  )) as [boolean, number[][]];
  if (result) {
    const responsePubKey = responses[0].slice(1, -2);
    return responsePubKey;
  }
  return Promise.reject('Error exporting extended public key');
}


export async function signHash(
  hashType: number,
  hashBuffer: Uint8Array,
  derivationPath: DerivationPath,
  logger: AppendLogger,
): Promise<Uint8Array> {
  console.log('sign hash');
  const [result, responses] = await NfcProxy.customSelectAndTransceiveIsoDep(
    [
      APDUs.signHashRequest(hashType, hashBuffer, derivationPath),
      APDUs.debugUserConfirm(),
      APDUs.retrieveResult(),
    ],
    logger,
    'Sign hash',
  ).catch((e) => {
    console.log('error', e);
    return [false, [[]]];
  });

  if (result) {
    return new Uint8Array(responses[2].slice(0, -2));
  }
  return Promise.reject('Error signing hash');
}


export async function signStxTransferTransaction(
  tx: StacksTransaction,
  derivationPath: DerivationPath,
  logger: AppendLogger,
): Promise<StacksTransaction> {
  console.log('sign tx transfer');
  const [result, responses] = await NfcProxy.customSelectAndTransceiveIsoDep(
    [
      APDUs.signStxTransactionRequest(tx, derivationPath),
      APDUs.debugUserConfirm(),
      APDUs.retrieveResult(),
    ],
    logger,
    'Sign Stx Transfer',
  ).catch((e) => {
    console.log('error', e);
    return [false, [[]]];
  });

  if (result) {
    return deserializeTransaction(new Uint8Array(responses[2].slice(0, -2)));
  }
  return Promise.reject('Error signing stx transfer');
}

export async function requestBackupShare(logger: AppendLogger): Promise<Uint8Array> {
  const [result, responses] = (await NfcProxy.customSelectAndTransceiveIsoDep(
    [APDUs.getTagInfo()],
    logger,
    'Request backup share',
  )) as [boolean, number[][]];
  if (result) {
    return new Uint8Array();
  }
  return Promise.reject('Error requesting backup share');
}

export async function debugExportMasterChainCode(logger: AppendLogger): Promise<Uint8Array> {
  const [result, responses] = (await NfcProxy.customSelectAndTransceiveIsoDep(
    [APDUs.debugExportMasterChainCode()],
    logger,
    'Export master chain code',
  )) as [boolean, number[][]];
  if (result) {
    const masterChainCode = responses[0].slice(0, -2);
    console.log(Buffer.from(masterChainCode).toString('hex'));
    return new Uint8Array(masterChainCode);
  }
  return Promise.reject('Error exporting master chain code');
}

export async function tempPairDevice(logger: AppendLogger): Promise<Uint8Array> {
  const [result, responses] = (await NfcProxy.customSelectAndTransceiveIsoDep(
    [APDUs.getTagInfo()],
    logger,
    'Pair with Ryder One',
  )) as [boolean, number[][]];
  if (result) {
    return new Uint8Array();
  }
  return Promise.reject('Error requesting backup share');
}

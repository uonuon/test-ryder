import {bytesToHex, hexToBytes} from '@stacks/common';
import {NfcSession, RYDER_INSTRUCTION, RYDER_SETUP_FLOW} from '../../src/NfcProtocol';
import {derivationPathToBytes} from './derivation-path';
import {derivationPathStringToArray} from '../ryder-one';

export async function requestCreateWallet() {
  return await NfcSession('Tap to create wallet', async (session) => {
    const resultSetup = await session.sendCommand(
      RYDER_INSTRUCTION.Setup,
      RYDER_SETUP_FLOW.New,
      0x00,
      new Uint8Array(),
    );
    return {submitted: true};
  });
}

export async function setupWithKey(key: Uint8Array) {
  return await NfcSession('Tap to setup with key', async (session) => {
    const resultSetup = await session.sendCommand(
      RYDER_INSTRUCTION.Setup,
      RYDER_SETUP_FLOW.New,
      0x00,
      key,
    );
    return {submitted: true};
  });
}

export async function requestBackupAndXpubKeyStx(): Promise<{share: string; xPubKeyStx: string}> {
  const DERIVATION_PATH = "m/44'/5757'/0'/0";
  const path = derivationPathStringToArray(DERIVATION_PATH);

  return await NfcSession('Tap to get backup', async (session) => {
    const resultPublicKey = await session.sendCommand(
      RYDER_INSTRUCTION.GetPublicKey,
      0x01,
      0x00,
      new Uint8Array(derivationPathToBytes(path)),
    );

    const resultGetShare = await session.sendCommand(
      RYDER_INSTRUCTION.GetShare,
      0x00,
      0x00,
      new Uint8Array(),
    );

    console.log(
      'receive xpub and backup share',
      bytesToHex(resultPublicKey),
      bytesToHex(resultGetShare),
    );

    return {xPubKeyStx: bytesToHex(resultPublicKey), share: bytesToHex(resultGetShare)};
  });
}

export async function requestXpubKeyStx(): Promise<{xPubKeyStx: string}> {
  const DERIVATION_PATH = "m/44'/5757'/0'/0";
  const path = derivationPathStringToArray(DERIVATION_PATH);
  return await NfcSession('Tap to get backup', async (session) => {
    const resultPublicKey = await session.sendCommand(
      RYDER_INSTRUCTION.GetPublicKey,
      0x01,
      0x00,
      new Uint8Array(derivationPathToBytes(path)),
    );

    return {xPubKeyStx: bytesToHex(resultPublicKey)};
  });
}

export async function sendBackupShare(share: string): Promise<{submitted: boolean}> {
  return await NfcSession('Tap to start backup', async (session) => {
    const resultGiveShare = await session.sendCommand(
      RYDER_INSTRUCTION.GiveShare,
      0x00,
      0x00,
      hexToBytes(share),
    );
    console.log(resultGiveShare);
    const resultSetup = await session.sendCommand(
      RYDER_INSTRUCTION.Setup,
      RYDER_SETUP_FLOW.RecoverWithTapSafe,
      0x00,
      new Uint8Array(),
    );
    console.log(resultSetup);
    return {submitted: true};
  });
}

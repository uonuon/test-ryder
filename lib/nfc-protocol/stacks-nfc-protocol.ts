import {StacksNetwork} from '@stacks/network';
import {SimpleStxTransaction, makeUnsignedTransferTransaction} from '../stacks';
import {NfcSession, RYDER_INSTRUCTION, RYDER_TRANSACTION_TYPE} from '../../src/NfcProtocol';
import {derivationPathToBytes} from './derivation-path';
import {StacksTransaction} from '@stacks/transactions';
import {bytesToHex} from '@stacks/common';

export async function signStxTransactionRequest(
  tx: SimpleStxTransaction,
  network: StacksNetwork,
): Promise<{submitted: boolean; unsignedTx: StacksTransaction}> {
  console.log(`sign stx transaction`);
  const stxTx = await makeUnsignedTransferTransaction(tx, network);

  return await NfcSession('Tap to send', async (session) => {
    console.log(bytesToHex(stxTx.serialize()));
    const responseSign = await session.sendCommand(
      RYDER_INSTRUCTION.SignTransaction,
      RYDER_TRANSACTION_TYPE.Stacks,
      0x00,
      new Uint8Array([...derivationPathToBytes(tx.derivationPath), ...stxTx.serialize()]),
    );
    return {submitted: responseSign[0] === 1, unsignedTx: stxTx};
  });
}

export async function getSignature(): Promise<Uint8Array> {
  console.log(`get signature`);

  return await NfcSession('Tap to recieve', async (session) => {
    const responseSign = await session.sendCommand(
      RYDER_INSTRUCTION.GetSignature,
      0x00,
      0x00,
      new Uint8Array(),
    );
    return responseSign;
  });
}

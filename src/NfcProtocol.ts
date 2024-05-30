import NfcManager, { Ndef, NfcError, NfcEvents, NfcTech } from 'react-native-nfc-manager';
global.Buffer = global.Buffer || require('buffer').Buffer;

import { Platform } from 'react-native';

enum LogLevel {
  ERROR = 1,
  INFO = 2,
  DEBUG = 3,
}

export enum NfcErrorCodes {
  UNKNOWN,
  FAILED,
  WAIT_BAD_RESPONSE,
  WAIT_UNEXPECTED_STATUS_CODE,
  CHAINED_ERROR,
  NO_ACTIVE_NFC_SESSION,
  VALUE_OUT_OF_BOUNDS,
  PAYLOAD_TOO_LONG,
}

const LOG_LEVEL = LogLevel.DEBUG;

const maxPayloadLength = 247;

export function assertByte(n: number) {
  if (n < 0 || n > 0xff)
    throw new NfcProtocolError(
      NfcErrorCodes.VALUE_OUT_OF_BOUNDS,
      undefined,
      `assertByte: ${n} is larger than 0xff`,
    );
}

export function assertUint16(n: number) {
  if (n < 0 || n > 0xffff)
    throw new NfcProtocolError(
      NfcErrorCodes.VALUE_OUT_OF_BOUNDS,
      undefined,
      `assertUint16: ${n} is larger than 0xffff`,
    );
}

export function assertUint32(n: number) {
  if (n < 0 || n > 0xffffffff)
    throw new NfcProtocolError(
      NfcErrorCodes.VALUE_OUT_OF_BOUNDS,
      undefined,
      `assertUint32: ${n} is larger than 0xffffffff`,
    );
}

export function assertMaxPayloadLength(length: number) {
  if (length > maxPayloadLength)
    throw new NfcProtocolError(
      NfcErrorCodes.PAYLOAD_TOO_LONG,
      undefined,
      `assertMaxPayloadLength: ${length} is larger than ${maxPayloadLength}`,
    );
}

function concatUint8Arrays(a: Uint8Array, b: Uint8Array) {
  const c = new Uint8Array(a.byteLength + b.byteLength);
  c.set(a, 0);
  c.set(b, a.byteLength);
  return c;
}

export const RYDER_ONE_CLA = 0xd1;

export enum RYDER_INSTRUCTION {
  Setup = 0x06,
  SignTransaction = 0x07,
  GetSignature = 0x08,
  GetPublicKey = 0x09,
  GetShare = 0x0a,
  GiveShare = 0x0b,
  BeginUpdateFirmware = 0x0c,
  UpdateFirmware = 0x0d,
}

export enum RYDER_TRANSACTION_TYPE {
  Stacks = 0x00,
}

export enum RYDER_SETUP_FLOW {
  New = 0x01,
  RecoverWithTapSafe = 0x02,
  RecoverWithSeedPhrase = 0x03,
}

export const APDUs = {
  sendCommand: (command: number, p1: number, p2: number, commandLength: number): Uint8Array => {
    assertByte(command);
    assertByte(p1);
    assertByte(p2);
    assertUint16(commandLength);
    return new Uint8Array([
      RYDER_ONE_CLA,
      command,
      p1,
      p2,
      0x02,
      (commandLength >> 8) & 0xff,
      commandLength & 0xff,
    ]);
  },

  writeCommandData: (commandData: Uint8Array): Uint8Array => {
    assertMaxPayloadLength(commandData.byteLength);
    const result = new Uint8Array(5 + commandData.byteLength);
    result.set([RYDER_ONE_CLA, 0x02, 0x00, 0x00, commandData.length], 0);
    result.set(commandData, 5);
    return result;
  },

  readResponse: (): Uint8Array => {
    return new Uint8Array([RYDER_ONE_CLA, 0x03, 0x00, 0x00]);
  },

  readResponseData: (): Uint8Array => {
    return new Uint8Array([RYDER_ONE_CLA, 0x04, 0x00, 0x00]);
  },

  readResponseDataReceived: (): Uint8Array => {
    return new Uint8Array([RYDER_ONE_CLA, 0x05, 0x00, 0x00]);
  },
};

export class NfcProtocolError extends Error {
  public readonly nfcErrorCode: NfcErrorCodes;
  public readonly previousError: Error | undefined;
  constructor(
    errorCode: NfcErrorCodes,
    previousError: Error | undefined = undefined,
    message: string | undefined = undefined,
  ) {
    super(message);
    this.nfcErrorCode = errorCode;
    this.previousError = previousError;
  }
}

const crc32sum_table = [
  0x00000000, 0x04c11db7, 0x09823b6e, 0x0d4326d9, 0x130476dc, 0x17c56b6b, 0x1a864db2, 0x1e475005,
  0x2608edb8, 0x22c9f00f, 0x2f8ad6d6, 0x2b4bcb61, 0x350c9b64, 0x31cd86d3, 0x3c8ea00a, 0x384fbdbd,
  0x4c11db70, 0x48d0c6c7, 0x4593e01e, 0x4152fda9, 0x5f15adac, 0x5bd4b01b, 0x569796c2, 0x52568b75,
  0x6a1936c8, 0x6ed82b7f, 0x639b0da6, 0x675a1011, 0x791d4014, 0x7ddc5da3, 0x709f7b7a, 0x745e66cd,
  0x9823b6e0, 0x9ce2ab57, 0x91a18d8e, 0x95609039, 0x8b27c03c, 0x8fe6dd8b, 0x82a5fb52, 0x8664e6e5,
  0xbe2b5b58, 0xbaea46ef, 0xb7a96036, 0xb3687d81, 0xad2f2d84, 0xa9ee3033, 0xa4ad16ea, 0xa06c0b5d,
  0xd4326d90, 0xd0f37027, 0xddb056fe, 0xd9714b49, 0xc7361b4c, 0xc3f706fb, 0xceb42022, 0xca753d95,
  0xf23a8028, 0xf6fb9d9f, 0xfbb8bb46, 0xff79a6f1, 0xe13ef6f4, 0xe5ffeb43, 0xe8bccd9a, 0xec7dd02d,
  0x34867077, 0x30476dc0, 0x3d044b19, 0x39c556ae, 0x278206ab, 0x23431b1c, 0x2e003dc5, 0x2ac12072,
  0x128e9dcf, 0x164f8078, 0x1b0ca6a1, 0x1fcdbb16, 0x018aeb13, 0x054bf6a4, 0x0808d07d, 0x0cc9cdca,
  0x7897ab07, 0x7c56b6b0, 0x71159069, 0x75d48dde, 0x6b93dddb, 0x6f52c06c, 0x6211e6b5, 0x66d0fb02,
  0x5e9f46bf, 0x5a5e5b08, 0x571d7dd1, 0x53dc6066, 0x4d9b3063, 0x495a2dd4, 0x44190b0d, 0x40d816ba,
  0xaca5c697, 0xa864db20, 0xa527fdf9, 0xa1e6e04e, 0xbfa1b04b, 0xbb60adfc, 0xb6238b25, 0xb2e29692,
  0x8aad2b2f, 0x8e6c3698, 0x832f1041, 0x87ee0df6, 0x99a95df3, 0x9d684044, 0x902b669d, 0x94ea7b2a,
  0xe0b41de7, 0xe4750050, 0xe9362689, 0xedf73b3e, 0xf3b06b3b, 0xf771768c, 0xfa325055, 0xfef34de2,
  0xc6bcf05f, 0xc27dede8, 0xcf3ecb31, 0xcbffd686, 0xd5b88683, 0xd1799b34, 0xdc3abded, 0xd8fba05a,
  0x690ce0ee, 0x6dcdfd59, 0x608edb80, 0x644fc637, 0x7a089632, 0x7ec98b85, 0x738aad5c, 0x774bb0eb,
  0x4f040d56, 0x4bc510e1, 0x46863638, 0x42472b8f, 0x5c007b8a, 0x58c1663d, 0x558240e4, 0x51435d53,
  0x251d3b9e, 0x21dc2629, 0x2c9f00f0, 0x285e1d47, 0x36194d42, 0x32d850f5, 0x3f9b762c, 0x3b5a6b9b,
  0x0315d626, 0x07d4cb91, 0x0a97ed48, 0x0e56f0ff, 0x1011a0fa, 0x14d0bd4d, 0x19939b94, 0x1d528623,
  0xf12f560e, 0xf5ee4bb9, 0xf8ad6d60, 0xfc6c70d7, 0xe22b20d2, 0xe6ea3d65, 0xeba91bbc, 0xef68060b,
  0xd727bbb6, 0xd3e6a601, 0xdea580d8, 0xda649d6f, 0xc423cd6a, 0xc0e2d0dd, 0xcda1f604, 0xc960ebb3,
  0xbd3e8d7e, 0xb9ff90c9, 0xb4bcb610, 0xb07daba7, 0xae3afba2, 0xaafbe615, 0xa7b8c0cc, 0xa379dd7b,
  0x9b3660c6, 0x9ff77d71, 0x92b45ba8, 0x9675461f, 0x8832161a, 0x8cf30bad, 0x81b02d74, 0x857130c3,
  0x5d8a9099, 0x594b8d2e, 0x5408abf7, 0x50c9b640, 0x4e8ee645, 0x4a4ffbf2, 0x470cdd2b, 0x43cdc09c,
  0x7b827d21, 0x7f436096, 0x7200464f, 0x76c15bf8, 0x68860bfd, 0x6c47164a, 0x61043093, 0x65c52d24,
  0x119b4be9, 0x155a565e, 0x18197087, 0x1cd86d30, 0x029f3d35, 0x065e2082, 0x0b1d065b, 0x0fdc1bec,
  0x3793a651, 0x3352bbe6, 0x3e119d3f, 0x3ad08088, 0x2497d08d, 0x2056cd3a, 0x2d15ebe3, 0x29d4f654,
  0xc5a92679, 0xc1683bce, 0xcc2b1d17, 0xc8ea00a0, 0xd6ad50a5, 0xd26c4d12, 0xdf2f6bcb, 0xdbee767c,
  0xe3a1cbc1, 0xe760d676, 0xea23f0af, 0xeee2ed18, 0xf0a5bd1d, 0xf464a0aa, 0xf9278673, 0xfde69bc4,
  0x89b8fd09, 0x8d79e0be, 0x803ac667, 0x84fbdbd0, 0x9abc8bd5, 0x9e7d9662, 0x933eb0bb, 0x97ffad0c,
  0xafb010b1, 0xab710d06, 0xa6322bdf, 0xa2f33668, 0xbcb4666d, 0xb8757bda, 0xb5365d03, 0xb1f740b4,
];

const okResponse = [0x90, 0x00];

function reverse_uint8_t(val) {
  let tmp = 0;
  for (let i = 0; i < 8; i++) {
    tmp |= ((val >> i) & 0x01) << (7 - i);
  }
  return tmp;
}

function reverse_uint32_t(val) {
  let tmp = 0;
  for (let i = 0; i < 32; i++) {
    tmp |= ((val >> i) & 0x01) << (31 - i);
  }
  return tmp;
}

function crc32sum_update(crc: number, data: Uint8Array): number {
  for (let i = 0; i < data.length; ++i) {
    crc =
      ((crc << 8) & 0xffffffff) ^ crc32sum_table[((crc >> 24) & 0xff) ^ reverse_uint8_t(data[i])];
  }
  return crc;
}

export function crc32sum(data: Uint8Array): number {
  return reverse_uint32_t(crc32sum_update(0xffffffff, data)) ^ 0xffffffff;
}

function chunkArray(array: Uint8Array, chunkSize: number): Uint8Array[] {
  let result: Uint8Array[] = [];
  for (let i = 0, end = Math.ceil(array.length / chunkSize); i < end; ++i)
    result.push(array.slice(i * chunkSize, (i + 1) * chunkSize));
  return result;
}

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

function arraysEqual(a: ArrayLike<any>, b: ArrayLike<any>): boolean {
  if (a === b) return true;
  if (!a || !b) return false;
  if (a.length !== b.length) return false;
  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function isOk(response: Uint8Array) {
  return arraysEqual([0x90, 0x00], response);
}

function byteArrayToString(array: Uint8Array | number[]) {
  return Buffer.from(array).toString('hex');
}

function log(level: LogLevel, ...args: any[]) {
  if (level <= LOG_LEVEL) console.log.apply(this, args);
}

export async function nfcTranceive(payload: Uint8Array): Promise<Uint8Array> {
  log(LogLevel.DEBUG, '>>> ' + byteArrayToString(payload));
  const response = await NfcManager.isoDepHandler.transceive([...payload]); // can we get rid of this conversion?
  log(LogLevel.DEBUG, '<<< ' + byteArrayToString(response));
  return new Uint8Array(response);
}

async function waitRyderReady(readCommand: Uint8Array, delayMs: number = 10) {
  const errorState = new Uint8Array([0x6f, 0x07]);
  let response = errorState.slice();
  while (arraysEqual(errorState, response)) {
    await delay(delayMs);
    response = await nfcTranceive(readCommand);
  }
  if (response.length < 2) throw new NfcProtocolError(NfcErrorCodes.WAIT_BAD_RESPONSE);
  const responseCode = response.slice(response.length - 2);
  if (!arraysEqual(okResponse, responseCode)) {
    console.error(response);
    throw new NfcProtocolError(NfcErrorCodes.WAIT_UNEXPECTED_STATUS_CODE);
  }
  return response.slice(0, response.length - 2);
}

export class ActiveNfcSession {
  private active: boolean = true;
  assertIsActive() {
    if (!this.active) throw new NfcProtocolError(NfcErrorCodes.NO_ACTIVE_NFC_SESSION);
  }
  async sendCommand(command: number, p1: number, p2: number, commandData: Uint8Array) {
    this.assertIsActive();
    command &= 0xff;
    p1 &= 0xff;
    p2 &= 0xff;

    const commandLength = commandData.length;
    log(LogLevel.DEBUG, 'new sendCommand function');
    const resp = await nfcTranceive(APDUs.sendCommand(command, p1, p2, commandLength));
    if (!isOk(resp)) throw new Error('Response to initial command was not OK');

    const chunkSize = 247;
    const commandDataSlices = chunkArray(commandData, chunkSize);
    // log(LogLevel.DEBUG, `command data slices ${commandDataSlices}`);

    for (const slice of commandDataSlices) {
      const result = await nfcTranceive(APDUs.writeCommandData(slice));
      if (!isOk(result)) throw new Error('writeCommandData failed');
    }

    const payloadLenBytes = await waitRyderReady(APDUs.readResponse());
    const payloadLen = (payloadLenBytes[0] << 8) + payloadLenBytes[1];
    const payloadType = payloadLenBytes[2];
    //TODO- deal with payloadType
    log(LogLevel.DEBUG, `Payload type ${payloadType}, length: ${payloadLen}`);

    let responseData = new Uint8Array(0);
    if (payloadLen > 0) {
      log(LogLevel.DEBUG, `Going to read ${payloadLen} response bytes`);
      while (responseData.length < payloadLen) {
        const read = await waitRyderReady(APDUs.readResponseData());
        responseData = concatUint8Arrays(responseData, read);
      }
      log(LogLevel.DEBUG, 'Response data:', responseData);
    }
    await nfcTranceive(APDUs.readResponseDataReceived()); // seems like await is necessary after all

    return responseData;
  }
  end() {
    this.active = false;
  }
}

export type SessionCallback = (session: ActiveNfcSession) => Promise<any>;

export async function NfcSession(
  message: string,
  callback: SessionCallback,
  restartOnIosTimeout = false,
): Promise<any> {
  const ios = Platform.OS === 'ios';
  let session = new ActiveNfcSession();
  //TODO- absility to split NfcSession into 20 second chunks on iOS
  try {
    await NfcManager.requestTechnology(NfcTech.IsoDep, {
      alertMessage: `Tap your Ryder One - ${message}`,
    });
    return await callback(session);
  } catch (error) {
    console.log(error);
    throw new NfcProtocolError(NfcErrorCodes.CHAINED_ERROR, error);
  } finally {
    session.end();
    NfcManager.cancelTechnologyRequest();
  }
}

const firmwareUpdateSliceSize = 4096;

export async function firmwareUpdate(message: string, firmware: Uint8Array) {
  // This should not be computed within the NFC session callback because it might be slow and
  // result in a timeout
  let checksum = crc32sum(firmware);

  const result = await NfcSession(message, async (session) => {
    log(LogLevel.DEBUG, 'do firmware update');
    const commandData = new Uint8Array(8);
    let view = new DataView(commandData.buffer);
    view.setUint32(0, firmware.byteLength, false);
    view.setUint32(4, checksum, false);
    log(LogLevel.DEBUG, 'send command', commandData);
    const result = await session.sendCommand(
      RYDER_INSTRUCTION.BeginUpdateFirmware,
      0x00,
      0x00,
      commandData,
    );
    log(LogLevel.DEBUG, result);
    view = new DataView(result.buffer);
    const tooLarge = result[0] === 0x01;
    const invalidResume = result[1] === 0x01;

    if (tooLarge || invalidResume) return false; //TODO: handle

    const resumeIndex = view.getUint16(2, false);

    for (
      let i = resumeIndex, totalSent = resumeIndex * firmwareUpdateSliceSize;
      totalSent < firmware.byteLength;
      ++i
    ) {
      const data = firmware.slice(i * firmwareUpdateSliceSize, (i + 1) * firmwareUpdateSliceSize);
      const sliceLength = data.length;
      totalSent += sliceLength;

      const checksum = crc32sum(data);
      const payload = new Uint8Array(4 + data.byteLength);
      const view = new DataView(payload.buffer);
      view.setUint32(0, checksum, false);
      payload.set(data, 4);
      const response = await session.sendCommand(
        RYDER_INSTRUCTION.UpdateFirmware,
        (i >> 8) & 0xff,
        i & 0xff,
        payload,
      );
      //TODO: handle response codes. see https://github.com/Light-Labs/react-native-ryder-one-app/pull/6#discussion_r1574798570
      response[0] === 0x01;
      response[1] === 0x01;
      // if (!isOk(response))
      // 	throw new NfcProtocolError(NfcErrorCodes.FAILED);
    }

    return true;
  });

  return result;
}

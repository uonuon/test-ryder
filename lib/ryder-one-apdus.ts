global.Buffer = global.Buffer || require('buffer').Buffer;

import { buf as crc32buf } from "crc-32";

export enum HASH_TYPES {
  HASH_TYPE_SHA256 = 0x01,
  HASH_TYPE_KECCAK256 = 0x02,
};

export type Command = { type: string, payload: number[] };

export const RYDER_ONE_CLA = 0xd1;

export type DerivationPath = { hardened: boolean; index: number }[];

export function extendedApduLcBytes(dataLength: number): Uint8Array | null {
  if (dataLength > 65525)
    return null;
  if (dataLength < 255)
    return new Uint8Array([dataLength]);
  return new Uint8Array([dataLength >> 8, dataLength & 0xff]);
}

export function tempCalculateFirmwareChecksum(fileData: Uint8Array): number {
  return crc32buf(fileData);
}

export const APDUs = {
  selectApp: (aid: string) => {
    return {
      type: "command",
      payload: [
        0x00,
        0xa4,
        0x04,
        0x00,
        aid.length / 2,
        ...Buffer.from(aid, 'hex').values()
      ]
    };
  },
  getTagInfo: (): Command => {
    return { type: "command", payload: [RYDER_ONE_CLA, 0xb0, 0x00, 0x00] }
  },
  setupWallet: (): Command => {
    return { type: "command", payload: [RYDER_ONE_CLA, 0xc1, 0x00, 0x00] };
  },
  userCancel: (): Command => {
    return { type: "command", payload: [RYDER_ONE_CLA, 0xb1, 0x00, 0x00] };
  },
  firmwareUploadBegin: (firmwareSize: number, checksum: number): Command => {
    const payloadDataLength = 10;
    const u8array = new Uint8Array(payloadDataLength);
    const view = new DataView(u8array.buffer);
    view.setUint16(0, payloadDataLength - 2, false);
    // TODO- cap firmwareSize
    view.setUint32(2, firmwareSize, false);
    // TODO- check checksum size
    view.setUint32(6, checksum, false);
    return { type: "command", payload: [RYDER_ONE_CLA, 0x0c, 0x00, 0x00, payloadDataLength, ...u8array] };
  },

  sendCommand: (command: number, p1: number, p2: number, commandLength): Command => {
    return { type: "command", payload: [RYDER_ONE_CLA, command, p1, p2, 0x02, (commandLength >> 8) & 0xff, commandLength & 0xff] };
  },

  writeCommandData: (commandData: Uint8Array) => {
    if (commandData.length > 247)
      throw new Error("commandData slice too large");
    return { type: "command", payload: [RYDER_ONE_CLA, 0x02, 0x00, 0x00, commandData.length, ...commandData] };
  },

  updateFirmware: (dataSlice: Uint8Array): Command => {
    return { type: "command", payload: [RYDER_ONE_CLA, 0x0d, 0x00, 0x00] };
  },

  readResponse: (): Command => {
    return { type: "command", payload: [RYDER_ONE_CLA, 0x03, 0x00, 0x00] };
  },

  readResponseData: (): Command => {
    return { type: "command", payload: [RYDER_ONE_CLA, 0x04, 0x00, 0x00] };
  },

  readResponseDataReceived: (): Command => {
    return { type: "command", payload: [RYDER_ONE_CLA, 0x05, 0x00, 0x00] };
  },

  // firmwareUploadOld: (firmware: Uint8Array): Command[] => {
  //   const totalLength = firmware.byteLength;
  //   const startOffset = firmware.byteOffset;
  //   const headerTemplate = [RYDER_ONE_CLA, 0xc9, 0x00, 0x00, 0x00];
  //   const chunkSize = 253;
  //   const chunks = Math.ceil(totalLength / chunkSize);
  //   const newTotalLength = totalLength + (chunks * (headerTemplate.length));
  //   let commands: Command[] = [];
  //   let calculatedLength = 0;
  //   for (let i = 0; i < chunks; ++i) {
  //     const offset = chunkSize * i;
  //     const header = headerTemplate.slice();
  //     if (i === 0)
  //       header[3] |= 0x01; // set START FILE flag
  //     if (i === chunks - 1)
  //       header[3] |= 0x02; // set END FILE flag
  //     header[4] = (totalLength - offset) < chunkSize ? totalLength - offset : chunkSize;
  //     // const lc = 0x00;
  //     const cmd = { type: "command", payload: [...header, ...firmware.slice(startOffset + offset, startOffset + offset + header[4])] };
  //     calculatedLength += cmd.payload.length;
  //     commands.push(cmd);
  //   }
  //   if (newTotalLength !== calculatedLength)
  //     throw new Error(`Length does not match, ${newTotalLength} expected, got ${calculatedLength}`);
  //   return commands;
  // },

  signHashRequest: (hashType: HASH_TYPES, hash: Uint8Array, path: DerivationPath) => {
    if (hash.length !== 32)
      throw new Error('Invalid hash length (must be 32)');
    const signingVersion = 0x01;
    return {
      type: "command",
      payload: [
        RYDER_ONE_CLA,
        0xe0,
        signingVersion,
        hashType,
        32 + pathByteLength(path),
        ...hash,
        ...pathToByteBuffer(path)
      ]
    };
  },
  exportPublicKey: (path: DerivationPath) => {
    return {
      type: "command",
      payload: [
        RYDER_ONE_CLA,
        0xd0,
        0x00,
        0x00,
        pathByteLength(path),
        ...pathToByteBuffer(path)
      ]
    };
  },
  retrieveResult: () => {
    return {
      type: "command",
      payload: [
        RYDER_ONE_CLA,
        0xf0,
        0x00,
        0x00
      ]
    };
  },
  debugUserConfirm: () => {
    return { type: "command", payload: [RYDER_ONE_CLA, 0xff, 0x01, 0x01, 0x00] };
  },
  debugExportMasterChainCode: () => {
    return { type: "command", payload: [RYDER_ONE_CLA, 0xff, 0x11, 0x00] };
  },
  debugEraseWallet: () => {
    return { type: "command", payload: [RYDER_ONE_CLA, 0xff, 0x10, 0x00] };
  },
  debugExportConfirmBuffer: () => {
    return { type: "command", payload: [RYDER_ONE_CLA, 0xff, 0xfe, 0x00] };
  }
};

function pathByteLength(path: DerivationPath) {
  return path.length * 4 + 1;
}

function pathToByteBuffer(path: DerivationPath) {
  return [
    path.length,
    ...path
      .map((p) => {
        const value = p.hardened ? p.index + 0x80000000 : p.index;
        return [value, (value << 8), (value << 16), (value << 24)].map(z => z >>> 24);
      })
      .flat(),
  ];
}

export function isCommandOk(response: number[]) {
  let lastBytes = response.slice(-2);
  return lastBytes[0] == 0x90 && lastBytes[1] == 0x00;
}
import { Alert, Platform } from 'react-native';
import NfcManager, { Ndef, NfcError, NfcEvents, NfcTech } from 'react-native-nfc-manager';
import { getOutlet } from 'reconnect.js';
import { RYDER_ONE_AID } from '../lib/ryder-one';
import { APDUs } from '../lib/ryder-one-apdus';
import { OVERWRITE_LOGGER } from './context/AppendLoggerContext';

// import { buf as crc32buf } from "crc-32";

let beforeTransceive = null;



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
  0xafb010b1, 0xab710d06, 0xa6322bdf, 0xa2f33668, 0xbcb4666d, 0xb8757bda, 0xb5365d03, 0xb1f740b4
];

function crc32sum_update(crc, data) {
  for (let i = 0; i < data.length; ++i) {
    crc = ((crc << 8) & 0xffffffff) ^ crc32sum_table[((crc >> 24) & 0xff) ^ data[i]];
  }
  return crc;
}

export function crc32sum(data) {
  return crc32sum_update(0, data) ^ 0xffffffff;
}

function toHexString(payload) {
  return payload.map((b) => ('00' + b.toString(16)).slice(-2)).join(' ');
}

export function printChecksum(checksum) {
  const u8 = new Uint8Array(4);
  const v = new DataView(u8.buffer);
  v.setUint32(0, checksum, false);
  console.log(u8);
  return byteArrayToString([...u8]);
}

function isOk(response) {
  return arraysEqual([0x90, 0x00], response);
}

function setBeforeTransceive(callback) {
  beforeTransceive = callback;
}

function byteArrayToString(array) {
  return array.map((b) => ('00' + b.toString(16)).slice(-2)).join(' ');
}

function chunkArray(array, chunkSize) {
  let result = [];
  for (let i = 0, end = Math.ceil(array.length / chunkSize); i < end; ++i)
    result.push(array.slice(i * chunkSize, (i + 1) * chunkSize));
  return result;
}

async function nfcTranceive(payload) {
  console.log('>>> ' + byteArrayToString(payload));
  const response = await NfcManager.isoDepHandler.transceive(payload);
  console.log('<<< ' + byteArrayToString(response));
  return response;
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

async function waitRyderReady(readCommand, delayMs) {
  delayMs = delayMs || 10;
  const errorState = [0x6f, 0x07];
  let response = [...errorState];
  while (arraysEqual(errorState, response)) {
    await delay(delayMs);
    response = await nfcTranceive(readCommand.payload);
  }
  if (response.length < 2)
    throw new Error("Failed to read response, bad length");
  const responseCode = response.slice(response.length - 2);
  if (!arraysEqual([0x90, 0x00], responseCode)) {
    console.error(response);
    throw new Error("Failed to read response, unexpected status code");
  }
  return response.slice(0, response.length - 2);
}

class ErrSuccess extends Error { }

const withAndroidPrompt = (fn, msg) => {
  async function wrapper() {
    try {
      if (Platform.OS === 'android') {
        getOutlet('androidPrompt').update({
          visible: true,
          message: msg ? `Tap your Ryder - ${msg}` : 'Tap your Ryder',
        });
      }

      const resp = await fn.apply(null, arguments);

      if (Platform.OS === 'android') {
        getOutlet('androidPrompt').update({
          visible: true,
          message: 'Completed',
        });
      }

      return resp;
    } catch (ex) {
      console.log(ex);
      throw ex;
    } finally {
      if (Platform.OS === 'android') {
        setTimeout(() => {
          getOutlet('androidPrompt').update({
            visible: false,
          });
        }, 800);
      }
    }
  }

  return wrapper;
};

const handleException = (ex) => {
  if (ex instanceof NfcError.UserCancel) {
    // bypass
  } else if (ex instanceof NfcError.Timeout) {
    Alert.alert('NFC Session Timeout');
  } else {
    console.warn(ex);

    if (Platform.OS === 'ios') {
      NfcManager.invalidateSessionWithErrorIOS(`${ex}`);
    } else {
      Alert.alert('NFC Error', `${ex}`);
    }
  }
};

class NfcProxy {
  async init() {
    const supported = await NfcManager.isSupported();
    if (supported) {
      await NfcManager.start();
    }
    return supported;
  }

  async isEnabled() {
    return NfcManager.isEnabled();
  }

  async goToNfcSetting() {
    return NfcManager.goToNfcSetting();
  }

  readNdefOnce = withAndroidPrompt(() => {
    const cleanUp = () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.setEventListener(NfcEvents.SessionClosed, null);
    };

    return new Promise((resolve) => {
      let tagFound = null;

      NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
        tagFound = tag;
        resolve(tagFound);

        if (Platform.OS === 'ios') {
          NfcManager.setAlertMessageIOS('NDEF tag found');
        }

        NfcManager.unregisterTagEvent().catch(() => 0);
      });

      NfcManager.setEventListener(NfcEvents.SessionClosed, (error) => {
        if (error) {
          handleException(error);
        }

        cleanUp();
        if (!tagFound) {
          resolve();
        }
      });

      NfcManager.registerTagEvent();
    });
  });

  readTag = withAndroidPrompt(async () => {
    let tag = null;

    try {
      await NfcManager.requestTechnology([NfcTech.Ndef]);

      tag = await NfcManager.getTag();
      tag.ndefStatus = await NfcManager.ndefHandler.getNdefStatus();

      if (Platform.OS === 'ios') {
        await NfcManager.setAlertMessageIOS('Success');
      }
    } catch (ex) {
      // for tag reading, we don't actually need to show any error
      console.log(ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }

    return tag;
  });

  writeNdef = withAndroidPrompt(async ({ type, value }) => {
    let result = false;

    try {
      await NfcManager.requestTechnology(NfcTech.Ndef, {
        alertMessage: 'Ready to write some NDEF',
      });

      let bytes = null;
      if (type === 'TEXT') {
        bytes = Ndef.encodeMessage([Ndef.textRecord(value)]);
      } else if (type === 'URI') {
        bytes = Ndef.encodeMessage([Ndef.uriRecord(value)]);
      } else if (type === 'WIFI_SIMPLE') {
        bytes = Ndef.encodeMessage([Ndef.wifiSimpleRecord(value)]);
      } else if (type === 'VCARD') {
        const { name, tel, org, email } = value;
        const vCard = `BEGIN:VCARD\nVERSION:2.1\nN:;${name}\nORG: ${org}\nTEL;HOME:${tel}\nEMAIL:${email}\nEND:VCARD`;

        bytes = Ndef.encodeMessage([Ndef.record(Ndef.TNF_MIME_MEDIA, 'text/vcard', [], vCard)]);
      }

      if (bytes) {
        await NfcManager.ndefHandler.writeNdefMessage(bytes);

        if (Platform.OS === 'ios') {
          await NfcManager.setAlertMessageIOS('Success');
        }

        result = true;
      }
    } catch (ex) {
      handleException(ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }

    return result;
  });

  customTransceiveNfcA = withAndroidPrompt(async (commands, onPostExecute) => {
    let result = false;
    const responses = [];

    try {
      await NfcManager.requestTechnology([NfcTech.NfcA]);

      let cmdIdx = 0;
      for (const command of commands) {
        let modifiedCommand = null;
        if (typeof beforeTransceive === 'function') {
          modifiedCommand = beforeTransceive({
            cmdIdx,
            commands,
            responses,
          });
        }

        const { type, payload } = modifiedCommand || command;
        let resp = null;
        if (type === 'command') {
          console.warn(payload.map((byte) => ('00' + byte.toString(16)).slice(-2)).join(' '));
          resp = await NfcManager.nfcAHandler.transceive(payload);
        } else if (type === 'delay') {
          await delay(payload);
        }
        responses.push(resp);
        cmdIdx++;
      }

      if (Platform.OS === 'ios') {
        await NfcManager.setAlertMessageIOS('Success');
      }

      result = true;

      if (typeof onPostExecute === 'function') {
        await onPostExecute([result, responses]);
      }
    } catch (ex) {
      handleException(ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }

    return [result, responses];
  });

  eraseNfcA = withAndroidPrompt(async ({ format = false } = {}) => {
    let result = false;

    try {
      await NfcManager.requestTechnology([NfcTech.NfcA]);

      const cmdReadCC = [0x30, 0x03];
      const [e1, ver, size, access] = await NfcManager.nfcAHandler.transceive(cmdReadCC);

      const blocks = (size * 8) / 4;

      for (let i = 0; i < blocks; i++) {
        const blockNo = i + 0x04; // user block starts from 0x04
        const cmdWriteZero = [0xa2, blockNo, 0x0, 0x0, 0x0, 0x0];
        await NfcManager.nfcAHandler.transceive(cmdWriteZero);
      }

      if (format) {
        const cmdNdefFormat = [0xa2, 0x04, 0x03, 0x00, 0xfe, 0x00];
        await NfcManager.nfcAHandler.transceive(cmdNdefFormat);

        if (Platform.OS === 'ios') {
          await NfcManager.setAlertMessageIOS('Success');
        }

        result = true;
      } else {
        result = false;
      }
    } catch (ex) {
      handleException(ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }

    return result;
  });

  customSelectAndTransceiveIsoDep = async (commands, logger, msg, onPostExecute) => {
    commands = [APDUs.selectApp(RYDER_ONE_AID), ...commands];
    const [result, responses] = await this.customTransceiveIsoDep(msg)(
      commands,
      onPostExecute,
      logger,
    );
    responses.shift();
    return [result, responses];
  };

  sendCommandX = async (command, p1, p2, commandData) => {
    const commandLength = commandData.length;
    console.log("new sendCommand function");
    const resp = await nfcTranceive(APDUs.sendCommand(command, p1, p2, commandLength).payload);
    if (!isOk(resp))
      throw new Error("Response to initial command was not OK");

    const chunkSize = 247;
    const commandDataSlices = chunkArray(commandData, chunkSize);
    // console.log(`command data slices ${commandDataSlices}`);

    for (const slice of commandDataSlices) {
      const result = await nfcTranceive(APDUs.writeCommandData(slice).payload);
      if (!isOk(result))
        throw new Error("writeCommandData failed");
    }

    const payloadLenBytes = await waitRyderReady(APDUs.readResponse());
    const payloadLen = (payloadLenBytes[0] << 8) + payloadLenBytes[1];
    const payloadType = payloadLenBytes[2];
    //TODO- deal with payloadType
    console.log(`Payload type ${payloadType}, length: ${payloadLen}`);

    let responseData = [];
    if (payloadLen > 0) {
      console.log(`Going to read ${payloadLen} response bytes`);
      while (responseData.length < payloadLen) {
        const dataResponse = await waitRyderReady(APDUs.readResponseData());
        responseData = [...responseData, ...dataResponse];
      }
      console.log('Response data:', responseData);
    }

    const resp2 = await nfcTranceive(APDUs.readResponseDataReceived().payload);
    if (!isOk(resp2))
      throw new Error("Response to ReadResponseReceived was not OK");

    return responseData;
  };

  sendCommand = async (command) => {
    const { type, payload } = command;
    const resp = await nfcTranceive(payload);
    if (!isOk(resp))
      throw new Error("Response to initial command was not OK");

    const payloadLenBytes = await waitRyderReady(APDUs.readResponse());
    const payloadLen = (payloadLenBytes[0] << 8) + payloadLenBytes[1];
    const payloadType = payloadLenBytes[2];
    //TODO- deal with payloadType
    console.log(`Payload type ${payloadType}, length: ${payloadLen}`);

    let responseData = [];
    if (payloadLen > 0) {
      console.log(`Going to read ${payloadLen} response bytes`);
      while (responseData.length < payloadLen) {
        const dataResponse = await waitRyderReady(APDUs.readResponseData());
        responseData = [...responseData, ...dataResponse];
      }
      console.log('Response data:', responseData);
    }

    const resp2 = await nfcTranceive(APDUs.readResponseDataReceived().payload);
    if (!isOk(resp2))
      throw new Error("Response to ReadResponseReceived was not OK");

    return responseData;
  };

  // nfcSession = async (callback) => {
  //   try {
  //     await NfcManager.requestTechnology(NfcTech.IsoDep, {
  //       alertMessage: `Tap your Ryder One - ${msg}`,
  //     });
  //     await callback(RyderNFCSession);
  //   }
  //   catch (error) {
  //     console.error('newProtocolTranceive error', error);
  //   }
  //   finally {
  //     NfcManager.cancelTechnologyRequest();
  //   }
  // };

  newProtocolTranceive = async (command, msg) => {
    try {
      await NfcManager.requestTechnology(NfcTech.IsoDep, {
        alertMessage: `Tap your Ryder One - ${msg}`,
      });
      const result = await this.sendCommand(command);
      console.log(result);

      // temp code
      const [tooLarge, invalidResume, resumeIndex1, resumeIndex2] = result;
      const resumeIndex = (resumeIndex1 << 8) + resumeIndex2;
      console.log(`resume index: ${resumeIndex1} ${resumeIndex2}`, result);

      const fullData = Array(1024 * 500 + 1).fill(6);
      const sliceSize = 4096;

      for (let i = resumeIndex, totalSent = resumeIndex * sliceSize; totalSent < fullData.length; ++i) {
        const data = fullData.slice(i * sliceSize, (i + 1) * sliceSize);
        const sliceLength = data.length;
        console.log(`totalsent ${totalSent}, i ${i}, ${sliceLength}`);
        totalSent += sliceLength;

        //[0x11, 0x22, 0x33, 0x44, 0x55];
        const checksum = crc32sum(data);
        // console.log(checksum);
        const checksumBytes = new Uint8Array(4);
        const view = new DataView(checksumBytes.buffer);
        view.setUint32(0, checksum, false);


        // const lc = lengthAndChecksum.byteLength + data.length;
        // const dataPayload = [0xd1, 0x0d, 0x00, 0x00, lc, ...lengthAndChecksum, ...data];
        // const resp3 = await this.sendCommand({ type: 'x', payload: dataPayload });
        const resp3 = await this.sendCommandX(0x0d, (i >> 8) & 0xff, i & 0xff, [...checksumBytes, ...data]);
      }
      return result;
    }
    catch (error) {
      console.error('newProtocolTranceive error', error);
    }
    finally {
      NfcManager.cancelTechnologyRequest();
    }
  };

  customTransceiveIsoDep = (msg) => {
    return withAndroidPrompt(async (commands, onPostExecute, logger) => {
      let result = false;
      const responses = [];
      if (typeof logger !== 'object') {
        logger = OVERWRITE_LOGGER;
      }
      try {
        await NfcManager.requestTechnology([NfcTech.IsoDep], {
          alertMessage: `Tap your Ryder One - ${msg}`,
        });
        let logs = [];
        for (const { type, payload } of commands) {
          let resp = null;
          if (type === 'command') {
            const outString = '>>> ' + toHexString(payload);
            console.log(outString);
            logs.push(outString);

            resp = await NfcManager.isoDepHandler.transceive(payload);

            const inString = '<<< ' + toHexString(resp);
            console.log(inString);
            logs.push(inString);
          } else if (type === 'delay') {
            await delay(payload);
          }
          responses.push(resp);
        }
        logger.append(logs);
        if (Platform.OS === 'ios') {
          await NfcManager.setAlertMessageIOS('Success');
        }

        result = true;

        if (typeof onPostExecute === 'function') {
          await onPostExecute([result, responses]);
        }
      } catch (ex) {
        console.error(ex.constructor.name, ex);
        handleException(ex);
      } finally {
        NfcManager.cancelTechnologyRequest();
      }

      return [result, responses];
    }, msg);
  };

  customTransceiveNfcV = withAndroidPrompt(async (commands, onPostExecute) => {
    let result = false;
    const responses = [];

    try {
      await NfcManager.requestTechnology([NfcTech.NfcV]);

      for (const { type, payload } of commands) {
        let resp = null;
        if (type === 'command') {
          console.log('>>> ' + payload.map((b) => ('00' + b.toString(16)).slice(-2)).join(' '));
          resp = await NfcManager.nfcVHandler.transceive(payload);
          console.log('<<< ' + resp.map((b) => ('00' + b.toString(16)).slice(-2)).join(' '));
        } else if (type === 'delay') {
          await delay(payload);
        }
        responses.push(resp);
      }

      if (Platform.OS === 'ios') {
        await NfcManager.setAlertMessageIOS('Success');
      }

      result = true;

      if (typeof onPostExecute === 'function') {
        await onPostExecute([result, responses]);
      }
    } catch (ex) {
      console.warn(ex);
      handleException(ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }

    return [result, responses];
  });

  makeReadOnly = withAndroidPrompt(async () => {
    let result = false;

    try {
      await NfcManager.requestTechnology([NfcTech.Ndef]);
      await NfcManager.ndefHandler.makeReadOnly();

      if (Platform.OS === 'ios') {
        await NfcManager.setAlertMessageIOS('Success');
      }

      result = true;
    } catch (ex) {
      console.warn(ex);
      handleException(ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }

    return result;
  });

  formatNdefAndroid = withAndroidPrompt(async () => {
    let result = false;

    try {
      await NfcManager.requestTechnology([NfcTech.NdefFormatable]);
      const bytes = Ndef.encodeMessage([Ndef.textRecord('hello nfc')]);
      await NfcManager.ndefFormatableHandlerAndroid.formatNdef(bytes);

      if (Platform.OS === 'ios') {
        await NfcManager.setAlertMessageIOS('Success');
      }

      result = true;
    } catch (ex) {
      console.warn(ex);
      handleException(ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }

    return result;
  });
}

// ------------------------
//  Utils
// ------------------------
const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export default new NfcProxy();
export { ErrSuccess, setBeforeTransceive };

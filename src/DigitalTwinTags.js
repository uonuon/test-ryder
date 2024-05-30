import NfcProxy from './NfcProxy';

export const signDataWithCounter = async (data) => {
  const [result, responses] = await sendSignApdus(data);
  if (result) {
    return signatureResponseToLink(responses);
  }
  return undefined;
};

export const requestPublicKey = async (data) => {
  const [result, responses] = await sendPublicKeyApdus(data);
  if (result) {
    const responseSelect = responses[0];
    const responsePubKey = responses[1];
    const pubkey = bytesToHex(responsePubKey.slice(0, -2)); // remove trailing 90 00
    return pubkey;
  }
  return undefined;
};

const sendSignApdus = async (data) => {
  return NfcProxy.customTransceiveIsoDep([
    {
      type: 'command',
      payload: [
        0x00,
        0xa4,
        0x04,
        0x00,
        0x07,
        0x01,
        0x02,
        0x03,
        0x04,
        0x05,
        0x00,
        0x00, // select app
      ],
    },
    {
      type: 'command',
      payload: [0xb0, 0xab, 0x00, 0x00, 0x00], // export public key
    },
    {
      type: 'command',
      payload: [0xb0, 0xaa, 0x00, 0x00, data.length, ...data], // sign internal counter + data
    },
  ]);
};

const sendPublicKeyApdus = async (data) => {
  return NfcProxy.customTransceiveIsoDep([
    {
      type: 'command',
      payload: [
        0x00,
        0xa4,
        0x04,
        0x00,
        0x07,
        0x01,
        0x02,
        0x03,
        0x04,
        0x05,
        0x00,
        0x00, // select app
      ],
    },
    {
      type: 'command',
      payload: [0xb0, 0xab, 0x00, 0x00, 0x00], // export public key
    },
  ]);
};

// Convert a hex string to a byte array
function hexToBytes(hex) {
  for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
}

// Convert a byte array to a hex string
function bytesToHex(bytes) {
  for (var hex = [], i = 0; i < bytes.length; i++) {
    var current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
    hex.push((current >>> 4).toString(16));
    hex.push((current & 0xf).toString(16));
  }
  return hex.join('');
}

async function signatureResponseToLink(arraysOfResponses) {
  const responseSelect = arraysOfResponses[0];
  const responsePubKey = arraysOfResponses[1];
  const response = arraysOfResponses[2];
  const counter = response.slice(0, 4);

  const derByte = response[4];
  const lc = response[5];
  // retrieve r
  let magicInt = response[6]; // 02 - int
  const lengthR = response[7];
  let sigR = response.slice(8, 8 + lengthR);
  if (sigR[0] === 0) {
    // remove leading 0
    sigR = response.slice(9, 8 + lengthR);
  }
  // retrieve s
  magicInt = response[8 + lengthR]; // 02 -int
  const lengthS = response[9 + lengthR];
  let sigS = response.slice(10 + lengthR, 10 + lengthR + lengthS);
  if (sigS[0] === 0) {
    // remove leading 0
    sigS = response.slice(11 + lengthR, 10 + lengthR + lengthS);
  }
  const contract = 'SP3G5FX84HN4DZVEHB0FW3Y6CWF6N11AAKTM5PW47.dtt-v1';
  const pubkey = bytesToHex(responsePubKey.slice(0, -2)); // remove trailing 90 00

  const urlWithoutScheme = `tag.ryder.id/${contract}/${pubkey}/${counter[3]}/${
    bytesToHex(sigR) + bytesToHex(sigS)
  }`;

  let url = `stacks://browser?url=${urlWithoutScheme}`;
  if (!Linking.canOpenURL(url)) {
    url = `https://${urlWithoutScheme}`;
  }
  console.log({url});
  return url;
}

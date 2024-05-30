global.Buffer = global.Buffer || require('buffer').Buffer;

import {useNavigation} from '@react-navigation/native';
import {bytesToHex, hexToBytes} from '@stacks/common';
import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {HelperText, Text, TextInput} from 'react-native-paper';
import {setupWithKey} from '../../../lib/nfc-protocol/wallet';
import {
  debugExportMasterChainCode,
  derivationPathStringToArray,
  exportPublicKey,
  pairDevice,
} from '../../../lib/ryder-one';
import {APDUs, isCommandOk} from '../../../lib/ryder-one-apdus';
import {removeRyderOneKey, storeRyderOneKey} from '../../../lib/storage';
import NfcProxy from '../../NfcProxy';
import {useLogger} from '../../hooks/AppendLogger';
import CommandButton from './CommandButton';
import {DebugEraseWalletButton} from './DebugEraseWalletButton';

import {useWallet} from '../../Utils/walletContext';

const MainTab = () => {
  const navigation = useNavigation();
  const {setCurrentWallet, setCurrentDevice} = useWallet();

  const [derivationPath, setderivationPath] = useState("m/44'/5757'/0'/0/1");
  const [derivationPath2, setderivationPath2] = useState("m/44'/0'/0'/0/1");
  const [initState, setInitState] = useState(' ');
  const [exportedKey, setExportedKey] = useState(' ');
  const [signingHash, setSigningHash] = useState('');
  const [signRequestResult, setSignRequestResult] = useState('');
  const [confirmCancelResult, setConfirmCancelResult] = useState('');
  const [retrievedResult, setRetrievedResult] = useState('');

  // const theme = useTheme();
  const logger = useLogger();

  const pairRyderOne = async () => {
    console.log('pair ryder one');
    const ryderOneKey = await pairDevice({setupWallet: false, logger});
    console.log(ryderOneKey);
    await storeRyderOneKey(ryderOneKey);
  };

  const setupWallet = async () => {
    console.log('setup wallet');
    setInitState(' ');
    const [result, responses] = (await NfcProxy.customSelectAndTransceiveIsoDep(
      [APDUs.setupWallet()],
      logger,
      'Setup wallet',
    )) as [boolean, number[][]];
    console.log(result, responses);
    if (result) {
      let chainCodeResponse = responses.pop() as number[];
      if (isCommandOk(chainCodeResponse)) {
        switch (chainCodeResponse[1]) {
          case 0x01:
            setInitState('Success');
            break;
          case 0xff:
            setInitState('Already done');
            break;
          case 0xfe:
            setInitState('Failed to generated key');
            break;
          case 0xfd:
            setInitState('Exception during key generation');
            break;
          default:
            setInitState(`Unknown response: ${Buffer.from(chainCodeResponse).toString('hex')}`);
            break;
        }
      } else {
        setInitState(`failed: ${Buffer.from(chainCodeResponse).toString('hex')}`);
      }
    }
  };

  const exportPubKey = async () => {
    if (!isValidDerivationPath()) return;

    console.log('export pubkey for path ' + derivationPath);
    const path = derivationPathStringToArray(derivationPath);
    const pubKey = await exportPublicKey(path, logger);
    console.log('pubkey', Buffer.from(pubKey).toString('hex'));
    setExportedKey(Buffer.from(pubKey).toString('hex'));
  };

  const requestHashSign = async () => {
    if (!isValidSigningHash()) return;
    const hashBuffer = Buffer.from(signingHash, 'hex');
    console.log('request hash sign');
    const path = derivationPathStringToArray(derivationPath2);
    console.log(path);
    const [result, responses] = await NfcProxy.customSelectAndTransceiveIsoDep([
      APDUs.signHashRequest(0x01, hashBuffer, path),
      logger,
      'Sign hash',
    ]);
    console.log(result, responses);
    const signatureResult = responses.pop();
    setSignRequestResult(Buffer.from(signatureResult).toString('hex'));
  };

  const debugUserConfirm = async () => {
    console.log('debug user confirm');
    const [result, responses] = await NfcProxy.customSelectAndTransceiveIsoDep([
      APDUs.debugUserConfirm(),
      logger,
      'User confirm',
    ]);
    console.log(result, responses);
    const responseCode = responses.pop();
    setConfirmCancelResult(Buffer.from(responseCode).toString('hex'));
  };

  const userCancel = async () => {
    console.log('user cancel');
    const [result, responses] = await NfcProxy.customSelectAndTransceiveIsoDep(
      [APDUs.userCancel()],
      logger,
      'User cancel',
    );
    console.log(result, responses);
    const responseCode = responses.pop();
    setConfirmCancelResult(Buffer.from(responseCode).toString('hex'));
  };

  const retrieveResult = async () => {
    console.log('retrieve result');
    const [result, responses] = await NfcProxy.customSelectAndTransceiveIsoDep(
      [APDUs.retrieveResult()],
      logger,
      'Retrieve result',
    );
    console.log(result, responses);
    const responseCode = responses.pop();
    setRetrievedResult(Buffer.from(responseCode).toString('hex'));
  };

  const forgetRyderOne = async () => {
    await removeRyderOneKey();
  };

  const exportMasterChainCode = async () => {
    console.log('export master key and chain code');
    const masterChainCode = await debugExportMasterChainCode(logger);
    console.log(bytesToHex(masterChainCode));
  };

  const getTagInfo = async () => {
    const [result, responses] = await NfcProxy.customSelectAndTransceiveIsoDep(
      [APDUs.getTagInfo()],
      logger,
      'Get tag info',
    );
    console.log(result, responses);
  };

  const derivationPathRegex = /^m(?:\/[0-9]+'?)+$/;
  const isValidDerivationPath = () => derivationPathRegex.test(derivationPath);
  const isValidDerivationPath2 = () => derivationPathRegex.test(derivationPath2);

  const signingHashRegex = /^[0-9a-fA-F]{64}$/;
  const isValidSigningHash = () => signingHashRegex.test(signingHash);

  return (
    <ScrollView style={{padding: 20, marginBottom: 20}}>
      <Text variant="titleLarge" style={{marginBottom: 10}}>
        Setup With Key
      </Text>
      <CommandButton
        onPress={() =>
          {
          const wallet = {
            currentIndex: 0,
            assets: {
              stx: {
                // stx xpub from hardcoded master seed and chain code
                accounts: [{amountAvailable: 0}],
                xtendedPublicKey: 'cace0d31676ec24c148892c3f024422034610c37cb0032685a71c83ae289dedf7b3a9b4f8127e09255a9317f48149ff656f1a22acbf87b2598cdecd82ddb8901',
              },
            },
          };
          setCurrentWallet(wallet);
          setupWithKey(
            hexToBytes(
              // hardcoded master seed and chain code
              '1d98771ec171a89d860e58fc44ee4b07631ebd156cec21b5dcffaf0525d18e0bc130713f84a75771e60d796e1affd25365f4af6d3668a1b3bb32b0c40b729e02',
            ),
          )
        }
        }
        label="Setup with Key"
      />

      <Text variant="titleLarge" style={{marginBottom: 10}}>
        Wallet setup
      </Text>
      <CommandButton onPress={setupWallet} label="Setup Wallet" />
      <TextInput
        readOnly={true}
        mode="outlined"
        label="Initialization"
        multiline={true}
        value={initState}
        style={{marginBottom: 30}}
      />

      <Text variant="titleLarge" style={{marginBottom: 10}}>
        Key export
      </Text>
      <TextInput
        readOnly={false}
        mode="outlined"
        label="Derivation path"
        multiline={false}
        value={derivationPath}
        onChangeText={(text) => {
          setderivationPath(text.replace(/[‘’]/g, "'"));
        }}
      />
      <HelperText type="error" visible={!isValidDerivationPath()}>
        Invalid derivation path
      </HelperText>
      <CommandButton onPress={exportPubKey} label="Export public key" />
      <TextInput
        readOnly={true}
        mode="outlined"
        label="Exported key"
        multiline={true}
        value={exportedKey}
        style={{marginBottom: 30}}
      />

      <Text variant="titleLarge" style={{marginBottom: 10}}>
        Signing
      </Text>
      <TextInput
        readOnly={false}
        mode="outlined"
        label="Hash"
        multiline={false}
        value={signingHash}
        onChangeText={(text) => setSigningHash(text)}
      />
      <HelperText type="error" visible={signingHash.length > 0 && !isValidSigningHash()}>
        Invalid hash (64 hexits)
      </HelperText>
      <TextInput
        readOnly={false}
        mode="outlined"
        label="Derivation path"
        multiline={false}
        value={derivationPath2}
        onChangeText={(text) => {
          setderivationPath2(text.replace(/[‘’]/g, "'"));
        }}
      />
      <HelperText type="error" visible={!isValidDerivationPath2()}>
        Invalid derivation path
      </HelperText>
      <CommandButton onPress={requestHashSign} label="Request sign" />
      <TextInput
        readOnly={true}
        mode="outlined"
        label="Result"
        multiline={true}
        value={signRequestResult}
        style={{marginBottom: 30}}
      />

      <Text variant="titleLarge" style={{marginBottom: 10}}>
        Confirm & cancel
      </Text>
      <CommandButton onPress={debugUserConfirm} label="User confirm (debug)" />
      <CommandButton onPress={userCancel} label="User cancel" />
      <TextInput
        readOnly={true}
        mode="outlined"
        label="Result"
        multiline={false}
        value={confirmCancelResult}
        style={{marginBottom: 30}}
      />

      <Text variant="titleLarge" style={{marginBottom: 10}}>
        Result
      </Text>
      <CommandButton onPress={retrieveResult} label="Retrieve result" />
      <TextInput
        readOnly={true}
        mode="outlined"
        label="Result"
        multiline={true}
        value={retrievedResult}
        style={{marginBottom: 30}}
      />

      <Text variant="titleLarge" style={{marginBottom: 10}}>
        TapSafe
      </Text>
      <CommandButton onPress={() => navigation.navigate('Welcome')} label="Start TapSafe Flow" />

      <Text variant="titleLarge" style={{marginBottom: 10}}>
        Send Asset
      </Text>
      <CommandButton
        onPress={() => navigation.navigate('ChooseToken')}
        label="Start Send Asset Flow"
      />

      <Text variant="titleLarge" style={{marginBottom: 10}}>
        Other
      </Text>
      <CommandButton onPress={pairRyderOne} label="Pair Ryder One" />
      <CommandButton onPress={forgetRyderOne} label="Forget Ryder One" />
      <CommandButton onPress={getTagInfo} label="Get Tag Info" />
      <CommandButton onPress={exportMasterChainCode} label="Debug Export Master Chain Code" />
      <DebugEraseWalletButton label="Debug Erase Wallet" />

      <View style={{height: 20}} />
    </ScrollView>
  );
};

export default MainTab;

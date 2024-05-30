global.Buffer = global.Buffer || require('buffer').Buffer;
import {HDKey} from '@scure/bip32';

import {AddressTransaction, StxBalance} from '@stacks/blockchain-api-client';
import {bytesToHex} from '@stacks/common';
import {getAddressFromPublicKey} from '@stacks/transactions';
import React, {useState} from 'react';
import {Linking, ScrollView} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {
  derivationPathStringToArray,
  exportPublicKey,
  pairDevice,
  signStxTransferTransaction,
} from '../../../lib/ryder-one';
import {createMockExtendedPublicKey} from '../../../lib/ryder-one-mock';
import {
  MempoolTransaction,
  SimpleStxTransaction,
  broadcastStxTransaction,
  createTxLink,
  makeUnsignedTransferTransaction,
  signStxTransaction,
} from '../../../lib/stacks';
import {useStacks} from '../../Utils/stacksContext';
import {AppendLogger} from '../../context/AppendLoggerContext';
import {useLogger} from '../../hooks/AppendLogger';
import CommandButton from './CommandButton';
import {StxProfile} from './StxProfile';
import PendingTxs from './stacks/PendingTxs';
import SelectAccount from './stacks/SelectAccount';
import SelectNetwork from './stacks/SelectNetwork';
import Txs from './stacks/Txs';

const DERIVATION_PATH_PREFIX = "m/44'/5757'/0'/0/";
const feeRate = 180;
const useHashSigningOnly = true;

const Address = ({address}: {address: String}) => {
  return address.length > 10 ? `${address.slice(0, 4)}...${address.slice(-4)}` : address;
};

const StackTab = () => {
  const logger = useLogger();
  const {network, transactionsApi, accountsApi, currentAccount, setCurrentAccount} = useStacks();

  const [derivationPath, setDerivationPath] = useState(DERIVATION_PATH_PREFIX + '1');
  const [exportedKey, setExportedKey] = useState('');
  const [stxAddress, setStxAddress] = useState('');
  const [account, setAccount] = useState<string | undefined>(undefined);
  const [stxBalance, setStxBalance] = useState<StxBalance | undefined>(undefined);
  const [txs, setTxs] = useState<AddressTransaction[]>([]);
  const [pendingTxs, setPendingTxs] = useState<MempoolTransaction[]>([]);

  const [broadcastResult, setBroadcastResult] = useState('');
  const [txLink, setTxLink] = useState(
    createTxLink('8da0d39dfba2f30203f8669cfe73d2b839933f9852878807aee9fbed5c2264f1', network),
  );

  const recipient = network.isMainnet()
    ? 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9'
    : 'ST3FFRX7C911PZP5RHE148YDVDD9JWVS6FZRA60VS';

  const startPairDevice = async () => {
    const extendedPubKey = await pairDevice({setupWallet: false, logger});
    console.log(extendedPubKey);
    try {
      const mockExtendedPubKey = createMockExtendedPublicKey();
      const stxNode = HDKey.fromExtendedKey(mockExtendedPubKey);
      const firstStxNode = stxNode.deriveChild(0);
      const firstStxAddress = getAddressFromPublicKey(firstStxNode.publicKey as Uint8Array);
      setStxAddress(firstStxAddress);
      console.log(firstStxAddress);
    } catch (e) {
      console.log(e);
    }
  };

  const startImportAccount = async () => {
    const path = DERIVATION_PATH_PREFIX + account;
    const pubKey = await exportPublicKey(derivationPathStringToArray(path), logger);
    const pubKeyString = bytesToHex(new Uint8Array(pubKey));
    const stxAddr = 'SPFJVM9Y1A4KJ31T8ZBDESZH36YGPDAZ9WXEFC53'; //pubKeyToAddr(pubKeyString, network)
    console.log(stxAddr);
    setExportedKey(pubKeyString);
    setDerivationPath(path);
    setStxAddress(stxAddr);
    const balance = await accountsApi.getAccountStxBalance({principal: stxAddr});
    setStxBalance(balance as StxBalance);
  };

  const startSendStx = async (simpleStxTx: SimpleStxTransaction, logger: AppendLogger) => {
    setBroadcastResult('');
    setTxLink('');
    const path = DERIVATION_PATH_PREFIX + account;

    try {
      let signedTx;
      if (useHashSigningOnly) {
        // send hash only to the device
        signedTx = await signStxTransaction(simpleStxTx, logger, network);
      } else {
        // send tx to the device
        const unsignedTx = await makeUnsignedTransferTransaction(simpleStxTx, network);
        signedTx = await signStxTransferTransaction(
          unsignedTx,
          derivationPathStringToArray(path),
          logger,
        );
        signedTx = unsignedTx;
      }

      let realSignature = false;
      if (signedTx && realSignature) {
        const result = await broadcastStxTransaction(signedTx, network);
        if (result?.reason) {
          setBroadcastResult(
            result.reason + (result.reason_data ? ' ' + JSON.stringify(result.reason_data) : ''),
          );
          setTxLink(createTxLink(result.txid, network));
        } else if (result?.txid) {
          setBroadcastResult(result.txid);
          setTxLink(createTxLink(result.txid, network));
        }
        console.log(result);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView style={{padding: 20}}>
      <Text variant="titleLarge" style={{marginBottom: 10}}>
        Pair Device
      </Text>
      <CommandButton onPress={() => startPairDevice()} label={'Pair device'} />

      <Text variant="titleLarge" style={{marginBottom: 10}}>
        Account
      </Text>
      <SelectAccount
        selectedAccount={account}
        onAccountChanged={(acc: string) => {
          setAccount(acc);
        }}
      />
      <SelectNetwork
        onNetworkChanged={(network) => {
          setAccount(undefined);
        }}
      />
      <CommandButton
        onPress={startImportAccount}
        disabled={!account}
        label={account ? `Import Account ${account}` : 'No account selected'}
      />
      {stxAddress && stxBalance && <StxProfile balance={stxBalance} stxAddress={stxAddress} />}
      <Text variant="titleLarge" style={{marginBottom: 10}}>
        Send STX to <Address address={recipient} />
      </Text>
      <Text variant="bodySmall" style={{marginBottom: 10}}>
        {!stxAddress ? 'Choose account first' : `From account ${stxAddress}`}
      </Text>
      <Text variant="bodySmall" style={{marginBottom: 10}}>
        with fee rate of {feeRate}
      </Text>
      <Text variant="bodySmall" style={{marginBottom: 10}}>
        using path {derivationPath}
      </Text>
      <CommandButton
        onPress={async () => {
          startSendStx(
            {
              amountInUstx: 10000,
              recipient,
              fees: feeRate,
              derivationPath: derivationPathStringToArray(derivationPath),
              publicKey: exportedKey,
            },
            logger,
          );
        }}
        label="Send 0.1 STX"
        disabled={!exportedKey}
      />
      <TextInput
        readOnly={true}
        mode="outlined"
        label="Result"
        multiline={true}
        value={broadcastResult}
        style={{marginBottom: 30}}
      />
      <CommandButton
        onPress={async () => {
          await Linking.openURL(txLink);
        }}
        label="See tx details"
        disabled={!txLink}
      />
      <CommandButton
        onPress={async () => {
          const result = await transactionsApi.getAddressMempoolTransactions({
            address: stxAddress!!,
          });
          setPendingTxs(result.results as MempoolTransaction[]);
        }}
        disabled={!stxAddress}
        label="Fetch pending tx"
      />
      <PendingTxs pendingTxs={pendingTxs} />
      <CommandButton
        onPress={async () => {
          try {
            const result = await transactionsApi.getAddressTransactions({
              address: stxAddress,
            });
            console.log({result});
            setTxs(result.results as AddressTransaction[]);
          } catch (e) {
            console.log(e.status);
            if (e.status === 404) {
              setTxs([]);
            }
          }
        }}
        disabled={!stxAddress}
        label="Fetch tx"
      />
      <Txs txs={txs} />
      <Text> </Text>
    </ScrollView>
  );
};

export default StackTab;

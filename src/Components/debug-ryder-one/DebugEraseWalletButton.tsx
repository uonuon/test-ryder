import React from 'react';
import {View} from 'react-native';
import {Button, Dialog, Portal, Text} from 'react-native-paper';
import CommandButton from './CommandButton';
import NfcProxy from '../../NfcProxy';
import {APDUs} from '../../../lib/ryder-one-apdus';
import {useLogger} from '../../hooks/AppendLogger';

export const DebugEraseWalletButton = ({label}: {label: string}) => {
  const [visible, setVisible] = React.useState(false);
  const logger = useLogger();

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const debugEraseWallet = async () => {
    console.log('erase wallet');
    const [result, responses] = (await NfcProxy.customSelectAndTransceiveIsoDep(
      [APDUs.debugEraseWallet()],
      logger,"Erase wallet"
    )) as [boolean, number[][]];
    console.log(result, responses);
  };

  return (
    <View>
      <CommandButton onPress={showDialog} label={label} />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Only erase wallet if it is empty!</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={async () => {
                await debugEraseWallet();
                hideDialog();
              }}>
              Erase Wallet
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

global.Buffer = global.Buffer || require('buffer').Buffer;
import React from 'react';
import {View} from 'react-native';
import {Button, Modal, Portal, RadioButton} from 'react-native-paper';

const SelectAccount = ({
  selectedAccount,
  onAccountChanged,
}: {
  selectedAccount: string | undefined;
  onAccountChanged: (account: string) => void;
}) => {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};
  const accounts = [1, 2, 3];
  return (
    <View>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <RadioButton.Group
            onValueChange={(newValue) => {
              onAccountChanged(newValue);
              hideModal();
            }}
            value={selectedAccount || ''}>
            {accounts.map((index) => {
              return (
                <RadioButton.Item key={index} label={`Account ${index}`} value={index.toString()} />
              );
            })}
          </RadioButton.Group>
        </Modal>
      </Portal>
      <Button mode="outlined" style={{marginVertical: 20}} onPress={showModal}>
        Choose Account
      </Button>
    </View>
  );
};

export default SelectAccount;

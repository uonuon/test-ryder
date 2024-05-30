import * as React from 'react';
import {ScrollView, Alert, Platform} from 'react-native';
import {List} from 'react-native-paper';
import NfcProxy from '../../NfcProxy';
import * as NfcIcons from '../../Components/NfcIcons';

function ToolKitScreen(props) {
  const {navigation} = props;

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <List.Section>
        <List.Subheader>Ndef</List.Subheader>
        <List.Item
          title="Make Read Only"
          description="Make the NFC tag readonly"
          left={NfcIcons.TransceiveIcon}
          onPress={async () => {
            await NfcProxy.makeReadOnly();
          }}
        />

        {Platform.OS === 'android' && (
          <List.Item
            title="NDEF Format"
            description="NDEF format"
            left={NfcIcons.EraseIcon}
            onPress={async () => {
              await NfcProxy.formatNdefAndroid();
            }}
          />
        )}
      </List.Section>

      <List.Section>
        <List.Subheader>NfcA</List.Subheader>
        <List.Item
          title="Custom Transceive"
          description="Send custom NfcA command into your tag"
          left={NfcIcons.TransceiveIcon}
          onPress={() =>
            navigation.navigate('CustomTransceive', {
              nfcTech: 'NfcA',
            })
          }
        />
        <List.Item
          title="Erase"
          description="Write all blocks to zero"
          left={NfcIcons.EraseIcon}
          onPress={async () => {
            await NfcProxy.eraseNfcA();
          }}
        />
        <List.Item
          title="NDEF Format"
          description="Erase and NDEF format"
          left={NfcIcons.EraseIcon}
          onPress={async () => {
            await NfcProxy.eraseNfcA({format: true});
          }}
        />
      </List.Section>

      <List.Section>
        <List.Subheader>NfcV</List.Subheader>
        <List.Item
          title="Custom Transceive"
          description="Send custom NfcV command into your tag"
          left={NfcIcons.TransceiveIcon}
          onPress={() =>
            navigation.navigate('CustomTransceive', {
              nfcTech: 'NfcV',
            })
          }
        />
      </List.Section>

      <List.Section>
        <List.Subheader>IsoDep</List.Subheader>
        <List.Item
          title="Custom Transceive"
          description="Send custom APDU command into your tag"
          left={NfcIcons.TransceiveIcon}
          onPress={() =>
            navigation.navigate('CustomTransceive', {
              nfcTech: 'IsoDep',
            })
          }
        />
      </List.Section>

      <List.Section>
        <List.Subheader>Misc</List.Subheader>
        <List.Item
          title="Test registerTagEvent API"
          description="registerTagEvent use NDEF-only scan for iOS"
          left={NfcIcons.NfcIcon}
          onPress={async () => {
            const ndefTag = await NfcProxy.readNdefOnce();
            if (ndefTag) {
              navigation.navigate('TagDetail', {tag: ndefTag});
            }
          }}
        />
      </List.Section>
    </ScrollView>
  );
}

export default ToolKitScreen;

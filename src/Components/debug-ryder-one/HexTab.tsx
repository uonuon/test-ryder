global.Buffer = global.Buffer || require('buffer').Buffer;

import {hexToBytes} from '@stacks/common';
import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {Text, TextInput, useTheme} from 'react-native-paper';
import NfcProxy from '../../NfcProxy';
import {useLogger} from '../../hooks/AppendLogger';
import TextMonospace from '../TextMonospace';
import CommandButton from './CommandButton';

const HexTab = () => {
  const [hexCommand, setHexCommand] = useState<string>('');
  const theme = useTheme();
  const logger = useLogger();

  const sendApdu = async () => {
    console.log('send command in hex');
    const payload = Array.from(hexToBytes(hexCommand.replace(/\s+/g, '')));
    const [result, responses] = await NfcProxy.customSelectAndTransceiveIsoDep(
      [{type: 'command', payload}],
      logger,
      'Send raw command',
    );
    console.log(result, responses);
  };

  return (
    <ScrollView style={{padding: 20}}>
      <Text variant="titleLarge" style={{marginBottom: 10}}>
        Plain Hex
      </Text>
      <TextInput
        readOnly={false}
        mode="outlined"
        label="Command in hex"
        multiline={false}
        value={hexCommand}
        style={{marginBottom: 30}}
        onChangeText={(text) => setHexCommand(text)}
      />
      <CommandButton onPress={sendApdu} label="Send" />

      <Text variant="titleLarge" style={{marginBottom: 10}}>
        Log
      </Text>
      <CommandButton onPress={() => logger.clear()} label="Clear Log" />
      <ScrollView style={{height: 200, padding: 5, backgroundColor: theme.colors.background}}>
        {logger.log.map((l, index) => (
          <TextMonospace key={index}>{l}</TextMonospace>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

export default HexTab;

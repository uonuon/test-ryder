import * as React from 'react';
import {Alert, ScrollView} from 'react-native';
import {NfcTech} from 'react-native-nfc-manager';
import {Button, List} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as AppContext from '../../AppContext';
import SaveRecordModal from '../../Components/SaveRecordModal';
import RecordItem from './RecordItem';

function groupRecordByTech(records) {
  const ndefRecords = [];
  const nfcARecords = [];
  const nfcVRecords = [];
  const isoDepRecords = [];
  for (let idx = 0; idx < records.length; idx++) {
    const record = records[idx];
    if (record.payload.tech === NfcTech.Ndef) {
      ndefRecords.push({record, idx});
    } else if (record.payload.tech === NfcTech.NfcA) {
      nfcARecords.push({record, idx});
    } else if (record.payload.tech === NfcTech.NfcV) {
      nfcVRecords.push({record, idx});
    } else if (record.payload.tech === NfcTech.IsoDep) {
      isoDepRecords.push({record, idx});
    }
  }
  return {
    ndefRecords,
    nfcARecords,
    nfcVRecords,
    isoDepRecords,
  };
}

function SavedRecordScreen(props) {
  const {navigation} = props;
  const app = React.useContext(AppContext.Context);
  const recordList = app.state.storageCache;
  const [recordToCopy, setRecordToCopy] = React.useState(null);

  async function clearAll() {
    Alert.alert('CONFIRM', 'Are you sure?', [
      {
        text: 'DO IT',
        onPress: async () => {
          await app.actions.setStorage([]);
        },
      },
      {
        text: 'CANCEL',
        onPress: () => 0,
      },
    ]);
  }

  async function removeIdx(idx) {
    Alert.alert('CONFIRM', 'Are you sure?', [
      {
        text: 'DO IT',
        onPress: async () => {
          const nextRecordList = [...recordList];
          nextRecordList.splice(idx, 1);
          await app.actions.setStorage(nextRecordList);
        },
      },
      {
        text: 'CANCEL',
        onPress: () => 0,
      },
    ]);
  }

  function goToHandler(savedRecordIdx, savedRecord) {
    if (savedRecord.payload?.tech === NfcTech.Ndef) {
      navigation.navigate('NdefWrite', {
        savedRecord,
        savedRecordIdx,
      });
    } else if (savedRecord.payload?.tech === NfcTech.NfcA) {
      navigation.navigate('CustomTransceive', {
        savedRecord,
        savedRecordIdx,
      });
    } else if (savedRecord.payload?.tech === NfcTech.NfcV) {
      navigation.navigate('CustomTransceive', {
        savedRecord,
        savedRecordIdx,
      });
    } else if (savedRecord.payload?.tech === NfcTech.IsoDep) {
      navigation.navigate('CustomTransceive', {
        savedRecord,
        savedRecordIdx,
      });
    }
  }

  const {ndefRecords, nfcARecords, nfcVRecords, isoDepRecords} = groupRecordByTech(recordList);

  return (
    <>
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        <List.Section>
          <List.Subheader>NDEF ({ndefRecords.length})</List.Subheader>
          {ndefRecords.map(({record, idx}) => (
            <RecordItem
              key={idx}
              record={record}
              idx={idx}
              removeIdx={removeIdx}
              goToHandler={goToHandler.bind(null, idx)}
              onCopy={() => {
                console.warn(record);
                setRecordToCopy(record);
              }}
            />
          ))}
        </List.Section>

        <List.Section>
          <List.Subheader>NfcA ({nfcARecords.length})</List.Subheader>
          {nfcARecords.map(({record, idx}) => (
            <RecordItem
              key={idx}
              record={record}
              idx={idx}
              removeIdx={removeIdx}
              goToHandler={goToHandler.bind(null, idx)}
              onCopy={() => setRecordToCopy(record)}
            />
          ))}
        </List.Section>

        <List.Section>
          <List.Subheader>NfcV ({nfcVRecords.length})</List.Subheader>
          {nfcVRecords.map(({record, idx}) => (
            <RecordItem
              key={idx}
              record={record}
              idx={idx}
              removeIdx={removeIdx}
              goToHandler={goToHandler.bind(null, idx)}
              onCopy={() => setRecordToCopy(record)}
            />
          ))}
        </List.Section>

        <List.Section>
          <List.Subheader>IsoDep ({isoDepRecords.length})</List.Subheader>
          {isoDepRecords.map(({record, idx}) => (
            <RecordItem
              key={idx}
              record={record}
              idx={idx}
              removeIdx={removeIdx}
              goToHandler={goToHandler.bind(null, idx)}
              onCopy={() => setRecordToCopy(record)}
            />
          ))}
        </List.Section>
      </ScrollView>
      <Button onPress={clearAll}>CLEAR ALL</Button>
      <SafeAreaView />

      <SaveRecordModal
        title={'COPY THIS RECORD AS'}
        visible={!!recordToCopy}
        onClose={() => setRecordToCopy(null)}
        onPersistRecord={async (name) => {
          if (!recordToCopy) {
            return false;
          }

          const nextList = AppContext.Actions.getStorage();
          nextList.push({
            name,
            payload: recordToCopy.payload,
          });

          await AppContext.Actions.setStorage(nextList);
          setRecordToCopy(null);
        }}
      />
    </>
  );
}

export default SavedRecordScreen;

import qs from 'query-string';
import * as React from 'react';
import {Alert, Dimensions, Linking, Platform, StatusBar, Text, View} from 'react-native';
import NfcManager, {NfcEvents, NfcTech} from 'react-native-nfc-manager';
import {Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import NfcAddRyderOne from '../../Components/NfcAddRyderOne';
import {Color} from '../../GlobalStyles';
import NfcProxy from '../../NfcProxy';

function AddRyderOneScreen(props) {
  const {navigation} = props;
  const [supported, setSupported] = React.useState(true);
  const [enabled, setEnabled] = React.useState(true);
  const padding = 40;
  const width = Dimensions.get('window').width - 2 * padding;

  React.useEffect(() => {
    async function initNfc() {
      try {
        const success = await NfcProxy.init();
        setSupported(true || success);
        setEnabled(true || (await NfcProxy.isEnabled()));

        if (success) {
          function onBackgroundTag(bgTag) {
            navigation.navigate('TagDetail', {tag: bgTag});
          }

          function onDeepLink(url, launch) {
            try {
              const customScheme = [
                'id.ryder.ryderone://', // android
                'id.ryder.ryderone://', // ios
              ].find((scheme) => {
                return scheme === url.slice(0, scheme.length);
              });

              if (!customScheme) {
                return;
              }

              url = url.slice(customScheme.length);

              // issue #23: we might have '?' in our payload, so we cannot simply "split" it
              let action = url;
              let query = '';
              let splitIdx = url.indexOf('?');

              if (splitIdx > -1) {
                action = url.slice(0, splitIdx);
                query = url.slice(splitIdx);
              }

              const params = qs.parse(query);
              if (action === 'share') {
                const sharedRecord = JSON.parse(params.data);
                if (sharedRecord.payload?.tech === NfcTech.Ndef) {
                  navigation.navigate('NdefWrite', {savedRecord: sharedRecord});
                } else if (sharedRecord.payload?.tech === NfcTech.NfcA) {
                  navigation.navigate('CustomTransceive', {
                    savedRecord: sharedRecord,
                  });
                } else if (sharedRecord.payload?.tech === NfcTech.NfcV) {
                  navigation.navigate('CustomTransceive', {
                    savedRecord: sharedRecord,
                  });
                } else if (sharedRecord.payload?.tech === NfcTech.IsoDep) {
                  navigation.navigate('CustomTransceive', {
                    savedRecord: sharedRecord,
                  });
                } else {
                  console.warn('unrecognized share payload tech');
                }
              }
            } catch (ex) {
              console.warn('fail to parse deep link', ex);
            }
          }

          // get the initial launching tag
          const bgTag = await NfcManager.getBackgroundTag();
          if (bgTag) {
            onBackgroundTag(bgTag);
          } else {
            const link = await Linking.getInitialURL();
            //console.warn('DEEP LINK', link);
            if (link) {
              onDeepLink(link, true);
            }
          }

          // listen to other background tags after the app launched
          NfcManager.setEventListener(NfcEvents.DiscoverBackgroundTag, onBackgroundTag);

          // listen to the NFC on/off state on Android device
          if (Platform.OS === 'android') {
            NfcManager.setEventListener(NfcEvents.StateChanged, ({state} = {}) => {
              NfcManager.cancelTechnologyRequest().catch(() => 0);
              if (state === 'off') {
                setEnabled(false);
              } else if (state === 'on') {
                setEnabled(true);
              }
            });
          }

          Linking.addEventListener('url', (event) => {
            if (event.url) {
              onDeepLink(event.url, false);
            }
          });
        }
      } catch (ex) {
        console.warn(ex);
        Alert.alert('ERROR', 'fail to init NFC', [{text: 'OK'}]);
      }
    }

    initNfc();
  }, [navigation]);

  function renderNfcButtons() {
    return <NfcAddRyderOne />;
  }

  function renderNfcNotEnabled() {
    return (
      <View
        style={{
          flex: 2,
          alignItems: 'stretch',
          alignSelf: 'center',
          width,
        }}>
        <Text style={{textAlign: 'center', marginBottom: 10}}>
          Your NFC is not enabled. Please first enable it and hit CHECK AGAIN button
        </Text>

        <Button
          mode="contained"
          onPress={() => NfcProxy.goToNfcSetting()}
          style={{marginBottom: 10}}>
          GO TO NFC SETTINGS
        </Button>

        <Button
          mode="outlined"
          onPress={async () => {
            setEnabled(await NfcProxy.isEnabled());
          }}>
          CHECK AGAIN
        </Button>
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView />
      <View style={{flex: 1, padding, backgroundColor: Color.whiteOverride}}>
        {supported && !enabled && renderNfcNotEnabled()}

        {supported && enabled && renderNfcButtons()}
      </View>
    </>
  );
}

export default AddRyderOneScreen;

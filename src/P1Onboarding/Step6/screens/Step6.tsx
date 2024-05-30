import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Video from 'react-native-video';
import {requestBackupAndXpubKeyStx} from '../../../../lib/nfc-protocol/wallet';
import {storeBackupSharePhone} from '../../../../lib/storage';
import ScreenheaderOnboarding from '../../../Components/onboarding/ScreenHeaderOnboarding/ScreenHeaderOnboarding';
import {Wallet, useWallet} from '../../../Utils/walletContext';
import {FAKE_SERIAL} from '../../../Utils/walletsFake';
import {serialFromXPubKey} from '../../../../lib/ryder-one-mock';

const Step6 = ({route, navigation}) => {
  const {navigate, goBack} = navigation;
  const {ryderOneName} = route.params;
  const ryderOneAnimation = require('../assets/tap_ryder_one.mp4');
  const {setCurrentDevice, setCurrentWallet} = useWallet();

  const backupOnPhone = async () => {
    // TODO: nfc protocol: "request backup share"
    const {share, xPubKeyStx} = await requestBackupAndXpubKeyStx();

    const serial = serialFromXPubKey(xPubKeyStx);
    const device = {icon: undefined, name: ryderOneName, serial};
    setCurrentDevice(device);
    console.log(device);
    const wallet: Wallet = {
      currentIndex: 0,
      assets: {
        stx: {
          accounts: [],
          xtendedPublicKey: xPubKeyStx,
        },
      },
    };
    setCurrentWallet(wallet);
    await storeBackupSharePhone(share);
    navigate('StepFinal', {mode: 'create'});
  };

  return (
    <SafeAreaView style={styles.companionAppTemplate}>
      <View style={[styles.welcome, styles.welcomeFlexBox]}>
        <View style={[styles.frameParent, styles.welcomeFlexBox]}>
          <View style={styles.frameGroup}>
            <ScreenheaderOnboarding step={6} mode={'create'} />
            <View style={styles.frameWrapper}>
              <View style={[styles.frameView, styles.frameSpaceBlock]}>
                <View>
                  <Text style={[styles.step6, styles.step6Clr]}>Step 6</Text>
                  <Text style={[styles.backupOnPhone, styles.backupTypo]}>
                    Backup on your phone
                  </Text>
                </View>
                <Text
                  style={
                    styles.tapYourRyder
                  }>{`Hold your Ryder One near your phone to transfer the second TapSafe recovery backup.`}</Text>
              </View>
            </View>
          </View>
          <View style={[styles.frameWrapper1, styles.frameSpaceBlock]}>
            <Video
              source={ryderOneAnimation}
              repeat={true}
              onError={(e) => {
                console.log('error', e);
              }}
              resizeMode="contain"
              style={styles.backgroundVideo}
            />
          </View>
          <View style={[styles.frameView, styles.frameSpaceBlock]}>
            <Pressable
              onPress={() => {
                backupOnPhone();
              }}>
              <View style={[styles.buttonclassic1, styles.buttonclassicFlexBox]}>
                <View style={styles.textWrapper}>
                  <Text style={[styles.labelText, styles.backupTypo]}>Ready to scan</Text>
                </View>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    marginTop: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50%',
    height: 390,
    alignSelf: 'center',
  },
  timeFlexBox: {
    textAlign: 'center',
    color: '#fff',
  },
  batterySpaceBlock: {
    marginLeft: 7,
    height: 11,
  },
  borderPosition: {
    opacity: 0.3,
    position: 'absolute',
  },
  welcomeFlexBox: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  frameSpaceBlock: {
    paddingHorizontal: 20,
    paddingVertical: 0,
  },
  frameLayout: {
    marginLeft: 6,
    height: 6,
    borderRadius: 100,
  },
  step6Clr: {
    color: '#919191',
    fontFamily: 'Poppins-Regular',
  },
  backupTypo: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  buttonclassicFlexBox: {
    borderRadius: 8,
    paddingHorizontal: 20,
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  howToBackupTypo: {
    lineHeight: 16,
    fontSize: 12,
    textAlign: 'left',
    alignSelf: 'stretch',
  },
  time: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
  timeStyle: {
    top: 10,
    left: 0,
    flexDirection: 'row',
    position: 'absolute',
  },
  lensIcon: {
    width: 11,
    height: 11,
  },
  dynamicIsland: {
    left: 114,
    borderRadius: 37,
    backgroundColor: '#000',
    width: 124,
    justifyContent: 'flex-end',
    paddingTop: 13,
    paddingRight: 12,
    paddingBottom: 13,
    top: 0,
    flexDirection: 'row',
    position: 'absolute',
  },
  cellularConnectionIcon: {
    width: 17,
    height: 11,
  },
  wifiIcon: {
    width: 15,
  },
  border: {
    right: 2,
    borderRadius: 3,
    borderColor: '#fff',
    borderWidth: 1,
    width: 22,
    height: 11,
    top: 0,
    borderStyle: 'solid',
  },
  capIcon: {
    top: 4,
    right: 0,
    width: 1,
    height: 4,
  },
  capacity: {
    top: 2,
    right: 4,
    borderRadius: 1,
    width: 18,
    height: 7,
    backgroundColor: '#fff',
    position: 'absolute',
  },
  battery: {
    width: 24,
  },
  right: {
    top: 13,
    left: 281,
    flexDirection: 'row',
    position: 'absolute',
  },
  timeStyleParent: {
    marginLeft: -175.83,
    top: 5,
    left: '50%',
    width: 352,
    height: 37,
    position: 'absolute',
  },
  statusBars: {
    height: 47,
    width: 390,
  },
  iconWrapper: {
    width: 16,
    height: 16,
  },
  buttoniconOnly: {
    borderRadius: 999,
    justifyContent: 'center',
    backgroundColor: '#2b2b2b',
    paddingVertical: 0,
    paddingHorizontal: 20,
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  frameChild: {
    height: 6,
    width: 12,
    borderRadius: 100,
    backgroundColor: '#2b2b2b',
  },
  frameItem: {
    width: 12,
    marginLeft: 6,
    backgroundColor: '#2b2b2b',
  },
  frameChild2: {
    backgroundColor: '#7b61ff',
    width: 32,
  },
  rectangleParent: {
    flexDirection: 'row',
  },
  buttoniconOnlyParent: {
    paddingVertical: 0,
    height: 40,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: 390,
  },
  step6: {
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: 'left',
    fontSize: 14,
    color: '#919191',
    fontFamily: 'Poppins-Regular',
  },
  backupOnPhone: {
    fontSize: 22,
    lineHeight: 28,
    marginTop: 4,
    textAlign: 'left',
    color: '#fff',
  },
  tapYourRyder: {
    marginTop: 12,
    textAlign: 'left',
    color: '#919191',
    fontFamily: 'Poppins-Regular',
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: 14,
    alignSelf: 'stretch',
  },
  buttonclassicChild: {
    borderRadius: 4,
    width: 48,
    height: 32,
    overflow: 'hidden',
  },
  howToBackup: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    color: '#fff',
    lineHeight: 16,
    fontSize: 12,
  },
  watchTheDemo: {
    marginTop: 4,
    color: '#919191',
    fontFamily: 'Poppins-Regular',
  },
  howToBackupMyRyderOneParent: {
    marginLeft: 12,
    flex: 1,
  },
  frameView: {
    paddingVertical: 0,
    alignSelf: 'stretch',
  },
  frameWrapper: {
    marginTop: 40,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  frameGroup: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  frameIcon: {
    width: 132,
    height: 389,
  },
  frameWrapper1: {
    paddingVertical: 0,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 16,
    color: '#131313',
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: 'center',
  },
  textWrapper: {
    paddingHorizontal: 8,
    justifyContent: 'center',
    paddingVertical: 0,
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconWrapper1: {
    width: 20,
    height: 20,
    display: 'none',
  },
  buttonclassic1: {
    height: 48,
    justifyContent: 'center',
    paddingVertical: 0,
    backgroundColor: '#fff',
  },
  frameParent: {
    paddingBottom: 20,
    alignSelf: 'stretch',
  },
  homeIndicator: {
    width: 134,
    height: 5,
    borderRadius: 100,
    backgroundColor: '#fff',
  },
  homeIndicators: {
    paddingHorizontal: 0,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 390,
  },
  welcome: {
    paddingTop: 20,
    width: 390,
    overflow: 'hidden',
  },
  companionAppTemplate: {
    backgroundColor: '#131313',
    borderColor: '#404040',
    borderWidth: 0,
    width: '100%',
    height: 852,
    overflow: 'hidden',
    flex: 1,
    borderStyle: 'solid',
  },
});

export default Step6;

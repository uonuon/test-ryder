import * as React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {tempPairDevice} from '../../../../lib/ryder-one';
import ScreenheaderOnboarding from '../../../Components/onboarding/ScreenHeaderOnboarding/ScreenHeaderOnboarding';
import {Wallet, useWallet} from '../../../Utils/walletContext';
import {setFakeDevice1} from '../../../Utils/walletsFake';
import {useLogger} from '../../../hooks/AppendLogger';
import Video from 'react-native-video';
import {requestXpubKeyStx} from '../../../../lib/nfc-protocol/wallet';
import {serialFromXPubKey} from '../../../../lib/ryder-one-mock';

const Step5RecoverFromApp = ({route, navigation}) => {
  const ryderOneAnimation = require('../assets/tap-anim.mp4');

  const {navigate, goBack} = navigation;
  const logger = useLogger();
  const {currentDevice, setCurrentDevice, setCurrentWallet} = useWallet();
  const confirmRecovery = async () => {
    // TODO: nfc protocol: "request stx xpub key"
    const {xPubKeyStx} = await requestXpubKeyStx();

    const serial = serialFromXPubKey(xPubKeyStx);
    setCurrentDevice({icon: undefined, name: currentDevice?.name || 'New Ryder One', serial});

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

    // setFakeDevice1(setCurrentDevice, setCurrentWallet);

    navigate('StepFinal', {mode: 'recover'});
  };
  return (
    <SafeAreaView style={styles.companionAppTemplate}>
      <View style={[styles.welcome, styles.parentFlexBox]}>
        <View style={[styles.frameParent, styles.parentFlexBox]}>
          <View style={[styles.frameGroup, styles.frameWrapperFlexBox]}>
            <ScreenheaderOnboarding step={5} mode={'recover'} />
            <View style={[styles.frameWrapper, styles.frameWrapperFlexBox]}>
              <View style={[styles.frameView, styles.frameSpaceBlock]}>
                <View>
                  <Text style={[styles.step6, styles.step6Typo]}>Step 5</Text>
                  <Text style={[styles.tapToConfirm, styles.labelTextTypo]}>Confirm recovery</Text>
                </View>
                <Text style={[styles.pleaseTapYour, styles.step6Typo]}>
                  When you see this animation playing, click on “Ready to scan” and tap your phone
                  and Ryder One to confirm the recovery process.
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.frameWrapper1, styles.frameSpaceBlock, styles.videoContainer]}>
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
          <Pressable
            style={[styles.frameView, styles.frameSpaceBlock]}
            onPress={() => {
              confirmRecovery();
            }}>
            <View style={[styles.buttonclassic, styles.textWrapperFlexBox]}>
              <View style={[styles.textWrapper, styles.textWrapperFlexBox]}>
                <Text style={[styles.labelText, styles.labelTextTypo]}>Ready to scan</Text>
              </View>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    height: 190,
  },
  backgroundVideo: {
    marginTop: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  parentFlexBox: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  frameWrapperFlexBox: {
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  frameSpaceBlock: {
    paddingHorizontal: 20,
    paddingVertical: 0,
  },
  step6Typo: {
    color: '#919191',
    fontFamily: 'Poppins-Regular',
  },
  labelTextTypo: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  textWrapperFlexBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  step6: {
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: 'left',
    fontSize: 14,
    color: '#919191',
    fontFamily: 'Poppins-Regular',
  },
  tapToConfirm: {
    fontSize: 22,
    lineHeight: 28,
    marginTop: 4,
    textAlign: 'left',
    color: '#fff',
  },
  pleaseTapYour: {
    marginTop: 12,
    textAlign: 'left',
    color: '#919191',
    fontFamily: 'Poppins-Regular',
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: 14,
    alignSelf: 'stretch',
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
    fontWeight: '500',
  },
  textWrapper: {
    paddingHorizontal: 8,
    justifyContent: 'center',
    paddingVertical: 0,
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonclassic: {
    borderRadius: 16,
    height: 48,
    paddingVertical: 0,
    paddingHorizontal: 20,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  frameParent: {
    paddingBottom: 20,
    alignSelf: 'stretch',
    flex: 1,
  },
  welcome: {
    paddingTop: 20,
    width: '100%',
    overflow: 'hidden',
    flex: 1,
  },
  companionAppTemplate: {
    backgroundColor: '#131313',
    borderWidth: 0,
    width: '100%',
    height: 852,
    overflow: 'hidden',
    flex: 1,
    borderStyle: 'solid',
  },
});

export default Step5RecoverFromApp;

import React, {useState} from 'react';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Video from 'react-native-video';

import {requestCreateWallet} from '../../../../lib/nfc-protocol/wallet';
import WalletPopup from '../../../Components/WalletPopup/WalletPopup';
import ScreenheaderOnboarding from '../../../Components/onboarding/ScreenHeaderOnboarding/ScreenHeaderOnboarding';
import {useWallet} from '../../../Utils/walletContext';

const Step4 = ({route, navigation}) => {
  const {navigate, goBack} = navigation;
  const {ryderOneName} = route.params;
  const {setCurrentDevice, setCurrentWallet} = useWallet();
  const [showPopup, setShowPopup] = useState(false);
  const ryderOneAnimation = require('../assets/tap_ryder_one.mp4');
  const createWallet = async () => {
    // TODO: nfc protocol: "create wallet"
    try {
      await requestCreateWallet(); // TODO: send name to Ryder
      setShowPopup(true);
    } catch (e) {
      console.log(e);
      Alert.alert('NFC Error', 'failed to send request to create wallet');
    }
  };

  return (
    <SafeAreaView style={styles.companionAppTemplate}>
      {showPopup ? <WalletPopup onButtonPress={() => navigate('Step5', {ryderOneName})} /> : ''}
      <View style={[styles.welcome, styles.welcomeFlexBox]}>
        <View style={[styles.frameParent, styles.welcomeFlexBox]}>
          <View style={[styles.frameGroup, styles.frameWrapperFlexBox]}>
            <ScreenheaderOnboarding step={4} mode={'create'} />
            <View style={[styles.frameWrapper, styles.frameWrapperFlexBox]}>
              <View style={[styles.frameView, styles.frameSpaceBlock]}>
                <View>
                  <Text style={[styles.step4, styles.step4Typo]}>Step 4</Text>
                  <Text style={[styles.tapRyderOne, styles.labelTextTypo]}>
                    Tap to begin wallet creation
                  </Text>
                </View>
                <Text style={[styles.ryderProductsWork, styles.step4Typo]}>
                  Press “Ready to scan” and hold your Ryder One near your phone to create your
                  wallet.
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
          <View style={[styles.frameView, styles.frameSpaceBlock]}>
            <Pressable
              onPress={() => {
                createWallet();
              }}>
              <View style={[styles.buttonclassic, styles.textWrapperFlexBox]}>
                <View style={[styles.textWrapper, styles.textWrapperFlexBox]}>
                  <Text style={[styles.labelText, styles.labelTextTypo]}>Ready to scan</Text>
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
  videoContainer: {
    height: 390,
  },
  backgroundVideo: {
    marginTop: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  welcomeFlexBox: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  frameWrapperFlexBox: {
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  frameSpaceBlock: {
    paddingHorizontal: 20,
    paddingVertical: 0,
  },
  textWrapperFlexBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  step4Typo: {
    color: '#919191',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
  },
  labelTextTypo: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    textAlign: 'left',
  },
  step4: {
    textAlign: 'left',
  },
  tapRyderOne: {
    fontSize: 22,
    lineHeight: 28,
    marginTop: 4,
    color: '#fff',
  },
  ryderProductsWork: {
    textAlign: 'left',
    marginTop: 12,
    alignSelf: 'stretch',
  },
  frameView: {
    paddingVertical: 0,
    alignSelf: 'stretch',
  },
  frameWrapper: {
    marginTop: 40,
    alignSelf: 'stretch',
  },
  frameGroup: {
    alignSelf: 'stretch',
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
    paddingVertical: 0,
    flexDirection: 'row',
  },
  buttonclassic: {
    borderRadius: 8,
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
  },
  welcome: {
    paddingTop: 20,
    width: '100%',
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

export default Step4;

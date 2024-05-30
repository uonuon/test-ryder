import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {Text, StyleSheet, View, Image, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Video from 'react-native-video';
import ScreenheaderOnboarding from '../../../Components/onboarding/ScreenHeaderOnboarding/ScreenHeaderOnboarding';

const Step2 = ({route, navigation}) => {
  const {navigate, goBack} = navigation;
  const {mode} = route.params;
  const ryderOneAnimation = require('../assets/pin_creation.mp4');

  return (
    <SafeAreaView style={styles.companionAppTemplate}>
      <View style={[styles.welcome, styles.welcomeSpaceBlock]}>
        <View style={styles.frameParent}>
          <View style={styles.frameGroup}>
            <ScreenheaderOnboarding step={2} mode={mode} />
            <View style={styles.frameWrapper}>
              <View style={[styles.frameContainer, styles.wrapperSpaceBlock]}>
                <View>
                  <Text style={[styles.step2, styles.usClr]}>Step 2</Text>
                  <Text style={[styles.createDevicePasscode, styles.whatIfISpaceBlock]}>
                    Create device passcode
                  </Text>
                </View>
                <Text style={styles.thisPasscodeWill}>
                  This passcode will be required to access your Ryder One and authorize
                  transactions.
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.pickLanguagePinWrapper, styles.wrapperSpaceBlock]}>
            <View style={styles.pickLanguagePinLayout}>
              <Video
                source={ryderOneAnimation}
                repeat={true}
                onError={(e) => {
                  console.log('error', e);
                }}
                resizeMode="contain"
                style={styles.backgroundVideo}
              />

              <View style={[styles.frameView, styles.frameViewLayout]}>
                <View style={[styles.flagParent, styles.frameViewLayout]}>
                  <Image
                    style={styles.flagIcon}
                    resizeMode="cover"
                    source={require('../assets/flag.png')}
                  />
                  <View style={styles.englishParent}>
                    <Text style={[styles.english, styles.usTypo]}>English</Text>
                    <Text style={[styles.us, styles.usTypo]}>(US)</Text>
                  </View>
                </View>
                <View style={[styles.flagParent, styles.frameViewLayout]}>
                  <Image
                    style={styles.flagIcon}
                    resizeMode="cover"
                    source={require('../assets/flag.png')}
                  />
                  <View style={styles.englishParent}>
                    <Text style={[styles.english, styles.usTypo]}>German</Text>
                    <Text style={[styles.us, styles.usTypo]}>(DE)</Text>
                  </View>
                </View>
                <View style={[styles.flagParent, styles.frameViewLayout]}>
                  <Image
                    style={styles.flagIcon}
                    resizeMode="cover"
                    source={require('../assets/flag.png')}
                  />
                  <View style={styles.englishParent}>
                    <Text style={[styles.english, styles.usTypo]}>Japanese</Text>
                    <Text style={[styles.us, styles.usTypo]}>(JP)</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.buttonclassicWrapper, styles.wrapperSpaceBlock]}>
          <View style={[styles.buttonclassic, styles.buttonclassicFlexBox]}>
            <Image
              style={styles.buttoniconOnly1}
              resizeMode="cover"
              source={require('../assets/buttonicononly.png')}
            />
            <View style={styles.thisPasscodeWillNeverLeaveParent}>
              <Text style={[styles.thisPasscodeWill1, styles.usTypo]}>
                This passcode will never leave your Ryder One. Do not share it with anyone.
              </Text>
              <Text style={[styles.whatIfI, styles.usTypo]}>
                What if I lose my device passcode?
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.frameContainer, styles.wrapperSpaceBlock]}>
          <Pressable
            onPress={() => {
              navigate(mode === 'recover' ? 'Step3RecoverFromApp' : 'Step3');
            }}>
            <View style={[styles.buttonclassic1, styles.buttonclassicFlexBox]}>
              <View style={[styles.textWrapper, styles.textWrapperFlexBox]}>
                <Text style={[styles.labelText, styles.englishTypo]}>Continue</Text>
              </View>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  welcomeSpaceBlock: {
    paddingHorizontal: 0,
    width: '100%',
  },
  wrapperSpaceBlock: {
    paddingHorizontal: 20,
    paddingVertical: 0,
  },
  textWrapperFlexBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  usClr: {
    color: '#919191',
    fontFamily: 'Poppins-Regular',
  },
  whatIfISpaceBlock: {
    marginTop: 4,
    color: '#fff',
  },
  pickLanguagePinLayout: {
    height: 218,
    width: 167,
  },
  frameViewLayout: {
    width: 116,
    position: 'absolute',
  },
  usTypo: {
    lineHeight: 16,
    fontSize: 12,
    textAlign: 'left',
  },
  buttonclassicFlexBox: {
    borderRadius: 8,
    paddingHorizontal: 20,
    alignSelf: 'stretch',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  englishTypo: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  step2: {
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: 'left',
    fontSize: 14,
    color: '#919191',
  },
  createDevicePasscode: {
    fontSize: 22,
    lineHeight: 28,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    textAlign: 'left',
  },
  thisPasscodeWill: {
    marginTop: 12,
    textAlign: 'left',
    color: '#919191',
    fontFamily: 'Poppins-Regular',
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: 14,
    alignSelf: 'stretch',
  },
  frameContainer: {
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
  flagIcon: {
    height: 12,
    width: 16,
    borderRadius: 1,
    overflow: 'hidden',
  },
  english: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    color: '#fff',
  },
  us: {
    color: '#919191',
    fontFamily: 'Poppins-Regular',
  },
  englishParent: {
    marginLeft: 8,
  },
  flagParent: {
    marginLeft: -58,
    bottom: 0,
    paddingRight: 4,
    opacity: 0,
    alignItems: 'center',
    flexDirection: 'row',
    left: '50%',
  },
  frameView: {
    top: 34,
    left: 25,
    height: 136,
  },
  pickLanguagePinWrapper: {
    marginTop: 80,
    paddingVertical: 0,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  frameParent: {
    height: 545,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  buttoniconOnly1: {
    height: 24,
    width: 24,
    overflow: 'hidden',
  },
  thisPasscodeWill1: {
    color: '#ffdb8b',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    alignSelf: 'stretch',
  },
  whatIfI: {
    textDecorationLine: 'underline',
    marginTop: 4,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    alignSelf: 'stretch',
  },
  thisPasscodeWillNeverLeaveParent: {
    marginLeft: 4,
    flex: 1,
  },
  buttonclassic: {
    backgroundColor: '#200d01',
    borderColor: '#673200',
    paddingVertical: 12,
    borderWidth: 1,
    borderStyle: 'solid',
  },
  buttonclassicWrapper: {
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
    paddingVertical: 0,
    flexDirection: 'row',
  },
  buttonclassic1: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 0,
    backgroundColor: '#fff',
  },
  welcome: {
    paddingVertical: 20,
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    alignItems: 'center',
    overflow: 'hidden',
    flex: 1,
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

export default Step2;

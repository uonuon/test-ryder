import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {Text, StyleSheet, View, Image, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Video from 'react-native-video';
import ScreenheaderOnboarding from '../../../Components/onboarding/ScreenHeaderOnboarding/ScreenHeaderOnboarding';
const Step1 = ({route, navigation}) => {
  const {navigate, goBack} = navigation;
  const {mode} = route.params;
  const ryderOneAnimation = require('../assets/ryderone.mp4');
  return (
    <SafeAreaView style={[styles.companionAppTemplate, styles.welcomeFlexBox1]}>
      <View style={[styles.welcome, styles.welcomeSpaceBlock]}>
        <View style={[styles.frameParent, styles.frameParentFlexBox]}>
          <View style={[styles.frameGroup, styles.frameParentFlexBox]}>
            <ScreenheaderOnboarding step={1} mode={mode} />

            <View style={[styles.frameWrapper, styles.frameParentFlexBox]}>
              <View style={[styles.frameContainer, styles.buttoniconParentSpaceBlock]}>
                <View>
                  <Text style={[styles.step1, styles.step1Typo]}>Step 1</Text>
                  <Text style={[styles.turnOnRyder, styles.labelTextTypo]}>
                    Turn on {mode === 'recover' ? 'new' : ''} Ryder One
                  </Text>
                </View>
                <Text style={[styles.unboxYourRyder, styles.step1Typo]}>
                  Long press the secure capacitive button to turn on your{' '}
                  {mode === 'recover' ? 'new' : ''} Ryder One.
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.oneFrontViewBlackScreen1Parent, styles.buttoniconParentSpaceBlock]}>
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
        </View>
        <View style={[styles.frameContainer, styles.buttoniconParentSpaceBlock]}>
          <Pressable
            onPress={() => {
              navigate('Step2', {mode});
            }}>
            <View style={[styles.buttonclassic, styles.textWrapperFlexBox]}>
              <View style={[styles.textWrapper, styles.textWrapperFlexBox]}>
                <Text style={[styles.labelText, styles.labelTextTypo]}>Continue</Text>
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
    width: '55%',
    height: '100%',
    alignSelf: 'center',
  },
  welcomeFlexBox1: {
    flex: 1,
    overflow: 'hidden',
  },
  batterySpaceBlock: {
    marginLeft: 7,
    height: 11,
  },
  borderPosition: {
    opacity: 0.3,
    position: 'absolute',
  },
  welcomeSpaceBlock: {
    paddingHorizontal: 0,
    width: '100%',
  },
  frameParentFlexBox: {
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  buttoniconParentSpaceBlock: {
    paddingHorizontal: 20,
    paddingVertical: 0,
  },
  textWrapperFlexBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  frameLayout: {
    height: 6,
    borderRadius: 100,
  },
  step1Typo: {
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
  time: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    color: '#fff',
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
  iconWrapper: {
    width: 16,
    height: 16,
  },
  buttoniconOnly: {
    paddingVertical: 0,
    height: 40,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  frameChild: {
    backgroundColor: '#7b61ff',
    width: 32,
  },
  frameItem: {
    width: 12,
    marginLeft: 6,
    backgroundColor: '#2b2b2b',
  },
  rectangleParent: {
    flexDirection: 'row',
  },
  buttoniconOnlyParent: {
    paddingVertical: 0,
    height: 40,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 390,
  },
  step1: {
    textAlign: 'left',
  },
  turnOnRyder: {
    fontSize: 22,
    lineHeight: 28,
    marginTop: 4,
    color: '#fff',
  },
  unboxYourRyder: {
    textAlign: 'left',
    marginTop: 12,
    alignSelf: 'stretch',
  },
  frameContainer: {
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
  oneFrontViewBlackScreen1: {
    width: 167,
    height: 218,
    zIndex: 0,
  },
  component21Icon: {
    top: 122,
    left: 135,
    width: 120,
    height: 120,
    zIndex: 1,
    position: 'absolute',
    overflow: 'hidden',
  },
  oneFrontViewBlackScreen1Parent: {
    marginTop: -140,
    paddingVertical: 0,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  frameParent: {
    height: 545,
    alignSelf: 'stretch',
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
  iconWrapper1: {
    width: 20,
    height: 20,
    display: 'none',
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
  welcome: {
    paddingVertical: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
    flex: 1,
  },
  homeIndicator: {
    width: 134,
    height: 5,
    borderRadius: 100,
    backgroundColor: '#fff',
  },
  homeIndicators: {
    paddingVertical: 8,
    paddingHorizontal: 0,
    width: 390,
  },
  companionAppTemplate: {
    backgroundColor: '#131313',
    borderColor: '#404040',
    borderWidth: 0,
    width: '100%',
    height: 852,
    overflow: 'hidden',
    borderStyle: 'solid',
  },
});

export default Step1;

import * as React from 'react';
import {Text, StyleSheet, View, Image, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ScreenheaderOnboarding from '../../../Components/onboarding/ScreenHeaderOnboarding/ScreenHeaderOnboarding';
import GenuineAlert from '../../../Components/GenuineAlert/GenuineAlert';
import Video from 'react-native-video';

const Step4RecoverFromApp = ({route, navigation}) => {
  const {navigate, goBack} = navigation;
  const ryderOneAnimation = require('../assets/tap-recovery-tag.mp4');
  return (
    <SafeAreaView style={styles.companionAppTemplate}>
      <View style={[styles.welcome, styles.parentFlexBox]}>
        <View style={[styles.frameParent, styles.parentFlexBox]}>
          <View style={styles.frameGroup}>
            <View style={styles.frameGroup}>
              <ScreenheaderOnboarding step={4} mode={'recover'} />
              <View style={styles.frameWrapper}>
                <View style={[styles.frameView, styles.frameParentSpaceBlock]}>
                  <View>
                    <Text style={(styles.step5, styles.step5Clr)}>Step 4</Text>
                    <Text style={[styles.recoverWithTapsafe, styles.whatDoesThisSpaceBlock]}>
                      Tap your Recovery Tag
                    </Text>
                  </View>
                  <Text style={[styles.recoverYourRyder, styles.buttonclassicSpaceBlock]}>
                    Finish the recovery process by tapping your second backup on your Ryder One.
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={[styles.frameParent1, styles.frameParentSpaceBlock, styles.videoContainer]}>
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
          <View style={[styles.frameView, styles.frameParentSpaceBlock]}>
            <GenuineAlert />
            <Pressable
              style={[styles.buttonclassic, styles.buttonclassicSpaceBlock]}
              onPress={() => {
                navigate('Step5RecoverFromApp');
              }}>
              <View style={styles.textWrapper}>
                <Text style={[styles.labelText, styles.labelTextTypo]}>Continue</Text>
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
  parentFlexBox: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  frameParentSpaceBlock: {
    paddingHorizontal: 20,
    paddingVertical: 0,
  },
  whatDoesThisSpaceBlock: {
    marginTop: 4,
    color: '#fff',
  },
  buttonclassicSpaceBlock: {
    marginTop: 12,
    alignSelf: 'stretch',
  },
  frameLayout: {
    borderRadius: 17,
    position: 'absolute',
    overflow: 'hidden',
  },
  step5Clr: {
    color: '#919191',
    fontFamily: 'Poppins-Regular',
  },
  labelTextTypo: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    textAlign: 'center',
  },
  step5: {
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: 'left',
    fontSize: 14,
    color: '#919191',
    fontFamily: 'Poppins-Regular',
  },
  recoverWithTapsafe: {
    fontSize: 22,
    lineHeight: 28,
    marginTop: 4,
    textAlign: 'left',
    color: '#fff',
  },
  recoverYourRyder: {
    color: '#b3b3b3',
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: 14,
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
    top: 189,
    left: 37,
    width: 70,
    height: 70,
    zIndex: 0,
  },
  frameChild5: {
    top: 145,
    left: 102,
    width: 67,
    height: 67,
    zIndex: 1,
  },
  iphone14Pro: {
    top: 66,
    left: 153,
    width: 200,
    height: 317,
    zIndex: 2,
    position: 'absolute',
  },
  frameParent1: {
    justifyContent: 'center',
    paddingVertical: 0,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 16,
    color: '#131313',
    lineHeight: 20,
    letterSpacing: 0,
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
    justifyContent: 'center',
    paddingVertical: 0,
    paddingHorizontal: 20,
    alignSelf: 'stretch',
    alignItems: 'center',
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

export default Step4RecoverFromApp;

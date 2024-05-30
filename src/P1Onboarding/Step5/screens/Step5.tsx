import * as React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Video from 'react-native-video';
import ScreenheaderOnboarding from '../../../Components/onboarding/ScreenHeaderOnboarding/ScreenHeaderOnboarding';

const Step5 = ({route, navigation}) => {
  const {navigate, goBack} = navigation;
  const {ryderOneName} = route.params;
  const ryderOneAnimation = require('../assets/tap_recovery_tag.mp4');
  return (
    <SafeAreaView style={styles.companionAppTemplate}>
      <View style={[styles.welcome, styles.parentFlexBox]}>
        <View style={[styles.frameParent, styles.parentFlexBox]}>
          <View style={styles.frameGroup}>
            <View style={styles.frameGroup}>
              <ScreenheaderOnboarding step={5} mode={'create'} />
              <View style={styles.frameWrapper}>
                <View style={[styles.frameView, styles.frameSpaceBlock]}>
                  <View>
                    <Text style={[styles.step5, styles.step5Clr]}>Step 5</Text>
                    <Text style={[styles.backupOnRecovery, styles.backupTypo]}>
                      Backup on your Recovery{'\u00a0'}Tag
                    </Text>
                  </View>
                  <Text
                    style={
                      styles.tapYourRyder
                    }>{`Hold your Recovery Tag near your Ryder One to transfer the first TapSafe recovery backup.`}</Text>
                </View>
              </View>
            </View>
            <View style={[styles.frameWrapper1, styles.frameSpaceBlock]}>
              <View style={styles.ryderGoesDownParent}>
                <View style={styles.ryderGoesDown}>
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
            </View>
          </View>
          <View style={[styles.frameView, styles.frameSpaceBlock]}>
            <Pressable
              onPress={() => {
                navigate('Step6', {ryderOneName});
              }}>
              <View style={styles.buttonclassic1}>
                <View style={[styles.textWrapper, styles.textWrapperFlexBox]}>
                  <Text style={[styles.labelText, styles.backupTypo]}>Continue</Text>
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
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50%',
    height: 490,
    alignSelf: 'center',
  },
  timeStylePosition: {
    left: 0,
    position: 'absolute',
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
  parentFlexBox: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  frameSpaceBlock: {
    paddingHorizontal: 20,
    paddingVertical: 0,
  },
  textWrapperFlexBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  frameLayout: {
    marginLeft: 6,
    height: 6,
    borderRadius: 100,
  },
  step5Clr: {
    color: '#919191',
    fontFamily: 'Poppins-Regular',
  },
  backupTypo: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  howToBackupTypo: {
    lineHeight: 16,
    fontSize: 12,
    textAlign: 'left',
    alignSelf: 'stretch',
  },
  backupOnTagLayout: {
    height: 218,
    width: 167,
  },

  iconLayout: {
    height: 17,
    width: 17,
  },
  time: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    textAlign: 'center',
  },
  timeStyle: {
    top: 10,
    flexDirection: 'row',
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
  iconWrapper: {
    width: 16,
    height: 16,
  },
  buttoniconOnly: {
    borderRadius: 999,
    backgroundColor: '#2b2b2b',
    justifyContent: 'center',
    paddingVertical: 0,
    paddingHorizontal: 20,
    height: 40,
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
  frameChild1: {
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
  step5: {
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: 'left',
    fontSize: 14,
    color: '#919191',
    fontFamily: 'Poppins-Regular',
  },
  backupOnRecovery: {
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
  icon: {
    left: 41,
    width: 84,
    height: 86,
    opacity: 0,
    top: 0,
    position: 'absolute',
  },
  ryderGoesDown: {
    height: 100,
    width: 376,
  },
  pulse2Icon: {
    width: 120,
    height: 120,
    marginTop: -70,
    overflow: 'hidden',
  },
  oneFrontViewBlackScreen1: {
    top: 0,
    left: 0,
    position: 'absolute',
  },
  deviceMobileIcon: {
    overflow: 'hidden',
  },
  deviceMobileParent: {
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  onMyPhone: {
    fontSize: 9,
    lineHeight: 11,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
  },
  onMyPhoneWrapper: {
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
  },
  placeRyderOne: {
    fontSize: 6,
    lineHeight: 7,
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    letterSpacing: 0,
    alignSelf: 'stretch',
    color: '#fff',
  },
  placeRyderOneOnYourPhoneWrapper: {
    marginTop: 1.44,
    alignSelf: 'stretch',
  },
  frameParent1: {
    alignSelf: 'stretch',
  },
  socialRecoveryCards: {
    top: 57,
  },
  socialRecoveryCards1: {
    top: 0,
  },
  socialRecoveryCardsParent: {
    top: 55,
    left: 25,
    height: 109,
    width: 115,
    position: 'absolute',
  },
  backupOnTag: {
    marginTop: -70,
  },
  ryderGoesDownParent: {
    alignItems: 'center',
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
    paddingVertical: 0,
    flexDirection: 'row',
  },
  iconWrapper1: {
    width: 20,
    height: 20,
    display: 'none',
  },
  buttonclassic1: {
    height: 48,
    borderRadius: 8,
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
  homeIndicator: {
    width: 134,
    height: 5,
    borderRadius: 100,
    backgroundColor: '#fff',
  },
  homeIndicators: {
    paddingHorizontal: 0,
    paddingVertical: 8,
    width: 390,
  },
  welcome: {
    paddingTop: 20,
    width: 390,
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

export default Step5;

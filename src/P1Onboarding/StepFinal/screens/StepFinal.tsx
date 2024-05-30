import * as React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Video from 'react-native-video';

function readableTime() {
  if (!global.endTime) global.endTime = +new Date();
  const ms = global.endTime - global.startTime;
  let s = ~~(ms / 1000);
  if (s <= 60) return `${s} seconds`;
  else {
    const m = ~~(s / 60);
    const l = s - m * 60;
    return `${m} minute${m > 1 ? 's' : ''}${l > 0 ? ` and ${l} seconds` : ''}`;
  }
}

const StepFinal = ({route, navigation}) => {
  const {navigate, goBack} = navigation;
  const {mode} = route.params;
  const ryderOneAnimation = require('../assets/animated_lock.mp4');

  // React.useEffect(() => {
  //   global.endTime = +new Date();
  // }, []);

  return (
    <SafeAreaView style={styles.companionAppTemplate}>
      <View style={[styles.welcome, styles.welcomeFlexBox]}>
        <View style={[styles.frameParent, styles.welcomeFlexBox]}>
          <View style={[styles.frameGroup, styles.frameGroupFlexBox]}>
            <View style={[styles.frameContainer, styles.textWrapperFlexBox]}>
              <View style={[styles.congratulationParent, styles.buttonclassicParentSpaceBlock]}>
                <Text style={styles.congratulation}>You're done!</Text>
                <Text style={styles.yourWalletIs}>Piece of cake.</Text>
              </View>
              <Video
                source={ryderOneAnimation}
                onError={(e) => {
                  console.log('error', e);
                }}
                resizeMode="contain"
                style={styles.backgroundVideo}
              />
              <View
                style={[
                  styles.youHaveSuccessfullyBackedUWrapper,
                  styles.buttonclassicParentSpaceBlock,
                ]}>
                <Text style={[styles.youHaveSuccessfully, styles.labelTextLayout]}>
                  {mode === 'recover'
                    ? 'You have successfully recovered your Ryder One wallet'
                    : 'You have successfully created and backed up your Ryder One wallet.'}
                </Text>
                {/* <Text style={[styles.youHaveSuccessfully, styles.labelTextLayout, styles.padTextTop]}>
                  It only took you {readableTime()}.
                </Text> */}
              </View>
            </View>
          </View>
          <View style={[styles.buttonclassicWrapper, styles.buttonclassicParentSpaceBlock]}>
            <Pressable
              onPress={() => {
                navigate('WalletRyder', {});
              }}>
              <View style={[styles.buttonclassic, styles.textWrapperFlexBox]}>
                <View style={[styles.textWrapper, styles.textWrapperFlexBox]}>
                  <Text style={[styles.labelText, styles.labelTextLayout]}>
                    Start using my wallet
                  </Text>
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
    width: 300,
    height: 200,
    alignSelf: 'center',
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
  frameGroupFlexBox: {
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  buttonclassicParentSpaceBlock: {
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
  labelTextLayout: {
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: 'center',
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
  frameChild2: {
    backgroundColor: '#7b61ff',
    width: 32,
  },
  rectangleParent: {
    flexDirection: 'row',
  },
  buttoniconOnlyParent: {
    opacity: 0,
    paddingVertical: 0,
    height: 40,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: 390,
  },
  congratulation: {
    fontSize: 22,
    lineHeight: 28,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    textAlign: 'center',
    color: '#fff',
  },
  yourWalletIs: {
    lineHeight: 22,
    marginTop: 4,
    fontFamily: 'Poppins-Regular',
    letterSpacing: 0,
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
  },
  congratulationParent: {
    paddingVertical: 0,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  youHaveSuccessfully: {
    fontSize: 14,
    paddingLeft: 20,
    paddingRight: 20,
    color: '#919191',
    fontFamily: 'Poppins-Regular',
    alignSelf: 'stretch',
  },
  youHaveSuccessfullyBackedUWrapper: {
    marginTop: 40,
    paddingVertical: 0,
    alignSelf: 'stretch',
  },
  frameContainer: {
    height: 465,
    marginTop: 40,
    alignSelf: 'stretch',
  },
  frameGroup: {
    paddingVertical: 40,
    paddingHorizontal: 0,
    alignSelf: 'stretch',
    flex: 1,
  },
  labelText: {
    color: '#131313',
    fontSize: 16,
    lineHeight: 20,
    fontFamily: 'Poppins-Medium',
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
  buttonclassicWrapper: {
    paddingVertical: 0,
    alignSelf: 'stretch',
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
    paddingVertical: 8,
    paddingHorizontal: 0,
    width: 390,
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
  padTextTop: {
    paddingTop: 20,
  },
});

export default StepFinal;

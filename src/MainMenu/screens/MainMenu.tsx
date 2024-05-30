import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {Text, StyleSheet, View, Image, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const MainMenu = () => {
  const {navigate, goBack} = useNavigation();
  return (
    <SafeAreaView style={styles.companionAppTemplate}>
      <View style={styles.welcome}>
        <View style={[styles.buttoniconOnlyParent, styles.buttoniconParentSpaceBlock]}>
          <Pressable
            onPress={() => {
              goBack();
            }}>
            <View style={[styles.buttoniconOnly, styles.buttoniconOnlyFlexBox]}>
              <Image
                style={styles.iconWrapper}
                resizeMode="cover"
                source={require('../assets/icon-wrapper.png')}
              />
            </View>
          </Pressable>
        </View>
        <View style={styles.frameFlexBox}>
          <View style={[styles.whatWouldYouLikeToDoParent, styles.buttoniconParentSpaceBlock]}>
            <Text style={[styles.whatWouldYou, styles.setUpATypo]}>What would you like to do?</Text>
          </View>
          <View style={[styles.frameGroup, styles.frameFlexBox]}>
            <View style={styles.frameSpaceBlock}>
              <Pressable onPress={() => navigate('Step1', {mode: 'create'})}>
                <View style={styles.setUpANewRyderOneParent}>
                  <Text style={[styles.setUpA, styles.setUpATypo]}>Set up a new Ryder One</Text>
                  <Text style={[styles.setUpYour, styles.setUpYourTypo]}>
                    Set up your new device in less than a few minutes.
                  </Text>
                </View>
                <Image
                  style={[styles.frameIcon, styles.frameIconPosition]}
                  resizeMode="cover"
                  source={require('../assets/frame.png')}
                />
              </Pressable>
            </View>
            <View style={[styles.frameView, styles.frameSpaceBlock]}>
              <Pressable onPress={() => navigate('MainMenuRecover')}>
                <View style={styles.setUpANewRyderOneParent}>
                  <Text style={[styles.setUpA, styles.setUpATypo]}>Recover lost Ryder One</Text>
                  <Text style={[styles.setUpYour, styles.setUpYourTypo]}>
                    Use TapSafe Recovery to get your assets back.
                  </Text>
                </View>
                <Image
                  style={[styles.frameIcon1, styles.frameIconPosition]}
                  resizeMode="cover"
                  source={require('../assets/frame1.png')}
                />
              </Pressable>
            </View>
            <View style={[styles.frameView, styles.frameSpaceBlock]}>
              <Pressable onPress={() => {}}>
                <View style={styles.setUpANewRyderOneParent}>
                  <Text style={[styles.setUpA, styles.setUpATypo]}>Pair existing Ryder One</Text>
                  <Text style={[styles.setUpYour, styles.setUpYourTypo]}>
                    Pair your existing Ryder One with this phone and access the same wallet.
                  </Text>
                </View>
                <Image
                  style={[styles.frameIcon2, styles.frameIconPosition]}
                  resizeMode="cover"
                  source={require('../assets/frame2.png')}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  batterySpaceBlock: {
    marginLeft: 7,
    height: 11,
  },
  borderPosition: {
    opacity: 0.3,
    position: 'absolute',
  },
  buttoniconParentSpaceBlock: {
    paddingVertical: 0,
    paddingHorizontal: 20,
  },
  buttoniconOnlyFlexBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  frameLayout: {
    height: 6,
    borderRadius: 100,
  },
  setUpATypo: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    color: '#fff',
  },
  setUpYourTypo: {
    fontFamily: 'Poppins-Regular',
    textAlign: 'left',
  },
  frameFlexBox: {
    marginTop: 40,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  frameIconPosition: {
    zIndex: 1,
    position: 'absolute',
    overflow: 'hidden',
  },
  frameSpaceBlock: {
    paddingHorizontal: 16,
    height: 138,
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    alignSelf: 'stretch',
    paddingVertical: 20,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  time: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    color: '#fff',
  },
  timeStyle: {
    left: 0,
    flexDirection: 'row',
    top: 10,
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
    opacity: 0.3,
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
    paddingVertical: 0,
    paddingRight: 20,
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
    opacity: 0,
    flexDirection: 'row',
  },
  buttoniconOnlyParent: {
    justifyContent: 'space-between',
    height: 40,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: 390,
  },
  whatWouldYou: {
    fontSize: 22,
    lineHeight: 28,
    textAlign: 'left',
  },
  pickAnOption: {
    fontSize: 14,
    lineHeight: 20,
    color: '#919191',
    marginTop: 12,
    textAlign: 'left',
    letterSpacing: 0,
    alignSelf: 'stretch',
  },
  whatWouldYouLikeToDoParent: {
    alignSelf: 'stretch',
  },
  setUpA: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'left',
    letterSpacing: 0,
  },
  setUpYour: {
    fontSize: 12,
    lineHeight: 16,
    width: 181,
    marginTop: 16,
    textAlign: 'left',
    color: '#fff',
  },
  setUpANewRyderOneParent: {
    zIndex: 0,
  },
  frameIcon: {
    top: 0,
    left: 207,
    width: 194,
    height: 149,
  },
  frameIcon1: {
    top: 0,
    left: 220,
    width: 170,
    height: 128,
  },
  frameView: {
    marginTop: 20,
  },
  frameIcon2: {
    left: 225,
    width: 162,
    height: 123,
    top: -12,
  },
  frameGroup: {
    paddingVertical: 0,
    paddingHorizontal: 20,
  },
  welcome: {
    paddingVertical: 20,
    paddingHorizontal: 0,
    alignItems: 'center',
    width: 390,
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
    justifyContent: 'center',
    width: 390,
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

export default MainMenu;

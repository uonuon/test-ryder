import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {Image, ImageBackground, Pressable, StyleSheet, Text, View, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Wallet, useWallet} from '../../Utils/walletContext';
import {createMockExtendedPublicKey} from '../../../lib/ryder-one-mock';

const Welcome = () => {
  const {navigate} = useNavigation();
  const {setCurrentWallet, setCurrentDevice} = useWallet();

  React.useEffect(() => {
    StatusBar.setBarStyle('light-content');
  }, []);

  return (
    <ImageBackground
      style={[styles.unsplashprzw33xuxiIcon]}
      resizeMode="cover"
      source={require('../assets/unsplashprzw3-3xuxi.png')}>
      <SafeAreaView style={styles.companionAppTemplate}>
        <View style={styles.welcome}>
          <Pressable style={styles.groupParent} onLongPress={() => navigate('Home')}>
            <Image
              style={styles.frameChild}
              resizeMode="cover"
              source={require('../assets/group-3128.png')}
            />
            <Text style={[styles.helloRyder, styles.helloRyderTypo]}>Hello, Ryder.</Text>
          </Pressable>
          <Image
            style={styles.one32}
            resizeMode="cover"
            source={require('../assets/one-3-2-final.png')}
          />
          <Image
            style={styles.one32Light}
            resizeMode="cover"
            source={require('../assets/vector-3.png')}
          />
          <Image
            style={styles.one32Bright}
            resizeMode="cover"
            source={require('../assets/vector-4.png')}
          />
          <Image
            style={styles.one31}
            resizeMode="cover"
            source={require('../assets/one-3-1.png')}
          />
          <Image
            style={styles.one31Light}
            resizeMode="cover"
            source={require('../assets/mask-group.png')}
          />
          <View style={[styles.frameParent, styles.parentFlexBox]}>
            <View style={[styles.buttonclassicParent, styles.parentFlexBox]}>
              <Pressable
                style={[styles.buttonclassicParent]}
                onPress={() => {
                  global.startTime = +new Date();
                  navigate('AppPasscode');
                }}>
                <View style={[styles.buttonclassic, styles.buttonclassicFlexBox]}>
                  <View style={[styles.textWrapper, styles.buttonclassicFlexBox]}>
                    <Text style={[styles.labelText, styles.labelTypo]}>Get started</Text>
                  </View>
                  <Image
                    style={styles.iconWrapperLayout}
                    resizeMode="cover"
                    source={require('../assets/icon-wrapper.png')}
                  />
                </View>
              </Pressable>

              <Pressable
                style={[styles.buttonclassic1, styles.buttonclassicFlexBox]}
                onPress={() => {
                  const serial = '#4021';
                  const device = {icon: undefined, name: 'Demo', serial};
                  setCurrentDevice(device);
                  const wallet: Wallet = {
                    currentIndex: 0,
                    assets: {
                      stx: {
                        accounts: [{amountAvailable: 0}],
                        xtendedPublicKey: createMockExtendedPublicKey(),
                      },
                    },
                  };
                  setCurrentWallet(wallet);
                  navigate('WalletRyder', {});
                }}>
                <View style={[styles.textWrapper, styles.buttonclassicFlexBox]}>
                  <Text style={[styles.labelText1, styles.labelTypo1]}>Be a trusted contact</Text>
                </View>
              </Pressable>
            </View>
            <Text style={[styles.byContinuingYouContainer, styles.labelText2Typo]}>
              <Text style={styles.byContinuingYou}>{`By continuing, you consent and agree to our
`}</Text>
              <Text style={styles.termsOfService}>Terms of service</Text>
              <Text style={styles.byContinuingYou}>{` and `}</Text>
              <Text style={styles.termsOfService}>Privacy policy</Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  component2ParentPosition: {
    top: '50%',
    left: '50%',
  },
  rightFlexBox: {
    flexDirection: 'row',
    position: 'absolute',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  componentLayout: {
    height: 0,
    width: 0,
    backgroundColor: '#7b61ff',
    overflow: 'hidden',
  },
  helloRyderTypo: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    color: '#fff',
  },
  buttonclassicFlexBox: {
    paddingVertical: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  labelTypo: {
    color: '#131313',
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  labelTypo1: {
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: 16,
    textAlign: 'center',
  },
  iconWrapperLayout: {
    height: 20,
    width: 20,
  },
  labelText2Typo: {
    lineHeight: 16,
    fontSize: 12,
    letterSpacing: 0,
    textAlign: 'center',
  },
  textWrapper2FlexBox: {
    paddingHorizontal: 4,
    paddingVertical: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonclassic2Position: {
    height: 24,
    top: 20,
    position: 'absolute',
    overflow: 'hidden',
  },
  unsplashprzw33xuxiIcon: {
    width: '100%',
    height: '100%',
    zIndex: 0,
    position: 'absolute',
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
    width: 22,
    borderWidth: 1,
    borderColor: '#fff',
    borderStyle: 'solid',
    height: 11,
    top: 0,
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
  },
  frameChild: {
    width: 28,
    height: 28,
  },
  helloRyder: {
    fontSize: 32,
    lineHeight: 40,
    marginTop: 20,
    textAlign: 'center',
  },
  groupParent: {
    top: 20,
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
  },
  one32: {
    top: 243,
    left: 190,
    width: 146,
    height: 180,
    position: 'absolute',
  },
  one32Light: {
    top: 285,
    left: 228,
    width: 40,
    height: 103,
    position: 'absolute',
  },
  one32Bright: {
    top: 304,
    left: 235,
    width: 30,
    height: 83,
    opacity: 0.5,
    position: 'absolute',
  },
  one31: {
    top: 102,
    left: -30,
    width: 361,
    height: 465,
    position: 'absolute',
    transform: [{rotate: '11.81deg'}],
  },
  one31Light: {
    top: 144,
    left: -82,
    width: 361,
    height: 465,
    position: 'absolute',
  },
  labelText: {
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: 16,
    textAlign: 'center',
  },
  textWrapper: {
    paddingHorizontal: 8,
  },
  buttonclassic: {
    paddingHorizontal: 20,
    height: 48,
    borderRadius: 8,
    paddingVertical: 0,
    alignSelf: 'stretch',
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  labelText1: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    color: '#fff',
  },
  iconWrapper1: {
    display: 'none',
  },
  buttonclassic1: {
    marginTop: 12,
    paddingHorizontal: 20,
    height: 48,
    borderRadius: 8,
    paddingVertical: 0,
    alignSelf: 'stretch',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#fff',
    borderStyle: 'solid',
  },
  buttonclassicParent: {
    alignSelf: 'stretch',
  },
  byContinuingYou: {
    color: '#919191',
  },
  termsOfService: {
    color: '#fff',
  },
  byContinuingYouContainer: {
    fontFamily: 'Poppins-Regular',
    alignSelf: 'stretch',
    marginTop: 20,
  },
  frameParent: {
    top: 587,
    width: '100%',
    paddingHorizontal: 20,
    position: 'absolute',
  },
  labelText2: {
    color: '#131313',
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  iconWrapper2: {
    width: 16,
    height: 16,
  },
  buttonclassic2: {
    left: 322,
    borderRadius: 999,
    height: 24,
    top: 20,
    position: 'absolute',
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  buttoniconOnly: {
    left: 20,
    width: 24,
  },
  welcome: {
    height: 763,
    zIndex: 2,
    width: '100%',
    overflow: 'hidden',
  },
  homeIndicator: {
    borderRadius: 100,
    width: 134,
    height: 5,
    backgroundColor: '#fff',
  },
  homeIndicators: {
    paddingHorizontal: 0,
    paddingVertical: 8,
    zIndex: 3,
    width: 390,
  },
  companionAppTemplate: {
    borderColor: '#404040',
    borderWidth: 0,
    flex: 1,
    width: '100%',
    height: 852,
    overflow: 'hidden',
    borderStyle: 'solid',
  },
});

export default Welcome;

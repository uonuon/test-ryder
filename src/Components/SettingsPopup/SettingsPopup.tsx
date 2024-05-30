import * as React from 'react';
import {Animated, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useWallet} from '../../Utils/walletContext';
import RecoverButton from './RecoverButton';

const SetingsPopup = ({onHide}) => {
  const {currentDevice, setCurrentDevice} = useWallet();
  const slideAnimation = React.useRef(new Animated.Value(-100)).current;

  React.useEffect(() => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, []);

  if (currentDevice === undefined) {
    onHide();
    return;
  }

  const {name, icon, serial} = currentDevice;

  return (
    <>
      <View style={[styles.overlayWrapper]} />
      <Animated.View
        style={[
          styles.ryderPopup,
          {
            bottom: slideAnimation.interpolate({
              inputRange: [-100, 0],
              outputRange: ['-100%', '0%'],
            }),
          },
        ]}>
        <SafeAreaView>
          <View style={[styles.total, styles.frameParentFlexBox1]}>
            <Text style={[styles.settings, styles.settingsTypo]}>Settings</Text>
            <Pressable onPress={onHide}>
              <Image
                style={styles.iconLayout1}
                resizeMode="cover"
                source={require('./assets/icon-wrapper5.png')}
              />
            </Pressable>
          </View>
          <View style={styles.detailCards}>
            <View style={styles.frameParent11}>
              <View style={styles.oneFrontViewBlackScreen1Parent}>
                <Image
                  style={styles.oneFrontViewBlackScreen1}
                  resizeMode="cover"
                  source={require('./assets/one-front-view-black-screen-1.png')}
                />
                <View style={styles.marvinJanssenParent}>
                  <Text style={styles.settingsTypo}>{name}</Text>
                  <Text style={[styles.personal, styles.todayTypo]}>Ryder One {serial}</Text>
                </View>
              </View>
              <View style={styles.frameParent12}>
                <RecoverButton />
                {/*
                <Pressable
                  onPress={() => {
                    setCurrentDevice(undefined);
                    onHide();
                  }}
                  style={[styles.frameParent13, styles.frameParentFlexBox]}>
                  <View style={styles.iconWrapperParent}>
                    <Image
                      style={styles.iconLayout1}
                      resizeMode="cover"
                      source={require('./assets/icon-wrapper7.png')}
                    />
                    <Text style={[styles.forgetWallet, styles.textLayout]}>Forget wallet</Text>
                  </View>
                  <Image
                    style={styles.iconWrapperLayout}
                    resizeMode="cover"
                    source={require('./assets/frame-26086122.png')}
                  />
                </Pressable>
                <Pressable style={[styles.frameParent13, styles.frameParentFlexBox]}>
                  <View style={styles.iconWrapperParent}>
                    <Image
                      style={styles.iconLayout1}
                      resizeMode="cover"
                      source={require('./assets/icon-wrapper8.png')}
                    />
                    <Text style={[styles.forgetWallet, styles.textLayout]}>Recover Ryder One</Text>
                  </View>
                  <Image
                    style={styles.iconWrapperLayout}
                    resizeMode="cover"
                    source={require('./assets/frame-26086122.png')}
                  />
                </Pressable>
                */}
              </View>
            </View>
            <View style={styles.ryderAppVersion001Parent}>
              <Text style={styles.ryderTypo}>Ryder App Version 0.0.1</Text>
              <Text style={[styles.ryderAppVersion, styles.ryderTypo]}>Firmware Version 0.1</Text>
            </View>
          </View>
        </SafeAreaView>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  overlayWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    left: 0,
    position: 'absolute',
    top: 0,
    zIndex: 1,
    width: '100%',
    height: '100%',
  },

  frameParentFlexBox1: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  textLayout: {
    lineHeight: 20,
    letterSpacing: 0,
  },
  todayTypo: {
    color: '#b3b3b3',
    fontFamily: 'Poppins-Regular',
    textAlign: 'left',
  },
  iconWrapperLayout: {
    height: 20,
    width: 20,
  },
  buttonclassicBorder: {
    borderColor: '#fff',
    paddingVertical: 0,
    justifyContent: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  frameParentFlexBox: {
    height: 80,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  ryderTypo: {
    width: 290,
    color: '#b3b3b3',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 16,
  },
  settingsTypo: {
    lineHeight: 28,
    fontSize: 22,
    color: '#fff',
    textAlign: 'left',
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  iconLayout1: {
    height: 24,
    width: 24,
  },
  labelText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  total: {
    alignItems: 'center',
  },
  personal: {
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: 14,
  },
  iconWrapperParent: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  textWrapper7: {
    paddingHorizontal: 8,
    paddingVertical: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  ryderAppVersion: {
    marginTop: 8,
  },
  settings: {
    left: 0,
    top: 0,
  },
  oneFrontViewBlackScreen1: {
    borderRadius: 11,
    width: 86,
    height: 109,
  },
  marvinJanssenParent: {
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  oneFrontViewBlackScreen1Parent: {
    alignItems: 'center',
    width: 350,
  },
  buttonclassic13: {
    height: 48,
    paddingHorizontal: 20,
    alignSelf: 'stretch',
    marginTop: 8,
  },
  forgetWallet: {
    marginLeft: 8,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    textAlign: 'left',
    fontSize: 14,
    lineHeight: 20,
  },
  frameParent13: {
    borderColor: '#4a4a4a',
  },
  frameParent12: {
    marginTop: 8,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  frameParent11: {
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  ryderAppVersion001Parent: {
    marginTop: 12,
    alignItems: 'center',
  },
  detailCards: {
    marginTop: 24,
    alignItems: 'center',
  },
  ryderPopup: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#1e1e1e',
    width: '100%',
    // height: 712,
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
    flex: 1,
    position: 'absolute',
    bottom: '-100%',
    zIndex: 2,
  },
});

export default SetingsPopup;

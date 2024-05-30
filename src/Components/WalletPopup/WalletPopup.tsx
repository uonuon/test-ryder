import * as React from 'react';
import {Animated, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Video from 'react-native-video';
import GenuineAlert from '../GenuineAlert/GenuineAlert';

export type WalletPopupProps = {
  onButtonPress: () => void;
};

const WalletPopup = ({onButtonPress}: WalletPopupProps) => {
  const slideAnimation = React.useRef(new Animated.Value(-100)).current;

  const ryderOneAnimation = require('../../P1Onboarding/Step2/assets/wallet_creation.mp4');
  React.useEffect(() => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [slideAnimation]);
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
          <View style={styles.top}>
            <View style={[styles.frame, styles.footSpaceBlock]}>
              <Text style={[styles.yourWalletIs, styles.yourTypo]}>
                Your wallet is being created
              </Text>
              <Text style={[styles.thisStepWill, styles.thisFlexBox]}>
                This step will take a few moments to complete. You will back up your wallet after it
                is created.
              </Text>
            </View>
          </View>
          <View style={[styles.animation, styles.footSpaceBlock]}>
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
          <View style={[styles.foot, styles.footSpaceBlock]}>
            <GenuineAlert />
            <Pressable onPress={onButtonPress}>
              <View style={[styles.buttonclassic, styles.alertFlexBox]}>
                <View style={styles.textWrapper}>
                  <Text style={[styles.labelText, styles.labelTextLayout]}>Back up now</Text>
                </View>
              </View>
            </Pressable>
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

  backgroundVideo: {
    marginTop: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50%',
    height: 450,
    alignSelf: 'center',
  },
  footSpaceBlock: {
    paddingHorizontal: 20,
    paddingVertical: 0,
  },
  yourTypo: {
    textAlign: 'left',
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  thisFlexBox: {
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    alignSelf: 'stretch',
  },
  alertFlexBox: {
    overflow: 'hidden',
    borderRadius: 8,
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  labelTextLayout: {
    lineHeight: 20,
    letterSpacing: 0,
  },
  yourWalletIs: {
    // paddingTop: 20,
    fontSize: 22,
    lineHeight: 28,
    color: '#fff',
  },
  thisStepWill: {
    color: '#919191',
    marginTop: 12,
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: 14,
  },
  frame: {
    paddingVertical: 0,
    alignSelf: 'stretch',
    paddingHorizontal: 20,
  },
  top: {
    alignItems: 'center',
    width: 390,
  },
  animation: {
    paddingVertical: 0,
    alignItems: 'center',
    width: 390,
  },
  iconWrapper: {
    width: 24,
    height: 24,
  },
  yourRyderOne: {
    fontSize: 14,
    letterSpacing: 0,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    color: '#fff',
  },
  whatDoesThis: {
    fontSize: 12,
    textDecorationLine: 'underline',
    lineHeight: 16,
    marginTop: 4,
    color: '#fff',
  },
  message: {
    marginLeft: 12,
    justifyContent: 'center',
    flex: 0,
  },
  iconWrapperParent: {
    paddingLeft: 8,
    paddingTop: 12,
    paddingBottom: 12,
    flexDirection: 'row',
    flex: 1,
  },
  alert: {
    backgroundColor: '#2b2c60',
    borderStyle: 'solid',
    borderColor: '#3f41ab',
    borderWidth: 1,
    flexDirection: 'row',
  },
  labelText: {
    fontSize: 16,
    color: '#131313',
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  textWrapper: {
    paddingHorizontal: 8,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 0,
    alignItems: 'center',
  },
  buttonclassic: {
    backgroundColor: '#fff',
    height: 48,
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 12,
    paddingVertical: 0,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  foot: {
    paddingVertical: 0,
    width: 390,
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
    flex: 1,
    position: 'absolute',
    bottom: '-100%',
    zIndex: 2,
  },
});

export default WalletPopup;

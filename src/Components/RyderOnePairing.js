import * as React from 'react';
import {Text, StyleSheet, View, Image, ActivityIndicator} from 'react-native';
import {Border, StyleVariable, FontSize, FontFamily, Color, Padding} from '../GlobalStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {useNavigation} from '@react-navigation/native';
import {PairingState} from './NfcAddRyderOne';
import Loader from './Loader';

const RyderOnePairing = ({pairingState}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.walletHome}>
      <View style={[styles.homeIndicators, styles.statusBarsPosition]}>
        <View style={styles.homeIndicator} />
      </View>
      <View style={styles.frameParent}>
        <View style={styles.frameWrapper}>
          <View style={styles.chevronLeftParent}>
            <Icon name="chevron-left" size={22} />

            <Text style={styles.sendToMarvin}>SEND TO MARVIN</Text>
            <View style={[styles.rectangleParent, styles.capIconPosition]}>
              <View style={styles.frameChild} />
              <View style={[styles.frameItem, styles.frameLayout]} />
              <View style={[styles.frameInner, styles.frameLayout]} />
            </View>
          </View>
        </View>
        {pairingState === PairingState.WAITING ? (
          <View style={styles.bringRyderToPhoneParent}>
            <View style={styles.bringRyderToPhone}>
              <View style={styles.companionAppTemplate}>
                <View style={styles.companionAppTemplateChild} />
                <View style={[styles.dynamicIsland1, styles.dynamicFlexBox]} />
              </View>
              <Image
                style={styles.bringRyderToPhoneChild}
                resizeMode="cover"
                source={require('../../assets/frame-26085593.png')}
              />
            </View>
            <Text style={styles.waitingForRyder}>Waiting for Ryder One...</Text>
          </View>
        ) : pairingState === PairingState.PAIRING ? (
          <View style={styles.frameGroupPairing}>
            <Loader />
            <View style={styles.pairingAndBackingUpParent}>
              <Text style={[styles.pairingAndBacking, styles.labelTextTypo]}>
                Pairing and backing up...
              </Text>
              <Text style={styles.dontTurnOff}>Don’t turn off the App</Text>
            </View>
          </View>
        ) : (
          <View style={styles.bubbleParent}>
            <View style={styles.bubble}>
              <Image
                style={styles.checkIcon}
                resizeMode="cover"
                source={require('../../assets/check.png')}
              />
              <Text style={styles.text}>2</Text>
            </View>
            <View style={styles.accountPairedWithRyderOneWrapper}>
              <Text style={styles.accountPairedWith}>Account paired with Ryder One</Text>
            </View>
          </View>
        )}
        <View>
          <View
            style={
              pairingState === PairingState.WAITING
                ? [styles.button, styles.buttonLayout]
                : pairingState === PairingState.PAIRING
                  ? [styles.buttonDisabled, styles.buttonLayout]
                  : [styles.buttonHidden, styles.buttonLayout]
            }>
            <Text
              style={
                pairingState === PairingState.PAIRING
                  ? [styles.labelText, styles.labelTypo]
                  : [styles.labelTextDisabled, styles.labelTypo]
              }>
              See tutorial
            </Text>
          </View>
          <Pressable
            onPress={() => {
              pairingState === PairingState.PAIRED
                ? navigation.navigate('Wallet2')
                : navigation.navigate('Wallet');
            }}>
            <View
              style={
                pairingState === PairingState.WAITING
                  ? [styles.button1, styles.buttonLayout]
                  : pairingState === PairingState.PAIRING
                    ? [styles.button1Disabled, styles.buttonLayout]
                    : [styles.button, styles.buttonLayout]
              }>
              <Text
                style={
                  pairingState === PairingState.WAITING
                    ? [styles.labelText1, styles.labelTypo]
                    : [styles.labelText1Disabled, styles.labelTypo]
                }>
                Back home
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statusBarsPosition: {
    width: 390,
    left: 0,
    position: 'absolute',
  },
  dynamicFlexBox: {
    justifyContent: 'flex-end',
    position: 'absolute',
  },
  capIconPosition: {
    right: 0,
    position: 'absolute',
  },
  frameLayout: {
    marginLeft: 6,
    height: 6,
    borderRadius: Border.br_81xl,
  },
  buttonLayout: {
    justifyContent: 'center',
    paddingVertical: 0,
    paddingHorizontal: StyleVariable.classicButtonsPaddingNoIcon,
    height: 48,
    borderRadius: Border.br_341xl,
    width: '90%',
    alignItems: 'center',
    overflow: 'hidden',
  },
  labelTypo: {
    lineHeight: 20,
    fontSize: FontSize.titleSmall500_size,
    fontFamily: FontFamily.titleMedium500,
    fontWeight: '500',
    letterSpacing: 0,
    textAlign: 'center',
  },
  homeIndicator: {},
  homeIndicators: {},
  sendToMarvin: {
    marginLeft: -53,
    top: 8,
    fontSize: 12,
    lineHeight: 24,
    fontFamily: FontFamily.poppinsSemiBold,
    textAlign: 'left',
    color: Color.neutral13,
    letterSpacing: 0,
    fontWeight: '600',
    left: '50%',
    position: 'absolute',
  },
  frameChild: {
    height: 6,
    width: 6,
    backgroundColor: Color.neutralSolid6,
    borderRadius: Border.br_81xl,
  },
  frameItem: {
    backgroundColor: Color.singaporeSolid9,
    width: 20,
  },
  frameInner: {
    width: 6,
    backgroundColor: Color.neutralSolid6,
    marginLeft: 6,
  },
  rectangleParent: {
    marginTop: -3,
    top: '50%',
    flexDirection: 'row',
  },
  chevronLeftParent: {
    height: 24,
    width: 350,
  },
  frameWrapper: {
    opacity: 0,
    alignItems: 'center',
  },
  companionAppTemplateChild: {
    left: 5,
    borderRadius: 5,
    width: 66,
    height: 132,
    backgroundColor: Color.blackOverride,
    top: 5,
    position: 'absolute',
    overflow: 'hidden',
  },
  dynamicIsland1: {
    top: 9,
    left: 26,
    borderRadius: 7,
    backgroundColor: Color.neutral7,
    width: 24,
  },
  companionAppTemplate: {
    top: 73,
    left: 132,
    borderRadius: 9,
    backgroundColor: Color.neutral5,
    borderColor: Color.neutral12,
    borderWidth: 4.7,
    width: 85,
    height: 151,
    position: 'absolute',
    borderStyle: 'solid',
  },
  bringRyderToPhoneChild: {
    top: 43,
    left: 147,
    width: 57,
    height: 69,
    position: 'absolute',
  },
  bringRyderToPhone: {
    height: 225,
    width: 350,
  },
  waitingForRyder: {
    fontSize: FontSize.titleMedium500_size,
    lineHeight: 22,
    width: '100%',
    marginTop: 20,
    fontFamily: FontFamily.titleMedium500,
    fontWeight: '500',
    color: Color.neutral13,
    letterSpacing: 0,
    textAlign: 'center',
  },
  bringRyderToPhoneParent: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  labelText: {
    color: Color.whiteOverride,
  },
  labelTextDisabled: {
    color: Color.neutralSolid6,
  },
  button: {
    backgroundColor: Color.blackOverride,
  },
  buttonDisabled: {
    backgroundColor: Color.neutralSolid3,
  },
  buttonHidden: {
    backgroundColor: Color.neutralSolid3,
    opacity: 0,
  },
  labelText1: {
    color: Color.neutral13,
  },
  labelText1Disabled: {
    color: Color.neutralSolid6,
  },
  button1: {
    borderColor: Color.neutralSolid7,
    marginTop: 20,
    borderWidth: 1,
    borderStyle: 'solid',
  },
  button1Disabled: {
    borderColor: Color.neutralSolid6,
    marginTop: 20,
    borderWidth: 1,
    borderStyle: 'solid',
  },
  frameParent: {
    height: '90%',
    justifyContent: 'space-between',
    position: 'absolute',
  },
  walletHome: {
    width: '100%',
    height: '100%',
  },
  //
  // Pairing
  //
  frameGroupPairing: {
    alignItems: 'center',
  },

  pairingAndBackingUpParent: {
    marginTop: 20,
    width: 350,
    alignItems: 'center',
  },
  pairingAndBacking: {
    fontSize: FontSize.titleMedium500_size,
    lineHeight: 22,
    width: 324,
    color: Color.neutral13,
  },
  dontTurnOff: {
    lineHeight: 16,
    fontFamily: FontFamily.bodySmall400,
    width: 234,
    marginTop: 20,
    fontSize: FontSize.bodySmall400_size,
    textAlign: 'center',
    color: Color.neutralSolid12,
  },
  labelTextTypo: {
    fontFamily: FontFamily.titleMedium500,
    fontWeight: '500',
    letterSpacing: 0,
    textAlign: 'center',
  },

  //
  // Paired
  //
  checkIcon: {
    width: 67,
    height: 67,
    overflow: 'hidden',
  },
  text: {
    fontSize: 57,
    lineHeight: 54,
    color: Color.successSolid5,
    display: 'none',
    marginTop: 35.83,
    fontFamily: FontFamily.poppinsSemiBold,
    letterSpacing: 0,
    textAlign: 'center',
    fontWeight: '600',
  },
  bubble: {
    borderRadius: 108,
    backgroundColor: Color.successSolid12,
    width: 86,
    height: 86,
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountPairedWith: {
    fontSize: FontSize.titleMedium500_size,
    lineHeight: 22,
    width: 324,
    fontFamily: FontFamily.titleMedium500,
    fontWeight: '500',
    color: Color.neutral13,
    letterSpacing: 0,
    textAlign: 'center',
  },
  accountPairedWithRyderOneWrapper: {
    marginTop: 20,
    width: 350,
    alignItems: 'center',
  },
  bubbleParent: {
    alignItems: 'center',
  },
});

export default RyderOnePairing;

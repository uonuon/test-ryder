import React, {useState, useRef, useEffect} from 'react';
import {Text, StyleSheet, View, Image, TextInput, Pressable} from 'react-native';
import {Color, Border, FontFamily, FontSize, Padding, StyleVariable} from '../GlobalStyles';
import {useNavigation} from '@react-navigation/native';
import {useStacks} from '../Utils/stacksContext';
import {USDollar, btcToUSD} from '../Utils/currencies';
import AppHeader from '../Components/AppHeader';

const EMPTY_AMOUNT = '= $--.-- (USD)';
const SendToken = () => {
  const navigation = useNavigation();
  const inputReference = useRef<TextInput | null>(null);

  const {currentAccount, updateAccount} = useStacks();
  const [amountInUSD, setAmountInUSD] = useState(EMPTY_AMOUNT);
  const updateAmountInUSD = (amountBTC) => {
    setAmountInUSD(
      isNaN(amountBTC) ? EMPTY_AMOUNT : `≈ $${USDollar.format(amountBTC * btcToUSD)} (USD)`,
    );
  };

  useEffect(() => {
    if (inputReference?.current) {
      inputReference?.current.focus();
    }
  }, []);

  return (
    <View style={styles.walletHome}>
      <View style={styles.frameParent}>
        <AppHeader title="SEND" showSteps step={1} />
        <View style={[styles.buttonParent, styles.parentFlexBox]}>
          <View style={[styles.button, styles.buttonFlexBox]}>
            <Text style={[styles.labelText, styles.btcTypo1]}>Tokens</Text>
          </View>
          <View style={[styles.button1, styles.buttonFlexBox]}>
            <Text style={[styles.labelText1, styles.btcTypo1]}>Collectibles</Text>
          </View>
        </View>
        <View style={[styles.inputsParent, styles.buttonFlexBox]}>
          <Pressable
            onPress={() => {
              navigation.navigate('SelectToken');
            }}>
            <View style={styles.inputsSpaceBlock}>
              <View style={styles.frameGroup}>
                <Image
                  style={styles.frameIcon}
                  resizeMode="cover"
                  source={require('../../assets/btc-icon.png')}
                />
                <Text style={[styles.btc, styles.btcTypo]}>BTC</Text>
              </View>
              <View style={styles.iconwrapper}>
                <Image
                  style={styles.icon}
                  resizeMode="cover"
                  source={require('../../assets/icon.png')}
                />
              </View>
            </View>
          </Pressable>
          <View style={[styles.component22, styles.buttonFlexBox]}>
            <View style={styles.inputsSpaceBlock}>
              <TextInput
                style={[styles.btc1, styles.btcTypo]}
                keyboardType="decimal-pad"
                autoFocus={true}
                ref={inputReference}
                onChangeText={(text) => {
                  const amountBTC = parseFloat(text);
                  updateAmountInUSD(amountBTC);
                  updateAccount({txAmount: amountBTC});
                }}
                placeholder=""></TextInput>
              <Text style={[styles.max, styles.maxLayout]}>MAX</Text>
              <View style={styles.amountWrapper}>
                <Text style={[styles.amount, styles.btcTypo1]}>Amount</Text>
              </View>
            </View>
            <Text style={[styles.usd, styles.maxLayout]}>{amountInUSD}</Text>
          </View>
          <View style={styles.frameWrapper}>
            <View style={[styles.feesParent, styles.parentFlexBox]}>
              <Text style={[styles.fees, styles.btcTypo]}>Fees</Text>
              <View style={styles.iconwrapper}>
                <Image
                  style={styles.icon}
                  resizeMode="cover"
                  source={require('../../assets/chevronright.png')}
                />
              </View>
            </View>
          </View>
        </View>
        <Pressable
          onPress={() => {
            navigation.navigate('SelectRecipient');
          }}>
          <View style={[styles.button2, styles.button2Layout]}>
            <Text style={[styles.labelText, styles.btcTypo1]}>Continue</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentFlexBox: {
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  buttonFlexBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btcTypo1: {
    fontFamily: FontFamily.bodyLarge500,
    fontWeight: '500',
  },
  btcTypo: {
    fontSize: FontSize.bodyLarge500_size,
    textAlign: 'left',
  },
  maxLayout: {
    lineHeight: 16,
    textAlign: 'left',
  },
  labelText: {
    color: Color.whiteOverride,
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: FontSize.titleSmall500_size,
    fontWeight: '500',
    textAlign: 'center',
  },
  button: {
    backgroundColor: Color.blackOverride,
    paddingVertical: 0,
    paddingHorizontal: StyleVariable.classicButtonsPaddingNoIcon,
    justifyContent: 'center',
    borderRadius: Border.br_341xl,
    overflow: 'hidden',
    height: 40,
    flex: 1,
  },
  labelText1: {
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: FontSize.titleSmall500_size,
    fontWeight: '500',
    textAlign: 'center',
    color: Color.neutral13,
  },
  button1: {
    paddingVertical: 0,
    paddingHorizontal: StyleVariable.classicButtonsPaddingNoIcon,
    justifyContent: 'center',
    borderRadius: Border.br_341xl,
    overflow: 'hidden',
    height: 40,
    flex: 1,
  },
  buttonParent: {
    backgroundColor: '#f0f0f0',
    padding: Padding.p_5xs,
    marginTop: 20,
    borderRadius: Border.br_341xl,
    justifyContent: 'space-between',
  },
  frameIcon: {
    borderRadius: 43,
    width: 28,
    height: 28,
    overflow: 'hidden',
  },
  btc: {
    marginLeft: 8,
    letterSpacing: 1,
    fontFamily: FontFamily.bodyLarge500,
    fontWeight: '500',
    lineHeight: 24,
    fontSize: FontSize.bodyLarge500_size,
    color: Color.neutralSolid12,
  },
  frameGroup: {
    width: 182,
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    height: 24,
    width: 24,
    overflow: 'hidden',
  },
  iconwrapper: {
    flexDirection: 'row',
  },
  inputsSpaceBlock: {
    paddingRight: Padding.p_5xs,
    paddingLeft: Padding.p_xl,
    height: 44,
    borderRadius: Border.br_xs,
    justifyContent: 'space-between',
    width: 350,
    alignItems: 'center',
    borderWidth: 1,
    flexDirection: 'row',
    borderColor: Color.neutralSolid6,
    borderStyle: 'solid',
  },
  btc1: {
    zIndex: 0,
    letterSpacing: 1,
    fontFamily: FontFamily.bodyLarge500,
    fontWeight: '500',
    lineHeight: 24,
    width: '90%',
    fontSize: FontSize.bodyLarge500_size,
  },
  max: {
    fontSize: 9,
    fontWeight: '700',
    fontFamily: FontFamily.poppinsBold,
    zIndex: 1,
    letterSpacing: 1,
    color: Color.neutral13,
  },
  amount: {
    fontSize: 10,
    letterSpacing: 1,
    textAlign: 'left',
    lineHeight: 24,
    color: Color.neutralSolid12,
  },
  amountWrapper: {
    top: -12,
    left: 12,
    paddingHorizontal: Padding.p_5xs,
    zIndex: 2,
    paddingVertical: 0,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: Color.whiteOverride,
  },
  usd: {
    fontFamily: FontFamily.bodySmall400,
    marginTop: 8,
    fontSize: FontSize.bodySmall400_size,
    lineHeight: 16,
    color: Color.neutralSolid12,
  },
  component22: {
    marginTop: 20,
  },
  fees: {
    lineHeight: 20,
    letterSpacing: 0,
    color: Color.neutral13,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
  },
  feesParent: {
    height: 24,
    alignItems: 'center',
  },
  frameWrapper: {
    marginTop: 20,
    alignSelf: 'stretch',
    overflow: 'hidden',
  },
  inputsParent: {
    marginTop: 20,
    width: 350,
  },
  frameParent: {
    top: 5,
    left: 20,
    alignItems: 'center',
    position: 'absolute',
  },
  button2Layout: {
    width: 350,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button2: {
    justifyContent: 'center',
    paddingVertical: 0,
    paddingHorizontal: StyleVariable.classicButtonsPaddingNoIcon,
    height: 48,
    borderRadius: Border.br_341xl,
    width: '90%',
    alignItems: 'center',
    overflow: 'hidden',
    marginTop: 48,
    backgroundColor: Color.singaporeSolid9,
  },
  walletHome: {
    width: '100%',
    height: 850,
    overflow: 'hidden',
    flex: 1,
    backgroundColor: Color.whiteOverride,
  },
});

export default SendToken;

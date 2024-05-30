import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {Animated, Easing, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import AppHeader from '../Components/AppHeader';
import Loader from '../Components/Loader';
import TransactionCard from '../Components/TransactionCard';
import {Border, Color, FontFamily, FontSize, Padding, StyleVariable} from '../GlobalStyles';
import {USDollar, btcToUSD} from '../Utils/currencies';
import {useStacks} from '../Utils/stacksContext';
import {TransactionState} from '../Utils/transactions';

const TransactionPrepare = () => {
  const {currentAccount, setCurrentAccount} = useStacks();
  const txCardPositionY = useRef(new Animated.Value(0)).current;
  const txCardPosition2Y = useRef(new Animated.Value(-250)).current;
  const navigator = useNavigation();
  const btcAmount = currentAccount?.txAmount ? currentAccount.txAmount.toString() : '--.--';
  const usdAmount = currentAccount?.txAmount
    ? USDollar.format(currentAccount.txAmount * btcToUSD)
    : '--.--';
  console.log(currentAccount, new Date());

  const updateTotalBalanceFromTx = () => {
    setCurrentAccount({
      ...currentAccount,
      totalUSD: currentAccount.totalUSD - currentAccount.txAmount * btcToUSD,
    });
  };
  const startAnimationOut = () => {
    Animated.timing(txCardPositionY, {
      toValue: -250,
      duration: 2000,
      easing: Easing.back(1),
      useNativeDriver: false,
    }).start();
  };
  const startAnimationIn = () => {
    Animated.timing(txCardPosition2Y, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if (currentAccount.txState === TransactionState.CONFIRMED) {
      startAnimationIn();
    }
  }, [currentAccount.txState]);

  return (
    <View style={styles.walletHome}>
      <View style={styles.frameParent}>
        <AppHeader title={'Transaction Summary'} showSteps step={3} />
        {(currentAccount.txState === TransactionState.SENDING ||
          currentAccount.txState === TransactionState.RECEIVING) && (
          <Animated.View
            style={[
              styles.component36,
              styles.frameIconPosition,
              {
                top: txCardPositionY,
              },
            ]}>
            <View style={styles.rectangleGroup}>
              <View style={styles.rectangleView} />
              <Image
                style={[styles.frameIcon, styles.frameIconPosition]}
                resizeMode="cover"
                source={require('../../assets/frame-26085557.png')}
              />
              <View style={[styles.frameGroup, styles.framePosition]}>
                <View style={[styles.frameContainer, styles.usdWrapperFlexBox]}>
                  <View style={styles.frameFlexBox}>
                    <View style={styles.protocolIconParent}>
                      <Image
                        style={styles.frameChild1Layout}
                        resizeMode="cover"
                        source={require('../../assets/protocol-icon.png')}
                      />
                      <Text style={[styles.btc, styles.toLayout]}>{btcAmount} BTC</Text>
                    </View>
                    <View style={styles.usdWrapperFlexBox}>
                      <Text style={[styles.usd, styles.usdTypo]}>≈ ${usdAmount} (USD)</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.toParent}>
                  <Text style={[styles.to, styles.toLayout]}>To</Text>
                  <View style={styles.iconwrapper}>
                    <Image
                      style={styles.arrowNarrowDownIcon}
                      resizeMode="cover"
                      source={require('../../assets/arrow-narrow-down.png')}
                    />
                  </View>
                </View>
                <View style={[styles.frameParent1, styles.frameFlexBox]}>
                  <View style={styles.protocolIconParent}>
                    <Image
                      style={[styles.frameChild1, styles.frameChild1Layout]}
                      resizeMode="cover"
                      source={require('../../assets/frame-81.png')}
                    />
                    <Text style={[styles.btc, styles.toLayout]}>Satoshi N.</Text>
                  </View>
                  <Text style={[styles.usd, styles.usdTypo]}>BC1...ZEJ</Text>
                </View>
              </View>
            </View>
          </Animated.View>
        )}
        {currentAccount.txState === TransactionState.CONFIRMED && (
          <Animated.View
            style={[
              styles.component36,
              styles.frameIconPosition,
              {
                top: txCardPosition2Y,
              },
            ]}>
            <TransactionCard />
          </Animated.View>
        )}
        <View style={[styles.frameParent3, styles.framePosition]}>
          <Pressable
            onPress={() => {
              console.log(currentAccount.txState);
              if (currentAccount.txState === TransactionState.SENDING) {
                startAnimationOut();
                setCurrentAccount({...currentAccount, txState: TransactionState.RECEIVING});
              } else if (currentAccount.txState === TransactionState.RECEIVING) {
                setCurrentAccount({...currentAccount, txState: TransactionState.CONFIRMED});
              }
            }}>
            <View
              style={[
                currentAccount.txState === TransactionState.CONFIRMED && {
                  opacity: 0,
                },
              ]}>
              <Loader />
            </View>
          </Pressable>
          <View style={styles.waitingConfirmationFromRydeParent}>
            <Text style={[styles.waitingConfirmationFrom, styles.btcTypo]}>
              {currentAccount.txState === TransactionState.SENDING ? (
                <>Waiting confirmation from Ryder One...</>
              ) : currentAccount.txState === TransactionState.RECEIVING ? (
                <>Approve transaction on Ryder One</>
              ) : (
                <>Transaction sent!</>
              )}
            </Text>
            <Text style={[styles.forSecurityReasons, styles.usdTypo]}>
              {currentAccount.txState === TransactionState.SENDING ||
              currentAccount.txState === TransactionState.RECEIVING ? (
                <>For security reasons, you must approve the transaction using your Ryder One.</>
              ) : (
                <>Remember that a transaction may take more or less time to reach its receiver.</>
              )}
            </Text>
          </View>
          <Pressable
            style={{
              opacity: currentAccount.txState === TransactionState.CONFIRMED ? 1 : 0,
            }}
            onPress={() => {
              updateTotalBalanceFromTx();
              navigator.navigate('Wallet2');
            }}>
            <View style={[styles.button, styles.buttonLayout]}>
              <Text style={[styles.labelText1, styles.labelTypo]}>Back home</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frameIconPosition: {
    zIndex: 1,
    position: 'absolute',
  },
  framePosition: {
    zIndex: 2,
    alignItems: 'center',
  },
  usdWrapperFlexBox: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  toLayout: {
    lineHeight: 15,
    letterSpacing: 0,
  },
  usdTypo: {
    fontFamily: FontFamily.bodySmall400,
    fontSize: FontSize.bodySmall400_size,
    textAlign: 'center',
    color: Color.neutralSolid12,
  },
  frameFlexBox: {
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
  },
  frameChild1Layout: {
    height: 28,
    width: 28,
  },
  btcTypo: {
    fontSize: FontSize.titleMedium500_size,
    textAlign: 'center',
  },
  frameChild: {
    height: 6,
    width: 6,
    backgroundColor: Color.neutralSolid6,
    borderRadius: Border.br_81xl,
  },
  rectangleView: {
    bottom: 0,
    height: 75,
    backgroundColor: Color.colorSilver,
    width: 304,
    zIndex: 0,
    left: 0,
    position: 'absolute',
  },
  frameIcon: {
    marginTop: -100,
    width: 300,
    height: 200,
    display: 'none',
    opacity: 0.2,
    top: '50%',
    left: 0,
  },
  btc: {
    marginLeft: 8,
    fontSize: FontSize.titleMedium500_size,
    textAlign: 'center',
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
    color: Color.neutralSolid12,
    lineHeight: 15,
  },
  protocolIconParent: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  usd: {
    lineHeight: 15,
    letterSpacing: 0,
  },
  frameContainer: {
    alignSelf: 'stretch',
    alignItems: 'flex-end',
  },
  to: {
    fontSize: 10,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
    textAlign: 'center',
    color: Color.neutralSolid12,
  },
  arrowNarrowDownIcon: {
    width: 16,
    height: 16,
    overflow: 'hidden',
  },
  iconwrapper: {
    marginLeft: 4,
    flexDirection: 'row',
  },
  toParent: {
    borderColor: Color.colorWhitesmoke,
    borderWidth: 4,
    height: 31,
    paddingLeft: Padding.p_xs,
    paddingTop: Padding.p_9xs,
    paddingRight: 8,
    paddingBottom: Padding.p_9xs,
    marginTop: 20,
    borderRadius: Border.br_341xl,
    justifyContent: 'center',
    backgroundColor: Color.colorSilver,
    alignItems: 'center',
    flexDirection: 'row',
    borderStyle: 'solid',
  },
  frameChild1: {
    borderRadius: Border.br_341xl,
    overflow: 'hidden',
  },
  frameParent1: {
    marginTop: 20,
  },
  frameGroup: {
    marginLeft: 16,
    justifyContent: 'center',
    flex: 1,
  },
  rectangleGroup: {
    bottom: 20,
    borderRadius: 16,
    backgroundColor: Color.colorWhitesmoke,
    height: 150,
    padding: 20,
    width: 304,
    flexDirection: 'row',
    left: 0,
    position: 'absolute',
    overflow: 'hidden',
  },
  component36: {
    left: 23,
    height: 244,
    width: 304,
    top: 0,
    marginTop: 20,
    overflow: 'hidden',
  },
  frameChild2: {
    width: 52,
    height: 52,
    marginLeft: 65,
    marginRight: 65,
    marginTop: 35,
    marginBottom: 35,
    overflow: 'hidden',
  },
  waitingConfirmationFrom: {
    lineHeight: 22,
    fontWeight: '500',
    fontFamily: FontFamily.titleMedium500,
    width: 324,
    color: Color.neutral13,
    letterSpacing: 0,
  },
  forSecurityReasons: {
    lineHeight: 16,
    width: 272,
    marginTop: 20,
  },
  waitingConfirmationFromRydeParent: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  frameParent3: {
    marginTop: -108.5,
    marginLeft: -175,
    top: '50%',
    left: '50%',
    position: 'absolute',
  },
  frameParent: {
    top: 5,
    left: 20,
    height: 750,
    alignItems: 'center',
    position: 'absolute',
  },
  walletHome: {
    width: '100%',
    height: 850,
    overflow: 'hidden',
    flex: 1,
    borderStyle: 'solid',
    backgroundColor: Color.whiteOverride,
  },

  // Button
  labelText1: {
    color: Color.whiteOverride,
  },
  buttonLayout: {
    marginTop: 129,
    justifyContent: 'center',
    paddingVertical: 0,
    paddingHorizontal: StyleVariable.classicButtonsPaddingNoIcon,
    height: 48,
    borderRadius: Border.br_341xl,
    width: 350,
    alignItems: 'stretch',
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
  button: {
    backgroundColor: Color.blackOverride,
  },
});

export default TransactionPrepare;

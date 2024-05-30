import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useState } from 'react';
import { Text, StyleSheet, View, Image, Pressable, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { assets } from '../../../../lib/tokens/tokens';
import { useStacks } from '../../../Utils/stacksContext';
import Recipient from '../../../Components/send-asset/Recipient/Recipient';

const FinalReviewTxSent = ({ route }) => {
  const { navigate, goBack } = useNavigation();
  const { asset, amount, recipient, feeAmount, txid, error, reason } = route.params;
  // const [txid, setTxid] = useState<string>('');
  const { network } = useStacks();
  const slideAnimation = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(slideAnimation, {
      toValue: 100,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, [slideAnimation]);
  return (
    <SafeAreaView style={[styles.send, styles.sendLayout]}>
      <View style={[styles.frameParent, styles.parentPosition]}>
        <Animated.View
          style={[
            styles.transactionCardAnimationSquWrapper,
            styles.wrapperSpaceBlock,
            {
              top: slideAnimation.interpolate({
                inputRange: [0, 50, 100],
                outputRange: [-288, 48, 48],
              }),
            },
          ]}>
          <View style={[styles.transactionCardAnimationSqu, styles.borderBorder]}>
            <View style={styles.transactionCardAnimationSquInner}>
              <View style={styles.frameGroup}>
                <View style={[styles.frameContainer, styles.rightFlexBox]}>
                  <View>
                    <Text style={[styles.sent, styles.sentLayout]}>Sent</Text>
                    <Text style={[styles.stx, styles.stxTypo]}>
                      {amount + feeAmount} {assets[asset].symbol}
                    </Text>
                  </View>
                  <Image
                    style={styles.tokensFinalIcon}
                    resizeMode="cover"
                    source={require('../assets/tokens-final.png')}
                  />
                </View>
                <View style={styles.frameWrapper}>
                  <View>
                    <Text style={[styles.sent, styles.sentLayout]}>To</Text>
                    <Recipient recipient={recipient} />
                  </View>
                </View>
              </View>
            </View>
            <Image
              style={[styles.transactionCardAnimationSquChild, styles.frameViewSpaceBlock]}
              resizeMode="cover"
              source={require('../assets/vector-153.png')}
            />
            <View style={[styles.frameView, styles.frameViewSpaceBlock]}>
              <View style={styles.frameWrapper1}>
                <View>
                  <Text style={[styles.sent, styles.sentLayout]}>Total with fee</Text>
                  <View style={styles.tokensParent}>
                    <Text style={[styles.stx1, styles.stxTypo]}>
                      {amount + feeAmount} {assets[asset].symbol}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Animated.View>
        <View style={[styles.statusBarsParent, styles.parentPosition]}>
          <View style={[styles.iconWrapperParent, styles.rightFlexBox]}>
            <Text style={[styles.settings, styles.stxTypo]}>Final review</Text>
          </View>
        </View>
      </View>
      <Text style={[styles.transactionSent, styles.stxTypo]}>Transaction sent!</Text>
      {error &&
        <Text style={[styles.transactionSent2, styles.stxTypo]}>{error} - {reason}</Text>
      }
      <View style={[styles.sendInner, styles.sendInnerPosition]}>
        <View style={styles.buttonclassicParent}>
          <Pressable
            style={[styles.buttonclassic, styles.buttonclassicFlexBox]}
            onPress={() => {
              navigate('TransactionDetails', {
                txid,
                amount,
                feeAmount,
                recipient,
                asset,
                network: network.isMainnet() ? 'mainnet' : 'testnet',
              });
            }}>
            <View style={styles.textWrapper}>
              <Text style={[styles.labelText, styles.stxTypo]}>See details</Text>
            </View>
          </Pressable>
          <Pressable
            style={[styles.buttonclassic1, styles.buttonclassicFlexBox]}
            onPress={() => {
              navigate('WalletRyder', {});
            }}>
            <View style={styles.textWrapper}>
              <Text style={[styles.labelText1, styles.stxTypo]}>Close</Text>
            </View>
          </Pressable>
        </View>
      </View>
      <Image
        style={styles.secAnimationCopy}
        resizeMode="cover"
        source={require('../assets/3sec-animation--copy.png')}
      />
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  sendLayout: {
    width: '100%',
    overflow: 'hidden',
  },
  parentPosition: {
    left: 0,
    position: 'absolute',
  },
  wrapperSpaceBlock: {
    paddingVertical: 0,
    alignItems: 'center',
  },
  borderBorder: {
    borderWidth: 1,
    borderStyle: 'solid',
  },
  rightFlexBox: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  sentLayout: {
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: 14,
  },
  stxTypo: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  iconLayout: {
    height: 20,
    width: 20,
  },
  frameViewSpaceBlock: {
    marginTop: -1,
    alignSelf: 'stretch',
  },
  dynamicIslandLayout: {
    height: 37,
    position: 'absolute',
  },
  rightPosition: {
    top: 13,
    position: 'absolute',
  },
  borderPosition: {
    opacity: 0.3,
    position: 'absolute',
  },
  sendInnerPosition: {
    paddingHorizontal: 24,
    width: 390,
    left: 0,
    position: 'absolute',
  },
  buttonclassicFlexBox: {
    paddingHorizontal: 20,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'stretch',
    paddingVertical: 0,
    alignItems: 'center',
    overflow: 'hidden',
  },
  sent: {
    fontFamily: 'Poppins-Regular',
    color: '#d1d8ff',
    textAlign: 'left',
  },
  stx: {
    color: '#fff',
    lineHeight: 22,
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
    letterSpacing: 0,
  },
  tokensFinalIcon: {
    borderRadius: 1249,
    width: 40,
    height: 40,
    overflow: 'hidden',
  },
  frameContainer: {
    alignSelf: 'stretch',
  },
  tokensIcon: {
    borderRadius: 624,
    overflow: 'hidden',
  },
  julienNre: {
    marginLeft: 4,
    color: '#fff',
    lineHeight: 22,
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
    letterSpacing: 0,
  },
  tokensParent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  frameWrapper: {
    marginTop: 4,
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  frameGroup: {
    alignSelf: 'stretch',
  },
  transactionCardAnimationSquInner: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 12,
    alignSelf: 'stretch',
  },
  transactionCardAnimationSquChild: {
    maxWidth: '100%',
    maxHeight: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  stx1: {
    fontSize: 22,
    lineHeight: 28,
    color: '#fff',
    textAlign: 'center',
  },
  frameWrapper1: {
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  frameView: {
    borderBottomRightRadius: 28,
    borderBottomLeftRadius: 28,
    justifyContent: 'flex-end',
    padding: 12,
  },
  transactionCardAnimationSqu: {
    borderRadius: 28,
    backgroundColor: '#7b61ff',
    shadowColor: 'rgba(0, 0, 0, 0)',
    shadowOffset: {
      width: 0,
      height: 71,
    },
    shadowRadius: 20,
    elevation: 20,
    shadowOpacity: 1,
    borderColor: '#bfc0fc',
    alignSelf: 'stretch',
    alignItems: 'center',
    overflow: 'hidden',
  },
  transactionCardAnimationSquWrapper: {
    top: 104,
    paddingHorizontal: 24,
    width: '100%',
    left: 0,
    zIndex: 1,
    position: 'absolute',
  },
  time: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'SF Pro',
    color: '#fff',
    textAlign: 'center',
  },
  timeStyle: {
    top: 10,
    width: 33,
    alignItems: 'center',
    left: 0,
    position: 'absolute',
  },
  lensIcon: {
    left: 101,
    width: 11,
    zIndex: 0,
    height: 11,
  },
  dynamicIsland: {
    left: 114,
    borderRadius: 37,
    backgroundColor: '#000',
    width: 124,
    paddingTop: 13,
    paddingRight: 12,
    paddingBottom: 13,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    top: 0,
  },
  cellularConnectionIcon: {
    width: 17,
    height: 11,
  },
  wifiIcon: {
    width: 15,
    height: 11,
  },
  border: {
    right: 2,
    borderRadius: 3,
    borderColor: '#fff',
    width: 22,
    height: 11,
    borderWidth: 1,
    borderStyle: 'solid',
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
    height: 11,
  },
  right: {
    left: 279,
    width: 71,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeStyleParent: {
    top: 11,
    left: 20,
    width: 350,
  },
  statusBars: {
    height: 60,
    width: 390,
  },
  iconWrapper: {
    height: 24,
    display: 'none',
    width: 24,
  },
  settings: {
    textAlign: 'left',
    color: '#fff',
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: 14,
  },
  iconWrapperParent: {
    paddingHorizontal: 12,
    alignSelf: 'stretch',
    paddingVertical: 0,
    alignItems: 'center',
  },
  statusBarsParent: {
    alignItems: 'center',
    width: 390,
    top: 0,
    backgroundColor: '#131313',
  },
  frameParent: {
    height: 288,
    width: '100%',
    top: 0,
  },
  transactionSent: {
    top: 567,
    left: 0,
    right: 0,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: 14,
    position: 'absolute',
  },
  transactionSent2: {
    top: 597,
    left: 0,
    right: 0,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: 14,
    position: 'absolute',
  },
  labelText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 20,
    letterSpacing: 0,
  },
  textWrapper: {
    paddingHorizontal: 8,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 0,
    alignItems: 'center',
  },
  iconWrapper2: {
    display: 'none',
  },
  buttonclassic: {
    backgroundColor: '#2b2b2b',
    borderColor: '#4a4a4a',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  labelText1: {
    color: '#131313',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 20,
    letterSpacing: 0,
  },
  buttonclassic1: {
    marginTop: 10,
    backgroundColor: '#fff',
  },
  buttonclassicParent: {
    justifyContent: 'flex-end',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  sendInner: {
    top: 714,
    paddingBottom: 24,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  secAnimationCopy: {
    marginTop: -29,
    marginLeft: -29,
    top: '50%',
    left: '50%',
    width: 58,
    height: 58,
    position: 'absolute',
    overflow: 'hidden',
  },
  send: {
    flex: 1,
    height: 844,
    overflow: 'hidden',
    backgroundColor: '#131313',
  },
});

export default FinalReviewTxSent;

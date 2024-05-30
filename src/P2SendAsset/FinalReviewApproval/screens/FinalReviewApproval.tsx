import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Alert, Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { broadcastWithSignature } from '../../../../lib/nfc-protocol/stacks-network';
import { getSignature } from '../../../../lib/nfc-protocol/stacks-nfc-protocol';
import { assets } from '../../../../lib/tokens/tokens';
import ScreenHeader from '../../../Components/send-asset/ScreenHeader/ScreenHeader';
import { useStacks } from '../../../Utils/stacksContext';
import Recipient from '../../../Components/send-asset/Recipient/Recipient';

const FinalReviewApproval = ({ route }) => {
  const { navigate, goBack } = useNavigation();
  const { asset, amount, recipient, feeAmount, unsignedTx } = route.params;
  const { network } = useStacks();
  const receiveSignedTransaction = async () => {
    // TODO: nfc protocol: "request signed stx transaction"
    const signatureBytes = await getSignature();
    const result = await broadcastWithSignature(unsignedTx, signatureBytes, network);
    console.log("tx broadcast result", result);
    if (result?.txid) {
      navigate('FinalReviewTxSent', { asset, recipient, amount, feeAmount, txid: result.txid, error: result.error, reason: result.reason });
    } else {
      Alert.alert('NFC Error', 'failed to broadcast transaction');
    }
  };
  const slideAnimation = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(slideAnimation, {
      toValue: 100,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, [slideAnimation]);
  return (
    <LinearGradient
      style={[styles.send, styles.sendLayout]}
      locations={[0.57, 1]}
      colors={['#131313', '#4a4a4a']}
      useAngle={true}
      angle={180}>
      <SafeAreaView>
        <Animated.View
          style={[
            styles.frameParent,
            styles.parentPosition,
            {
              top: slideAnimation.interpolate({
                inputRange: [0, 50, 100],
                outputRange: [0, 0, -288],
              }),
            },
          ]}>
          <View style={[styles.transactionCardAnimationSquWrapper, styles.wrapperSpaceBlock]}>
            <View style={[styles.transactionCardAnimationSqu, styles.borderBorder]}>
              <View style={styles.transactionCardAnimationSquInner}>
                <View style={styles.frameGroup}>
                  <View style={[styles.frameContainer, styles.rightFlexBox]}>
                    <View>
                      <Text style={[styles.sending, styles.sendingTypo]}>Sending</Text>
                      <Text style={[styles.stx, styles.stxTypo]}>
                        {amount} {assets[asset].symbol}
                      </Text>
                    </View>
                    <Image
                      style={styles.tokensIcon}
                      resizeMode="cover"
                      source={assets[asset].source}
                    />
                  </View>
                  <View style={styles.frameWrapper}>
                    <View>
                      <Text style={[styles.sending, styles.sendingTypo]}>To</Text>
                      <Recipient recipient={recipient} />
                    </View>
                  </View>
                </View>
              </View>
              <View style={[styles.separator, styles.frameViewSpaceBlock]} />
              <View style={[styles.frameView, styles.frameViewSpaceBlock]}>
                <View style={styles.frameWrapper1}>
                  <View>
                    <Text style={[styles.sending, styles.sendingTypo]}>Total with fee</Text>
                    <View style={styles.tokensParent}>
                      <Text style={[styles.stx1, styles.stxTypo]}>
                        {amount + feeAmount} {assets[asset].symbol}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Animated.View>
        <ScreenHeader title={'Final Review'} />
        <Text style={[styles.approveOnRyder, styles.stxTypo]}>Approve on Ryder One...</Text>
        <Image
          style={[styles.loadingLightIcon, styles.buttonclassic2Position]}
          resizeMode="cover"
          source={require('../assets/loading-light.png')}
        />
        <View style={[styles.buttonParent]}>
          <Pressable
            style={[styles.buttonclassic2, styles.buttonclassic2Position]}
            onPress={receiveSignedTransaction}>
            <View style={[styles.textWrapper, styles.textWrapperFlexBox]}>
              <Text style={[styles.labelText1, styles.stxTypo]}>Ready to scan</Text>
            </View>
          </Pressable>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  sendLayout: {
    width: '100%',
    overflow: 'hidden',
  },
  parentPosition: {
    left: 0,
    bottom: '-100%',
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
  sendingTypo: {
    color: '#b3b3b3',
    fontFamily: 'Poppins-Regular',
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
  youWillBeAskedToScanYourParentPosition: {
    paddingHorizontal: 24,
    width: 390,
    left: 0,
    position: 'absolute',
  },
  textWrapperFlexBox: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonclassicFlexBox: {
    paddingHorizontal: 20,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 0,
    alignItems: 'center',
  },
  buttonclassic2Position: {
    left: '50%',
    position: 'absolute',
    overflow: 'hidden',
  },
  sending: {
    textAlign: 'left',
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: 14,
  },
  stx: {
    color: '#fff',
    lineHeight: 22,
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
    letterSpacing: 0,
  },
  tokensIcon: {
    borderRadius: 1249,
    width: 40,
    height: 40,
    overflow: 'hidden',
  },
  frameContainer: {
    alignSelf: 'stretch',
  },
  tokensIcon1: {
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
  separator: {
    maxWidth: '100%',
    height: 1,
    overflow: 'hidden',
    width: '100%',
    backgroundColor: '#2b2b2b',
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
    backgroundColor: '#1a1a1a',
    shadowColor: 'rgba(0, 0, 0, 0)',
    shadowOffset: {
      width: 0,
      height: 71,
    },
    shadowRadius: 20,
    elevation: 20,
    shadowOpacity: 1,
    borderColor: '#2b2b2b',
    alignSelf: 'stretch',
    alignItems: 'center',
    overflow: 'hidden',
  },
  transactionCardAnimationSquWrapper: {
    top: 48,
    paddingHorizontal: 24,
    width: '100%',
    left: 0,
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
    backgroundColor: '#131313',
    alignItems: 'center',
    width: 390,
    top: 0,
  },
  frameParent: {
    height: 288,
    width: '100%',
  },
  approveOnRyder: {
    top: 467,
    left: 0,
    right: 0,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: 14,
    position: 'absolute',
  },
  youWillBe: {
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
    alignSelf: 'stretch',
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
    overflow: 'hidden',
    flex: 1,
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
    marginLeft: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
    flex: 1,
  },
  buttonclassicParent: {
    alignItems: 'flex-end',
    marginTop: 20,
    alignSelf: 'stretch',
  },
  youWillBeAskedToScanYourParent: {
    top: 720,
    paddingBottom: 24,
    display: 'none',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  loadingLightIcon: {
    marginTop: -29,
    marginLeft: -29,
    top: '50%',
    width: 58,
    height: 58,
  },
  buttonParent: {
    alignSelf: 'stretch',
  },
  buttonclassic2: {
    marginLeft: -72.5,
    top: 529,
    paddingHorizontal: 20,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 0,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  send: {
    height: 844,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    flex: 1,
  },
});

export default FinalReviewApproval;

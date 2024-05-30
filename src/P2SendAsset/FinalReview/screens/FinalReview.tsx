import {useNavigation} from '@react-navigation/native';
import {bytesToHex} from '@stacks/common';
import * as React from 'react';
import {useState} from 'react';
import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {publicKeyFromXtendedPubKey} from '../../../../lib/nfc-protocol/stacks-network';
import {signStxTransactionRequest} from '../../../../lib/nfc-protocol/stacks-nfc-protocol';
import {derivationPathStringToArray} from '../../../../lib/ryder-one';
import {SupportedAssets, assets} from '../../../../lib/tokens/tokens';
import FeeRow from '../../../Components/send-asset/FeeRow/FeeRow';
import ScreenHeader from '../../../Components/send-asset/ScreenHeader/ScreenHeader';
import {useFees} from '../../../Utils/feesContext';
import {useStacks} from '../../../Utils/stacksContext';
import {useWallet} from '../../../Utils/walletContext';
import {useLogger} from '../../../hooks/AppendLogger';
import {Contact} from '../../../../lib/contacts/contacts';
import Recipient from '../../../Components/send-asset/Recipient/Recipient';

const DERIVATION_PATH_PREFIX = "m/44'/5757'/0'/0/";

const FinalReview = ({route}) => {
  const {navigate} = useNavigation();
  const {
    asset,
    recipient,
    amount,
    feeAmount: initialFees,
  }: {asset: SupportedAssets; recipient: Contact; amount: number; feeAmount: number} = route.params;
  const recipientStxAddress = recipient.address?.stx;
  const fees = useFees(asset);
  const {network, transactionsApi, accountsApi, currentAccount, setCurrentAccount} = useStacks();
  const {currentWallet} = useWallet();
  const initialFeeAmount = initialFees || fees?.eco || 0;
  const durationFromFees = (f: number) => {
    if (!fees) return 60;
    switch (f) {
      case fees.eco:
        return fees.durationEco;
      case fees.fast:
        return fees.durationFast;
      case fees.urgent:
        return fees.durationUrgent;
      default:
        return fees.durationEco || 60;
    }
  };
  const [feeAmount, setFeeAmount] = useState<number>(initialFeeAmount);
  const [amountWithFees, setAmountWithFees] = useState<number>(amount + initialFeeAmount);
  const [transactionDuration, setTransactionDuration] = useState<number>(
    durationFromFees(initialFeeAmount),
  );
  const [publicKey, setPublicKey] = useState<string | undefined>();

  const toTimeString = (duration: number) => {
    return `~ ${Math.floor(duration / 60)}m ${duration % 60}sec`;
  };
  const updateFees = (newFees: number, newDuration: number) => {
    setFeeAmount(newFees);
    setAmountWithFees(amount + newFees);
    setTransactionDuration(newDuration);
  };
  const accountIndex = 0;
  const path = DERIVATION_PATH_PREFIX + accountIndex.toString;
  console.log(currentWallet);
  const extendedPublicKey = currentWallet.assets.stx?.xtendedPublicKey;

  React.useEffect(() => {
    if (extendedPublicKey) {
      const pubKey = publicKeyFromXtendedPubKey(extendedPublicKey, accountIndex);
      setPublicKey(bytesToHex(pubKey));
    }
  }, [extendedPublicKey]);

  const confirmTransaction = async () => {
    // TODO: nfc protocol: "send stx transaction"
    if (publicKey && recipientStxAddress) {
      const {submitted, unsignedTx} = await signStxTransactionRequest(
        {
          amountInUstx: Math.floor(amount * 1e6),
          derivationPath: derivationPathStringToArray(path),
          fees: feeAmount * 1e6,
          publicKey,
          recipient: recipientStxAddress,
        },
        network,
      ).catch((e) => {
        console.log(JSON.stringify(e));
        return e;
      });
      if (submitted) {
        navigate('FinalReviewApproval', {asset, recipient, amount, feeAmount, unsignedTx});
      } else {
        Alert.alert('NFC Error', 'failed to send transaction to Ryder One');
      }
    }
  };
  return (
    <SafeAreaView style={[styles.send, styles.sendLayout]}>
      <View style={styles.instanceParent}>
        <ScreenHeader title={'Final Review'} />
        <View
          style={[styles.transactionCardAnimationSquWrapper, styles.buttonclassicParentSpaceBlock]}>
          <View style={[styles.transactionCardAnimationSqu, styles.borderBorder]}>
            <View style={styles.transactionCardAnimationSquInner}>
              <View style={styles.frameParent}>
                <View style={styles.frameGroup}>
                  <View>
                    <Text style={styles.sending}>Sending</Text>
                    <Text style={[styles.stx, styles.stxLayout]}>
                      {amount} {assets[asset].symbol}
                    </Text>
                  </View>
                  <Image
                    style={styles.tokensFinalIcon}
                    resizeMode="cover"
                    source={assets[asset].source}
                  />
                </View>
                <View style={styles.frameWrapperFlexBox}>
                  <View>
                    <Text style={styles.sending}>To</Text>
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
              <View style={styles.frameContainer}>
                <View>
                  <Text style={styles.sending}>Total with fee</Text>
                  <View style={styles.tokensParent}>
                    <Text style={[styles.stx1, styles.stxTypo1]}>
                      {amountWithFees} {assets[asset].symbol}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        {fees && (
          <View
            style={[
              styles.transactionCardAnimationSquWrapper,
              styles.buttonclassicParentSpaceBlock,
            ]}>
            <FeeRow
              amount={fees.eco}
              selected={feeAmount === fees.eco}
              duration={fees.durationEco}
              asset={asset}
              icon={require('../assets/icon-wrapper2.png')}
              onPress={updateFees}
              label="Eco"
            />
            <FeeRow
              amount={fees.fast}
              duration={fees.durationFast}
              selected={feeAmount === fees.fast}
              asset={asset}
              icon={require('../assets/icon-wrapper3.png')}
              onPress={updateFees}
              label="Fast"
            />
            <FeeRow
              amount={fees.urgent}
              duration={fees.durationUrgent}
              selected={feeAmount === fees.urgent}
              asset={asset}
              icon={require('../assets/icon-wrapper4.png')}
              onPress={updateFees}
              label="Urgent"
            />
            <Text style={[styles.transactionCompleteInContainer, styles.textTypo]}>
              <Text style={styles.transactionCompleteIn}>{`Transaction complete in `}</Text>
              <Text style={styles.transactionDuration}>{toTimeString(transactionDuration)}</Text>
            </Text>
          </View>
        )}
      </View>
      <View
        style={[
          styles.youWillBeAskedToScanYourParent,
          styles.youWillBeAskedToScanYourParentSpaceBlock,
        ]}>
        <Text style={styles.youWillBe}>
          You will be asked to scan your phone and Ryder One with NFC after confirmation.
        </Text>
        <View style={[styles.buttonclassicParent, styles.parentFlexBox]}>
          <Pressable
            style={[styles.buttonclassic, styles.buttonclassicFlexBox]}
            onPress={() => navigate('ChooseAmount', {asset, recipient, amount, feeAmount})}>
            <View style={[styles.textWrapper, styles.labeliconFlexBox]}>
              <Text style={[styles.labelText3, styles.labelTypo1]}>Edit amount</Text>
            </View>
          </Pressable>
          <Pressable
            style={[styles.buttonclassic1, styles.buttonclassicFlexBox]}
            onPress={confirmTransaction}>
            <View style={[styles.textWrapper, styles.labeliconFlexBox]}>
              <Text style={[styles.labelText4, styles.labelTypo1]}>Confirm</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sendLayout: {
    width: '100%',
    overflow: 'hidden',
  },
  dynamicIslandLayout: {
    height: 37,
    position: 'absolute',
  },
  lensIconPosition: {
    zIndex: 0,
    position: 'absolute',
  },
  borderPosition: {
    opacity: 0.3,
    position: 'absolute',
  },
  textTypo: {
    textAlign: 'left',
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: 14,
  },
  buttonclassicParentSpaceBlock: {
    marginTop: 20,
    alignSelf: 'stretch',
  },
  borderBorder: {
    borderWidth: 1,
    borderStyle: 'solid',
  },
  stxLayout: {
    lineHeight: 22,
    color: '#fff',
  },
  iconWrapperLayout: {
    height: 20,
    width: 20,
  },
  labelTypo: {
    marginLeft: 4,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    letterSpacing: 0,
    textAlign: 'center',
  },
  frameViewSpaceBlock: {
    marginTop: -1,
    alignSelf: 'stretch',
  },
  stxTypo1: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  ellipseBorder: {
    paddingVertical: 8,
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderStyle: 'solid',
    alignSelf: 'stretch',
    alignItems: 'center',
    overflow: 'hidden',
  },
  frameWrapperFlexBox: {
    marginTop: 4,
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  stxTypo: {
    lineHeight: 24,
    letterSpacing: 1,
    fontSize: 16,
    textAlign: 'left',
    color: '#fff',
  },
  youWillBeAskedToScanYourParentSpaceBlock: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  parentFlexBox: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  buttonclassicFlexBox: {
    paddingHorizontal: 20,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    paddingVertical: 0,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    flex: 1,
  },
  labeliconFlexBox: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelTypo1: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    letterSpacing: 0,
    textAlign: 'center',
  },
  time: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'SF Pro',
    textAlign: 'center',
    color: '#fff',
  },
  timeStyle: {
    top: 10,
    left: 0,
    width: 33,
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lensIcon: {
    left: 101,
    width: 11,
    height: 11,
    top: 13,
  },
  dynamicIsland: {
    left: 114,
    borderRadius: 37,
    backgroundColor: '#000',
    width: 124,
    paddingTop: 13,
    paddingRight: 12,
    paddingBottom: 13,
    top: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    borderWidth: 1,
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
    height: 11,
  },
  right: {
    left: 279,
    width: 71,
    top: 13,
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'space-between',
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
    width: 24,
  },
  settings: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    color: '#fff',
  },
  iconWrapperParent: {
    paddingVertical: 0,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  instanceParent: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  sending: {
    color: '#b3b3b3',
    fontFamily: 'Poppins-Regular',
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: 14,
    textAlign: 'left',
  },
  stx: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    letterSpacing: 0,
    textAlign: 'left',
  },
  tokensFinalIcon: {
    borderRadius: 1249,
    width: 40,
    height: 40,
    overflow: 'hidden',
  },
  frameGroup: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
  tokensIcon: {
    borderRadius: 624,
    overflow: 'hidden',
  },
  julienNre: {
    lineHeight: 22,
    color: '#fff',
  },
  tokensParent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  frameParent: {
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
    color: '#9696fd',
    textAlign: 'center',
  },
  frameContainer: {
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
    paddingHorizontal: 24,
    alignItems: 'center',
    paddingVertical: 0,
  },
  frameChild: {
    marginLeft: -87,
    top: 48,
    left: '50%',
    width: 175,
    height: 52,
    opacity: 0,
  },
  labelText: {
    color: '#d1d4ff',
    lineHeight: 20,
  },
  stx2: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  text: {
    fontFamily: 'Poppins-Regular',
    color: '#fff',
  },
  labeliconParent: {
    zIndex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ellipseParent: {
    backgroundColor: '#222245',
    borderColor: '#573ccd',
  },
  labelText1: {
    lineHeight: 20,
    color: '#fff',
  },
  stx3: {
    fontFamily: 'Poppins-Regular',
  },
  text1: {
    color: '#b3b3b3',
    fontFamily: 'Poppins-Regular',
  },
  ellipseGroup: {
    marginTop: 12,
    borderColor: '#2b2b2b',
    backgroundColor: '#131313',
    borderRadius: 12,
  },
  transactionCompleteIn: {
    color: '#b3b3b3',
  },
  transactionDuration: {
    color: '#9696fd',
  },
  transactionCompleteInContainer: {
    marginTop: 12,
    fontFamily: 'Poppins-Regular',
  },
  youWillBe: {
    fontSize: 12,
    lineHeight: 16,
    color: '#b3b3b3',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    alignSelf: 'stretch',
  },
  labelText3: {
    lineHeight: 20,
    color: '#fff',
  },
  textWrapper: {
    paddingHorizontal: 8,
    paddingVertical: 0,
  },
  iconWrapper5: {
    display: 'none',
  },
  buttonclassic: {
    backgroundColor: '#2b2b2b',
    borderColor: '#4a4a4a',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  labelText4: {
    color: '#131313',
    lineHeight: 20,
  },
  buttonclassic1: {
    marginLeft: 10,
    backgroundColor: '#fff',
  },
  buttonclassicParent: {
    marginTop: 20,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  youWillBeAskedToScanYourParent: {
    paddingBottom: 24,
    justifyContent: 'flex-end',
    width: 390,
  },
  send: {
    height: 844,
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
    flex: 1,
    width: '100%',
    backgroundColor: '#131313',
  },
});

export default FinalReview;

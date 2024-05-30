import Clipboard from '@react-native-clipboard/clipboard';
import { useNavigation } from '@react-navigation/native';
import { validateStacksAddress } from '@stacks/transactions';
import * as React from 'react';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { assets } from '../../../../lib/tokens/tokens';
import AddressInput from '../../../Components/send-asset/AddressInput/AddressInput';
import ScreenHeader from '../../../Components/send-asset/ScreenHeader/ScreenHeader';
import { useAssetData } from '../../../Utils/assetContext';
import { usePrices } from '../../../Utils/pricesContext';
import { useWallet } from '../../../Utils/walletContext';

const AmountInput = ({
  amount,
  onChangeText,
  usd,
}: {
  amount: string;
  onChangeText: (((text: string) => void) & Function) | undefined;
  usd: boolean;
}) => {
  return (
    <TextInput
      inputMode="decimal"
      mode="flat"
      textColor="#fff"
      cursorColor="#fff"
      // activeUnderlineColor="#131313"
      autoFocus
      style={[styles.labelText, styles.labelTypo]}
      value={amount}
      placeholder="0"
      onChangeText={onChangeText}
      selectTextOnFocus
      returnKeyType="done"
      left={
        usd ? (
          <TextInput.Affix textStyle={{ color: '#fff', textAlignVertical: 'top' }} text="$" />
        ) : null
      }
    />
  );
};
const ChooseAmount = ({ route, navigation }) => {
  const { asset, recipient, amount: initialAmount, feeAmount } = route.params;
  const { decimals } = assets[asset];
  const { currentWallet } = useWallet();
  const amountAvailable =
    currentWallet.assets[asset].accounts[currentWallet.currentIndex].amountAvailable;
  const { defaultFees: fees } = useAssetData(asset);
  const prices = usePrices();
  const priceUsdAvailable = prices?.[asset]?.usd;
  const priceUsd = prices?.[asset]?.usd || 0;

  const [recipientAddress, setRecipientAddress] = useState<string>(recipient?.address?.stx || '');
  const [enterAsset, setEnterAsset] = useState<boolean>(true);

  const stxAmountToString = amount => amount.toFixed(6).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, '$1');

  const [amount, setAmount] = useState<string>(initialAmount ? stxAmountToString(initialAmount) : '');
  const [amountFiat, setAmountFiat] = useState<string>(
    initialAmount ? (initialAmount * priceUsd).toFixed(2) : '-',
  );
  const [amountNumber, setAmountNumber] = useState<number | undefined>(initialAmount || 0);
  const toFinalReview = () => {
    navigation.navigate('FinalReview', {
      asset,
      recipient: { address: { stx: recipientAddress }, icon: undefined, name: undefined },
      amount: amountNumber || 0,
      feeAmount: feeAmount || fees,
    });
  };

  const readyToContinue = () => !isNaN(parseFloat(amount)) && validateStacksAddress(recipientAddress);

  const updateFromAssetAmount = (aNumber: number, a: string) => {
    if (isNaN(aNumber)) {
      setAmountNumber(undefined);
      if (enterAsset) {
        setAmount(a);
        setAmountFiat('-');
      } else {
        setAmountFiat(a);
        setAmount('-');
      }
    } else {
      setAmountNumber(aNumber);
      if (enterAsset) {
        setAmount(a);
        setAmountFiat((aNumber * priceUsd).toFixed(2));
      } else {
        setAmountFiat(a);
        setAmount((aNumber / priceUsd).toFixed(decimals));
      }
    }
  };

  return (
    <SafeAreaView style={styles.send}>
      <View style={styles.instanceParent}>
        <ScreenHeader title={'Send'} />
        <View style={[styles.frameParent, styles.frameFlexBox]}>
          <View style={styles.frameWrapper}>
            <View style={styles.labelTextParent}>
              <AmountInput
                amount={enterAsset ? amount : amountFiat}
                onChangeText={(a: string) => {
                  const aNumber = parseFloat(a);
                  updateFromAssetAmount(aNumber, a);
                }}
                usd={!enterAsset}
              />
              <Pressable
                style={styles.buttoniconOnly}
                onPress={() => {
                  setEnterAsset(!enterAsset);
                }}>
                <Image
                  style={[styles.icon, styles.buttonclassicLayout]}
                  resizeMode="cover"
                  source={require('../assets/buttonicononly.png')}
                />
              </Pressable>
              <Text style={styles.labelText1}>
                ≈{enterAsset ? `$${amountFiat}` : `${amount} ${assets[asset].symbol}`}
              </Text>
            </View>
          </View>
          <View style={[styles.frameGroup, styles.frameFlexBox]}>
            <View style={styles.tokensFinalParent}>
              <Image
                style={styles.tokensFinalIcon}
                resizeMode="cover"
                source={assets[asset].source}
              />
              <View style={styles.totalAvailableParent}>
                <Text style={[styles.settings, styles.labelTypo]}>Total available</Text>
                <Text style={[styles.stx, styles.stxLayout]}>
                  {`${amountAvailable} ${assets[asset].symbol}`}
                </Text>
              </View>
            </View>
            <Pressable
              style={[styles.buttonclassic, styles.textWrapper1FlexBox]}
              onPress={() => {
                if (amountAvailable) {
                  const newAmount = amountAvailable - (feeAmount || fees);
                  updateFromAssetAmount(newAmount, newAmount.toFixed(decimals));
                }
              }}>
              <View style={[styles.textWrapper, styles.wrapperSpaceBlock]}>
                <Text style={[styles.labelText2, styles.labelTypo]}>Send all</Text>
              </View>
            </Pressable>
          </View>

          <AddressInput
            address={recipientAddress}
            setAddress={setRecipientAddress}
            onPaste={() => {
              Clipboard.getString().then((text) => setRecipientAddress(text));
            }}
            onScan={() => {
              navigation.replace('QRCode', {
                asset,
                recipient,
                amount: amountNumber,
                feeAmount: feeAmount || fees,
              });
            }}
          />
          <View style={[styles.frameContainer, styles.frameFlexBox]}>
            <View style={styles.iconWrapperGroup}>
              <Image
                style={styles.iconWrapperLayout}
                resizeMode="cover"
                source={require('../assets/icon-wrapper3.png')}
              />
              <Text style={[styles.fee, styles.stxLayout]}>Fee</Text>
            </View>
            <Text style={styles.stx1}>{`${feeAmount || fees} ${assets[asset].symbol}`}</Text>
          </View>
          <View style={[styles.frameContainer, styles.frameFlexBox]}>
            <View style={styles.iconWrapperGroup}>
              <Image
                style={styles.iconWrapperLayout}
                resizeMode="cover"
                source={require('../assets/icon-wrapper4.png')}
              />
              <Text style={[styles.fee, styles.stxLayout]}>Total with fee</Text>
            </View>
            <Text style={styles.stx1}>
              {amountNumber
                ? `${Number.parseFloat((amountNumber + (feeAmount || fees)).toFixed(decimals))} ${assets[asset].symbol}`
                : '-'}
            </Text>
          </View>
        </View>
      </View>
      <View style={[styles.sendInner, styles.sendInnerFlexBox]}>
        <View style={[styles.buttonclassicWrapper, styles.sendInnerFlexBox]}>
          <Pressable
            style={[styles.buttonclassic1, styles.buttonclassicLayout, readyToContinue() ? {} : styles.buttonDisabled]}
            disabled={!readyToContinue()}
            onPress={() => toFinalReview()}>
            <View style={styles.textWrapper1FlexBox}>
              <Text style={[styles.labelText3, styles.labelTypo]}>Continue</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonDisabled: {
    opacity: 0.3
  },
  wrapperSpaceBlock: {
    paddingVertical: 0,
    flexDirection: 'row',
  },
  labelTypo: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  frameFlexBox: {
    marginTop: 20,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  buttonclassicLayout: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  stxLayout: {
    lineHeight: 20,
    letterSpacing: 0,
  },
  textWrapper1FlexBox: {
    paddingHorizontal: 8,
    justifyContent: 'center',
    paddingVertical: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapperLayout: {
    height: 16,
    width: 16,
  },
  sendInnerFlexBox: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  settings: {
    textAlign: 'left',
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: 14,
    color: '#fff',
  },
  instanceParent: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 78,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#131313',
    height: 160,
  },
  icon: {
    height: '100%',
    width: '100%',
  },
  buttoniconOnly: {
    width: 32,
    marginTop: 12,
    height: 32,
  },
  labelText1: {
    fontSize: 22,
    lineHeight: 28,
    fontFamily: 'Poppins-Regular',
    marginTop: 12,
    textAlign: 'center',
    color: '#fff',
  },
  labelTextParent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  frameWrapper: {
    paddingHorizontal: 0,
    paddingVertical: 12,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  tokensFinalIcon: {
    borderRadius: 1249,
    width: 40,
    height: 40,
    overflow: 'hidden',
  },
  stx: {
    color: '#b3b3b3',
    fontFamily: 'Poppins-Regular',
    textAlign: 'left',
    fontSize: 14,
    lineHeight: 20,
  },
  totalAvailableParent: {
    marginLeft: 8,
    justifyContent: 'center',
  },
  tokensFinalParent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText2: {
    lineHeight: 16,
    letterSpacing: 0,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'center',
    color: '#fff',
  },
  textWrapper: {
    paddingHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonclassic: {
    borderRadius: 16,
    overflow: 'hidden',
    height: 32,
    borderWidth: 1,
    borderColor: '#fff',
    borderStyle: 'solid',
    alignSelf: 'center',
  },
  frameGroup: {
    borderRadius: 12,
    backgroundColor: '#1a1a1a',
    height: 80,
    paddingVertical: 0,
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  fee: {
    marginLeft: 4,
    fontFamily: 'Poppins-Regular',
    textAlign: 'left',
    fontSize: 14,
    lineHeight: 20,
    color: '#fff',
  },
  iconWrapperGroup: {
    width: 191,
    flexDirection: 'row',
    alignItems: 'center',
  },
  stx1: {
    letterSpacing: 1,
    lineHeight: 24,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    textAlign: 'left',
    color: '#fff',
  },
  frameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  frameParent: {
    paddingHorizontal: 24,
    paddingVertical: 0,
  },
  labelText3: {
    color: '#131313',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: 'center',
  },
  buttonclassic1: {
    height: 48,
    paddingHorizontal: 20,
    justifyContent: 'center',
    paddingVertical: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  buttonclassicWrapper: {
    paddingHorizontal: 24,
    paddingVertical: 0,
    alignSelf: 'stretch',
  },
  sendInner: {
    paddingBottom: 24,
    alignSelf: 'stretch',
  },
  send: {
    backgroundColor: '#131313',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});

export default ChooseAmount;

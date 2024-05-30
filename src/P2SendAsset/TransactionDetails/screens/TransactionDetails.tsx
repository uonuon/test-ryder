import * as React from 'react';
import {Image, Linking, Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ScreenHeader from '../../../Components/send-asset/ScreenHeader/ScreenHeader';
import {SupportedAssets, assets} from '../../../../lib/tokens/tokens';
import {usePrices} from '../../../Utils/pricesContext';
import {useStacks} from '../../../Utils/stacksContext';
import TransactionStatus from '../../../Components/send-asset/Transactions/TransactionStatus';
import {toUsdAmount} from '../../../../lib/tokens/formats';
import {Contact} from '../../../../lib/contacts/contacts';
import {createTxLink} from '../../../../lib/stacks';
import Recipient from '../../../Components/send-asset/Recipient/Recipient';

const TransactionDetails = ({route}) => {
  const {network} = useStacks();
  const {
    asset,
    amount,
    txid,
    feeAmount,
    recipient,
  }: {asset: SupportedAssets; amount: number; txid: string; feeAmount: number; recipient: Contact} =
    route.params;
  const {decimals, symbol} = assets[asset];
  const prices = usePrices();
  const price = prices[asset]?.usd;
  const toAssetAmount = (amount: number) => `${amount} ${symbol}`;
  const txDate = new Date();
  const txStatus = 'sending';
  const txLink = createTxLink(txid, network);
  return (
    <SafeAreaView style={styles.send}>
      <View>
        <ScreenHeader title={'Transaction Details'} />
        <View style={styles.frameParent}>
          <View style={styles.buttoniconOnlyParent}>
            <View style={[styles.buttoniconOnly, styles.buttonclassicFlexBox]}>
              <Image
                style={styles.iconWrapper}
                resizeMode="cover"
                source={require('../assets/icon-wrapper2.png')}
              />
            </View>
            <View style={styles.frameGroup}>
              <View style={styles.stxParent}>
                <Text style={[styles.stx, styles.stxTypo]}>
                  {amount} {assets[asset].symbol}
                </Text>
                <Image
                  style={[styles.iconWrapper3, styles.iconWrapperLayout]}
                  resizeMode="cover"
                  source={require('../assets/icon-wrapper3.png')}
                />
              </View>
              <Text style={[styles.sentTo, styles.text1Typo]}>Sent to</Text>
              <Recipient recipient={recipient} />
            </View>
            <TransactionStatus mode={txStatus} />
          </View>
          <View style={styles.frameContainer}>
            <View style={styles.accountParent}>
              <Text style={[styles.account, styles.text1Typo]}>ACCOUNT</Text>
              <Text style={[styles.mainAccount, styles.stx1Typo]}>Main account</Text>
            </View>
            <View style={styles.accountParent}>
              <Text style={[styles.account, styles.text1Typo]}>DATE</Text>
              <Text style={[styles.mainAccount, styles.stx1Typo]}>{txDate.toLocaleString()}</Text>
            </View>
            <View style={styles.accountParent}>
              <Text style={[styles.account, styles.text1Typo]}>NETWORK FEES</Text>
              <View style={styles.tokensParent}>
                <Text style={styles.stx1Typo}>
                  {feeAmount} {assets[asset].symbol}
                </Text>
                <Text style={[styles.text1, styles.text1Typo]}>
                  {toUsdAmount(feeAmount, price)}
                </Text>
              </View>
            </View>
            <View style={styles.accountParent}>
              <Text style={[styles.account, styles.text1Typo]}>TRANSACTION ID</Text>
              <Text style={[styles.xd986dvfb8gbb79dfv87dfv7998dbf, styles.stx1Typo]}>{txid}</Text>
            </View>
            <View style={styles.accountParent}>
              <Text style={[styles.account, styles.text1Typo]}>FROM</Text>
              <Text style={[styles.xd986dvfb8gbb79dfv87dfv7998dbf, styles.stx1Typo]}>
                SP24GROE3MT09RPO421DRLM304RTP0O88RT90
              </Text>
            </View>
            <View style={styles.accountParent}>
              <Text style={[styles.account, styles.text1Typo]}>TO</Text>
              <Text style={[styles.xd986dvfb8gbb79dfv87dfv7998dbf, styles.stx1Typo]}>
                {recipient.address[asset]}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.sendInner}>
        <Pressable
          style={styles.buttonclassicWrapper}
          onPress={async () => {
            await Linking.openURL(txLink);
          }}>
          <View style={[styles.buttonclassic, styles.buttonclassicFlexBox]}>
            <View style={styles.textWrapper}>
              <Text style={styles.labelText1}>View in explorer</Text>
            </View>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonclassicFlexBox: {
    borderRadius: 16,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  stxTypo: {
    lineHeight: 22,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    letterSpacing: 0,
    color: '#fff',
  },
  iconWrapperLayout: {
    height: 16,
    width: 16,
  },
  text1Typo: {
    color: '#b3b3b3',
    fontFamily: 'Poppins-Regular',
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: 14,
  },
  iconLayout: {
    height: 20,
    width: 20,
  },
  stx1Typo: {
    fontFamily: 'Poppins-Regular',
    textAlign: 'left',
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: 14,
    color: '#fff',
  },
  iconWrapper: {
    height: 24,
    width: 24,
  },
  buttoniconOnly: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  stx: {
    textAlign: 'left',
  },
  iconWrapper3: {
    marginLeft: 4,
  },
  stxParent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sentTo: {
    marginTop: 4,
    textAlign: 'center',
  },
  tokensIcon: {
    borderRadius: 624,
    overflow: 'hidden',
  },
  julienNre: {
    marginLeft: 4,
    textAlign: 'center',
  },
  tokensParent: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  frameGroup: {
    marginTop: 12,
    alignItems: 'center',
  },
  buttoniconOnlyParent: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  account: {
    textAlign: 'left',
  },
  mainAccount: {
    marginTop: 4,
  },
  accountParent: {
    borderColor: '#2b2b2b',
    borderBottomWidth: 1,
    paddingHorizontal: 0,
    paddingVertical: 16,
    justifyContent: 'center',
    alignSelf: 'stretch',
    borderStyle: 'solid',
  },
  text1: {
    marginLeft: 12,
    textAlign: 'left',
  },
  xd986dvfb8gbb79dfv87dfv7998dbf: {
    marginTop: 4,
    alignSelf: 'stretch',
  },
  frameContainer: {
    marginTop: 12,
    alignSelf: 'stretch',
  },
  frameParent: {
    marginTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 0,
    alignSelf: 'stretch',
  },
  labelText1: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#fff',
  },
  textWrapper: {
    paddingHorizontal: 8,
    justifyContent: 'center',
    paddingVertical: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonclassic: {
    backgroundColor: '#2b2b2b',
    borderColor: '#4a4a4a',
    height: 48,
    paddingHorizontal: 20,
    justifyContent: 'center',
    paddingVertical: 0,
    borderWidth: 1,
    borderStyle: 'solid',
    flex: 1,
  },
  buttonclassicWrapper: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  sendInner: {
    justifyContent: 'flex-end',
    paddingBottom: 24,
    paddingHorizontal: 24,
    alignItems: 'center',
    width: 390,
  },
  send: {
    width: '100%',
    height: 844,
    justifyContent: 'space-between',
    overflow: 'hidden',
    flex: 1,
    backgroundColor: '#131313',
  },
});

export default TransactionDetails;

import * as React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {useStacks} from '../Utils/stacksContext';
import {USDollar, btcToUSD} from '../Utils/currencies';

const TransactionCard = () => {
  const {currentAccount, updateAccount} = useStacks();
  console.log(currentAccount);
  const btcAmount = currentAccount?.txAmount ? currentAccount.txAmount.toString() : '--.--';
  const usdAmount = currentAccount?.txAmount
    ? USDollar.format(currentAccount.txAmount * btcToUSD)
    : '--.--';
  console.log(currentAccount, new Date());

  return (
    <View style={styles.component37}>
      <View style={[styles.rectangleParent, styles.frameChildPosition]}>
        <View style={[styles.frameChild, styles.frameChildPosition]} />
        <Image
          style={styles.frameItem}
          resizeMode="cover"
          source={require('../../assets/frame-26085557.png')}
        />
        <View style={styles.frameParent}>
          <View style={[styles.frameWrapper, styles.wrapperFlexBox]}>
            <View style={[styles.frameGroup, styles.frameFlexBox]}>
              <View style={styles.protocolIconParent}>
                <Image
                  style={styles.frameInnerLayout}
                  resizeMode="cover"
                  source={require('../../assets/btc-icon.png')}
                />
                <Text style={[styles.btc, styles.btcFlexBox]}>{btcAmount} BTC</Text>
              </View>
              <View style={styles.wrapperFlexBox}>
                <Text style={[styles.usd, styles.btcFlexBox]}>≈ ${usdAmount} (USD)</Text>
              </View>
            </View>
          </View>
          <View style={[styles.sentToParent, styles.frameViewFlexBox]}>
            <Text style={[styles.sentTo, styles.btcFlexBox]}>Sent to</Text>
            <View style={styles.iconwrapper}>
              <Image
                style={styles.arrowNarrowDownIcon1}
                resizeMode="cover"
                source={require('../../assets/arrow-narrow-down.png')}
              />
            </View>
          </View>
          <View style={[styles.frameView, styles.frameViewFlexBox]}>
            <View style={styles.protocolIconParent}>
              <Image
                style={[styles.frameInner, styles.frameInnerLayout]}
                resizeMode="cover"
                source={require('../../assets/frame-81.png')}
              />
              <Text style={[styles.btc, styles.btcFlexBox]}>Satoshi N.</Text>
            </View>
            <Text style={[styles.usd, styles.btcFlexBox]}>BC1...ZEJ</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frameChildPosition: {
    width: 304,
    left: 0,
    position: 'absolute',
  },
  wrapperFlexBox: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  frameFlexBox: {
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  btcFlexBox: {
    textAlign: 'center',
    color: '#fff',
    lineHeight: 15,
    letterSpacing: 0,
  },
  frameViewFlexBox: {
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  frameInnerLayout: {
    height: 28,
    width: 28,
  },
  frameChild: {
    bottom: 0,
    height: 75,
    zIndex: 0,
    backgroundColor: '#6962f3',
  },
  frameItem: {
    marginTop: -100,
    top: '50%',
    width: 300,
    height: 200,
    display: 'none',
    opacity: 0.2,
    zIndex: 1,
    left: 0,
    position: 'absolute',
  },
  btc: {
    fontSize: 16,
    marginLeft: 8,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff',
    lineHeight: 15,
    letterSpacing: 0,
  },
  protocolIconParent: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  usd: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    color: '#fff',
    lineHeight: 15,
    letterSpacing: 0,
  },
  frameGroup: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  frameWrapper: {
    alignSelf: 'stretch',
    alignItems: 'flex-end',
  },
  sentTo: {
    fontSize: 10,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff',
    lineHeight: 15,
    letterSpacing: 0,
  },
  arrowNarrowDownIcon1: {
    width: 16,
    height: 16,
    overflow: 'hidden',
  },
  iconwrapper: {
    marginLeft: 4,
    flexDirection: 'row',
  },
  sentToParent: {
    borderStyle: 'solid',
    borderColor: '#7c76fa',
    borderWidth: 4,
    height: 31,
    paddingLeft: 12,
    paddingTop: 4,
    paddingRight: 8,
    paddingBottom: 4,
    borderRadius: 360,
    justifyContent: 'center',
    backgroundColor: '#6962f3',
  },
  frameInner: {
    borderRadius: 360,
    overflow: 'hidden',
  },
  frameView: {
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  frameParent: {
    zIndex: 2,
    marginLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  rectangleParent: {
    bottom: 20,
    borderRadius: 16,
    backgroundColor: '#7c76fa',
    height: 150,
    padding: 20,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  component37: {
    top: 30,
    width: '100%',
    height: 214,
    overflow: 'hidden',
    flex: 1,
    position: 'absolute',
  },
});

export default TransactionCard;

import * as React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {SupportedAssets, assets} from '../../../../lib/tokens/tokens';
import {usePrices} from '../../../Utils/pricesContext';
import {toUsdAmount} from '../../../../lib/tokens/formats';

const FeeRow = ({
  asset,
  amount,
  duration,
  label,
  icon,
  selected,
  onPress,
}: {
  asset: SupportedAssets;
  amount: number;
  duration: number;
  label: string;
  icon: any;
  selected: boolean;
  onPress: (amount: number, duration: number) => void;
}) => {
  const {symbol} = assets[asset];
  const prices = usePrices();
  const priceUsdAvailable = prices[asset]?.usd;
  const price = prices[asset]?.usd || 1;
  const toAssetAmount = (amount: number) => `${amount} ${symbol}`;

  return (
    <Pressable
      style={[
        styles.ellipseGroup,
        styles.ellipseBorder,
        selected ? styles.parentColorsSelected : styles.parentColors,
      ]}
      onPress={() => {
        onPress(amount, duration);
      }}>
      <Image
        style={[styles.frameChild, styles.lensIconPosition]}
        resizeMode="cover"
        source={require('./assets/ellipse-119.png')}
      />
      <View style={[styles.labeliconParent, styles.frameWrapperFlexBox]}>
        <View style={styles.labeliconFlexBox}>
          <Image style={styles.iconWrapperLayout} resizeMode="cover" source={icon} />
          <Text style={[styles.labelText1, styles.labelTypo]}>{label}</Text>
        </View>
        <View style={styles.parentFlexBox}>
          <Text style={[styles.stx3, styles.stxTypo]}>{toAssetAmount(amount)}</Text>
          <Text style={[styles.text1, styles.textTypo]}>{toUsdAmount(amount, price)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  lensIconPosition: {
    zIndex: 0,
    position: 'absolute',
  },
  textTypo: {
    textAlign: 'left',
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: 14,
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
  parentFlexBox: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  labeliconFlexBox: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  frameChild: {
    marginLeft: -87,
    top: 48,
    left: '50%',
    width: 175,
    height: 52,
    opacity: 0,
  },
  labeliconParent: {
    zIndex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
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
    borderRadius: 12,
  },
  parentColors: {
    borderColor: '#2b2b2b',
    backgroundColor: '#131313',
  },
  parentColorsSelected: {
    backgroundColor: '#222245',
    borderColor: '#573ccd',
  },
});

export default FeeRow;

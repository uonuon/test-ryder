import * as React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SupportedFiat} from '../../../Utils/pricesContext';

const TotalBalance = ({total, fiat}: {total: number; fiat: SupportedFiat}) => {
  const totalWithoutCents = Math.floor(total);
  const totalCent = (total - totalWithoutCents).toFixed(2).substring(1);
  return (
    <View style={styles.total}>
      <View style={styles.amount}>
        <Text style={styles.balanceTypo}>
          <Text style={styles.headlineLarge}>
            {fiat === 'usd'
              ? `$${totalWithoutCents.toLocaleString()}`
              : `${totalWithoutCents.toLocaleString()}`}
          </Text>
        </Text>
        <Text style={styles.headlineSmallTypo}>{totalCent}</Text>
        <Text style={styles.labelSmallTypo}> {fiat === 'usd' ? '(USD)' : '€'}</Text>
      </View>
      <Image
        style={styles.iconLayout1}
        resizeMode="cover"
        source={require('./assets/icon-wrapper2.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headlineLarge: {
    color: '#fff',
    textAlign: 'left',
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    fontSize: 32,
    lineHeight: 40,
  },
  labelSmallTypo: {
    color: '#fff',
    textAlign: 'left',
    fontFamily: 'Poppins-Medium',
    fontWeight: '400',
    letterSpacing: 0,
    fontSize: 12,
    lineHeight: 16,
  },
  iconLayout1: {
    height: 24,
    width: 24,
  },
  headlineSmallTypo: {
    color: '#fff',
    textAlign: 'left',
    fontFamily: 'Poppins-Medium',
    fontWeight: '400',
    fontSize: 24,
    lineHeight: 32,
  },
  text3: {
    fontFamily: 'Poppins-Regular',
  },
  balanceTypo: {
    color: '#fff',
    textAlign: 'left',
    fontFamily: 'Poppins-Medium',
    fontSize: 32,
    lineHeight: 40,
  },
  total: {
    marginTop: 12,
    alignItems: 'stretch',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  amount: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
  },
});

export default TotalBalance;

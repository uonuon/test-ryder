import * as React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {
  Color,
  Border,
  StyleVariable,
  FontSize,
  FontFamily,
  Padding,
} from '../GlobalStyles';

const WalletHome = () => {
  return (
    <View style={styles.bubbleParent}>
      <View style={styles.bubble}>
        <Image
          style={styles.checkIcon}
          resizeMode="cover"
          source={require('../assets/check.png')}
        />
        <Text style={styles.text}>2</Text>
      </View>
      <View style={styles.accountPairedWithRyderOneWrapper}>
        <Text style={styles.accountPairedWith}>
          Account paired with Ryder One
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  checkIcon: {
    width: 67,
    height: 67,
    overflow: 'hidden',
  },
  text: {
    fontSize: 57,
    lineHeight: 54,
    color: Color.successSolid5,
    display: 'none',
    marginTop: 35.83,
    fontFamily: FontFamily.poppinsSemiBold,
    letterSpacing: 0,
    textAlign: 'center',
    fontWeight: '600',
  },
  bubble: {
    borderRadius: 108,
    backgroundColor: Color.successSolid12,
    width: 86,
    height: 86,
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountPairedWith: {
    fontSize: FontSize.titleMedium500_size,
    lineHeight: 22,
    width: 324,
    fontFamily: FontFamily.titleMedium500,
    fontWeight: '500',
    color: Color.neutral13,
    letterSpacing: 0,
    textAlign: 'center',
  },
  accountPairedWithRyderOneWrapper: {
    marginTop: 20,
    width: 350,
    alignItems: 'center',
  },
  bubbleParent: {
    alignItems: 'center',
  },
});

export default WalletHome;

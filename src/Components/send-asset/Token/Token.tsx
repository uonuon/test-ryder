import * as React from 'react';
import {Text, StyleSheet, View, Image, Pressable} from 'react-native';
import {SupportedAssets, assets} from '../../../../lib/tokens/tokens';

const Token = ({
  asset,
  amount,
  amountFiat,
  onPress,
}: {
  asset: SupportedAssets;
  amount: number;
  amountFiat: number | undefined;
  onPress: (asset: SupportedAssets) => void;
}) => {
  return (
    <Pressable
      style={styles.frameContainer}
      onPress={() => {
        onPress(asset);
      }}>
      <View style={styles.rightFlexBox}>
        <Image style={styles.tokensFinalIcon} resizeMode="cover" source={assets[asset].source} />
        <View style={styles.buttonclassic1SpaceBlock}>
          <Text style={[styles.ethereum, styles.textTypo]}>{assets[asset].name}</Text>
          <Text style={[styles.eth, styles.ethClr]}>{assets[asset].symbol}</Text>
        </View>
      </View>
      <View style={styles.parent}>
        <Text style={[styles.text, styles.textTypo]}>{amount}</Text>
        <Text style={[styles.eth, styles.ethClr]}>
          {amountFiat === undefined ? '' : `$${amountFiat.toFixed(2)}`}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  rightFlexBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonclassic1SpaceBlock: {
    marginLeft: 8,
    justifyContent: 'center',
  },
  ethClr: {
    color: '#b3b3b3',
    letterSpacing: 0,
  },
  textTypo: {
    lineHeight: 24,
    letterSpacing: 1,
    fontSize: 16,
    textAlign: 'left',
    color: '#fff',
  },
  tokensFinalIcon: {
    borderRadius: 1249,
    width: 40,
    height: 40,
    overflow: 'hidden',
  },
  ethereum: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  eth: {
    fontFamily: 'Poppins-Regular',
    textAlign: 'left',
    fontSize: 14,
    lineHeight: 20,
  },
  text: {
    fontFamily: 'Poppins-Regular',
  },
  parent: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  frameContainer: {
    borderColor: '#2b2b2b',
    borderBottomWidth: 1,
    height: 80,
    borderStyle: 'solid',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
});

export default Token;

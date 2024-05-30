import * as React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {Color, Border, FontSize, FontFamily, Padding, StyleVariable} from '../GlobalStyles';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {useNavigation} from '@react-navigation/native';
import AppHeader from '../Components/AppHeader';

const SelectToken = ({route, navigation}) => {
  const navigator = useNavigation();
  return (
    <View style={styles.walletHome}>
      <View style={styles.frameParent}>
        <AppHeader title="SEND" showSteps step={1} />
        <View style={[styles.inputsParent, styles.frameGroupSpaceBlock]}>
          <View style={styles.inputs}>
            <Text style={styles.bitcoinEthereumMatic}>Bitcoin, Ethereum, Matic...</Text>
            <View style={[styles.searchTokenWrapper, styles.buttonSpaceBlock]}>
              <Text style={styles.searchToken}>Search token</Text>
            </View>
          </View>
          <View style={[styles.frameGroup, styles.frameGroupSpaceBlock]}>
            <View style={styles.tokensAvailableParent}>
              <Text style={styles.tokensAvailable}>Tokens available</Text>
              <Image
                style={styles.plusIcon}
                resizeMode="cover"
                source={require('../../assets/plus.png')}
              />
            </View>
            <View style={styles.frameContainer}>
              <View style={[styles.frameFlexBox]}>
                <Pressable
                  onPress={() => {
                    navigator.navigate('SendToken');
                  }}>
                  <View style={styles.protocolIconParent}>
                    <Image
                      style={styles.protocolIcon}
                      resizeMode="cover"
                      source={require('../../assets/protocol-icon.png')}
                    />
                    <View style={styles.bitcoinBtcWrapper}>
                      <Text style={[styles.bitcoinBtc, styles.labelTextTypo]}>Bitcoin (BTC)</Text>
                    </View>
                  </View>
                </Pressable>
                <View style={styles.btcParent}>
                  <Text style={[styles.btc, styles.btcTypo]}>1.12 BTC</Text>
                  <Text style={[styles.usd, styles.btcTypo]}>≈ $34,891.08 (USD)</Text>
                </View>
              </View>
              <View style={[styles.frameParent1, styles.frameFlexBox]}>
                <View>
                  <View style={styles.protocolIconParent}>
                    <Image
                      style={styles.protocolIcon}
                      resizeMode="cover"
                      source={require('../../assets/protocol-icon1.png')}
                    />
                    <Text style={[styles.ethereumEth, styles.labelTextTypo]}>Ethereum (ETH)</Text>
                  </View>
                </View>
                <View style={styles.btcParent}>
                  <Text style={[styles.btc, styles.btcTypo]}>3.048 ETH</Text>
                  <Text style={[styles.usd, styles.btcTypo]}>≈ $4,645.22 (USD)</Text>
                </View>
              </View>
              <View style={[styles.frameParent1, styles.frameFlexBox]}>
                <View>
                  <View style={styles.protocolIconParent}>
                    <Image
                      style={styles.protocolIcon}
                      resizeMode="cover"
                      source={require('../../assets/protocol-icon2.png')}
                    />
                    <Text style={[styles.ethereumEth, styles.labelTextTypo]}>Polygon (MATIC)</Text>
                  </View>
                </View>
                <View style={styles.btcParent}>
                  <Text style={[styles.btc, styles.btcTypo]}>1220 MATIC</Text>
                  <Text style={[styles.usd, styles.btcTypo]}>≈ $613 (USD)</Text>
                </View>
              </View>
              <View style={[styles.frameParent1, styles.frameFlexBox]}>
                <View>
                  <View style={styles.protocolIconParent}>
                    <Image
                      style={styles.protocolIcon}
                      resizeMode="cover"
                      source={require('../../assets/protocol-icon3.png')}
                    />
                    <Text style={[styles.ethereumEth, styles.labelTextTypo]}>Solana (SOL)</Text>
                  </View>
                </View>
                <View style={styles.btcParent}>
                  <Text style={[styles.btc, styles.btcTypo]}>82 SOL</Text>
                  <Text style={[styles.usd, styles.btcTypo]}>≈ $342 (USD)</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frameGroupSpaceBlock: {
    marginTop: 20,
    alignItems: 'center',
  },
  buttonSpaceBlock: {
    paddingVertical: 0,
    alignItems: 'center',
    position: 'absolute',
  },
  labelTextTypo: {
    fontSize: FontSize.labelLarge500_size,
    lineHeight: 20,
    fontFamily: FontFamily.labelLarge500,
    fontWeight: '500',
    letterSpacing: 0,
  },
  btcTypo: {
    fontFamily: FontFamily.labelMedium400,
    letterSpacing: 1,
    lineHeight: 16,
    textAlign: 'left',
    fontSize: FontSize.labelMedium400_size,
  },
  frameFlexBox: {
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: 0,
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    borderRadius: Border.br_xs,
    alignItems: 'center',
    flexDirection: 'row',
  },
  bitcoinEthereumMatic: {
    zIndex: 0,
    fontFamily: FontFamily.labelLarge500,
    fontWeight: '500',
    lineHeight: 16,
    textAlign: 'left',
    fontSize: FontSize.labelMedium400_size,
    color: Color.neutralSolid12,
  },
  searchToken: {
    fontSize: 10,
    letterSpacing: 1,
    fontFamily: FontFamily.labelLarge500,
    fontWeight: '500',
    textAlign: 'left',
    lineHeight: 24,
    color: Color.neutralSolid12,
  },
  searchTokenWrapper: {
    top: -12,
    left: 12,
    paddingHorizontal: Padding.p_5xs,
    zIndex: 1,
    flexDirection: 'row',
    backgroundColor: Color.whiteOverride,
    paddingVertical: 0,
  },
  inputs: {
    height: 44,
    paddingLeft: 20,
    paddingTop: Padding.p_5xs,
    paddingRight: Padding.p_5xs,
    paddingBottom: Padding.p_5xs,
    borderRadius: Border.br_xs,
    width: 350,
    alignItems: 'center',
    borderWidth: 1,
    flexDirection: 'row',
    borderColor: Color.neutralSolid6,
    borderStyle: 'solid',
  },
  tokensAvailable: {
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'left',
    color: Color.neutral13,
    fontFamily: FontFamily.poppinsSemiBold,
    letterSpacing: 0,
    fontWeight: '600',
  },
  plusIcon: {
    height: 24,
    width: 24,
    overflow: 'hidden',
  },
  tokensAvailableParent: {
    justifyContent: 'space-between',
    width: 350,
    alignItems: 'center',
    flexDirection: 'row',
  },
  protocolIcon: {
    width: 32,
    height: 32,
  },
  bitcoinBtc: {
    textAlign: 'left',
    color: Color.neutral13,
  },
  bitcoinBtcWrapper: {
    marginLeft: 8,
  },
  protocolIconParent: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  btc: {
    color: Color.neutral13,
    fontFamily: FontFamily.labelMedium400,
  },
  usd: {
    marginTop: 8,
    color: Color.neutralSolid12,
  },
  btcParent: {
    width: 155,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  ethereumEth: {
    marginLeft: 8,
    textAlign: 'left',
    color: Color.neutral13,
  },
  frameParent1: {
    marginTop: 12,
  },
  frameContainer: {
    marginTop: 12,
    width: 350,
    alignItems: 'center',
  },
  frameGroup: {
    width: 390,
    overflow: 'hidden',
  },
  inputsParent: {
    width: 350,
  },
  frameParent: {
    top: 5,
    left: 20,
    alignItems: 'center',
    position: 'absolute',
  },
  labelText: {
    color: Color.whiteOverride,
    textAlign: 'center',
  },
  button: {
    borderRadius: Border.br_341xl,
    height: 48,
    paddingHorizontal: StyleVariable.classicButtonsPaddingNoIcon,
    display: 'none',
    justifyContent: 'center',
    backgroundColor: Color.singaporeSolid9,
    width: '100%',
    overflow: 'hidden',
  },
  walletHome: {
    flex: 1,
    width: '100%',
    height: 850,
    overflow: 'hidden',
    borderColor: Color.neutralSolid6,
    borderStyle: 'solid',
    backgroundColor: Color.whiteOverride,
  },
});

export default SelectToken;

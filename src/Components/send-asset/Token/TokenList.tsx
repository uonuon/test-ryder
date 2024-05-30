import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {SupportedAssets, assets} from '../../../../lib/tokens/tokens';
import Token from '../../../Components/send-asset/Token/Token';
import {usePrices} from '../../../Utils/pricesContext';
import {AssetList, WalletAccount} from '../../../Utils/walletContext';
import {calculateAssetTotal, calculateTotal} from '../../../../lib/tokens/calculations';

const TokenList = ({
  allAssets,
  selectToken,
}: {
  allAssets: AssetList;
  selectToken: (asset: SupportedAssets) => void;
}) => {
  const prices = usePrices();
  return (
    <View style={[styles.frameWrapper, styles.parentFlexBox]}>
      <View style={styles.parentFlexBox}>
        {Object.keys(allAssets).map((assetString: string, index: number) => {
          const asset = assetString as SupportedAssets;
          const accounts = allAssets[asset]?.accounts || [];
          const amount = calculateAssetTotal(accounts);
          const priceUsd = prices?.[asset]?.usd;
          const amountFiat = priceUsd === undefined ? undefined : amount * priceUsd;
          return (
            <Token
              key={index}
              asset={asset}
              amount={amount}
              amountFiat={amountFiat}
              onPress={selectToken}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentFlexBox: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  frameWrapper: {
    marginTop: 28,
  },
});

export default TokenList;

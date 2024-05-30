import {PricesProps, SupportedFiat} from '../../src/Utils/pricesContext';
import {Wallet, WalletAccount} from '../../src/Utils/walletContext';
import {SupportedAssets} from './tokens';

export const calculateTotal = (wallet: Wallet, prices: PricesProps, fiat: SupportedFiat) => {
  let sum = 0;
  for (let a of Object.keys(wallet.assets)) {
    const asset = a as SupportedAssets;
    const price = prices[asset]?.[fiat];
    if (price !== undefined) {
      const assetAccounts = wallet.assets[a].accounts as WalletAccount[];
      for (let i = 0; i < assetAccounts.length; i++) {
        const amountAvailble = assetAccounts[i].amountAvailable;
        if (amountAvailble) {
          sum += amountAvailble * price;
        }
      }
    }
  }
  return sum;
};

export const calculateAssetTotal = (assetAccounts: WalletAccount[] | undefined) => {
  let sum = 0;
  if (assetAccounts) {
    for (let i = 0; i < assetAccounts.length; i++) {
      const amountAvailble = assetAccounts[i].amountAvailable;
      if (amountAvailble) {
        sum += amountAvailble;
      }
    }
  }
  return sum;
};

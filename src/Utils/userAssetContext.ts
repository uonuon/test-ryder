// Settings Context - src/context/Settings
import {createContext, useContext} from 'react';
import {SupportedAssets} from '../../lib/tokens/tokens';

export type UserAssetDataProps = {
  [key in SupportedAssets]?: {
    amountAvailable?: number;
  };
};
export const UserAssetDataContext = createContext<UserAssetDataProps>({
  stx: {amountAvailable: 524},
  btc: {amountAvailable: 0.1056682},
  eth: {amountAvailable: 2.54},
  polygon: {},
  shib: {},
  sol: {},
  usdc: {},
});

export const useUserAssetData = (asset: SupportedAssets) => {
  return useContext(UserAssetDataContext)[asset];
};

export const useUserAllAssetData = () => {
  return useContext(UserAssetDataContext);
};

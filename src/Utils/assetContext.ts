// Settings Context - src/context/Settings
import {createContext, useContext} from 'react';
import {SupportedAssets} from '../../lib/tokens/tokens';

export type AssetDataProps = {
  [key in SupportedAssets]: {
    defaultFees: number;
  };
};
export const AssetDataContext = createContext<AssetDataProps>({
  stx: {defaultFees: 0.25},
  btc: {defaultFees: 0.00012},
  eth: {defaultFees: 100},
  polygon: {defaultFees: 100},
  shib: {defaultFees: 100},
  sol: {defaultFees: 100},
  usdc: {defaultFees: 100},
});

export const useAssetData = (asset: SupportedAssets) => {
  return useContext(AssetDataContext)[asset];
};

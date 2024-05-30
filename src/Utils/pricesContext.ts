// Settings Context - src/context/Settings
import {createContext, useContext} from 'react';
import {SupportedAssets} from '../../lib/tokens/tokens';

export type SupportedFiat = 'usd' | 'eur';

export type PricesProps = {
  [key in SupportedAssets]?: {[key in SupportedFiat]?: number};
};

export const PricesContext = createContext<PricesProps>({
  stx: {usd: 2.05, eur: 1.91},
  btc: {usd: 59101.23, eur: 55007.17},
});

export const usePrices = () => {
  return useContext(PricesContext);
};

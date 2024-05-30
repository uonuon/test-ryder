// Settings Context - src/context/Settings
import {createContext, useContext} from 'react';
import {SupportedAssets} from '../../lib/tokens/tokens';

export type FeesProps = {
  [key in SupportedAssets]?: {
    eco: number;
    fast: number;
    urgent: number;
    durationEco: number;
    durationFast: number;
    durationUrgent: number;
  };
};

export const FeesContext = createContext<FeesProps>({
  stx: {
    eco: 0.025,
    fast: 0.0389,
    urgent: 0.138509,
    durationEco: 803,
    durationFast: 1022,
    durationUrgent: 253,
  },
  btc: {
    eco: 0.00001245,
    fast: 0.00021245,
    urgent: 0.00031547,
    durationEco: 803,
    durationFast: 1022,
    durationUrgent: 253,
  },
});

export const useAllFees = () => {
  return useContext(FeesContext);
};

export const useFees = (asset: SupportedAssets) => {
  return useContext(FeesContext)[asset];
};

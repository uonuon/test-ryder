// Settings Context - src/context/Settings
import {Dispatch, createContext, useContext} from 'react';
import {SupportedAssets} from '../../lib/tokens/tokens';

export type WalletAccount = {
  amountAvailable?: number;
};

export type Device = {
  name: string;
  serial: string;
  icon: any;
};

export type AssetList = {
  [key in SupportedAssets]?: {
    accounts: WalletAccount[];
    xtendedPublicKey?: string;
  };
};

export type Wallet = {
  // zero-based index of accounts
  currentIndex: number;
  assets: AssetList;
};

export type Backup = {
  type: 'super' | 'social';
  name?: string;
  backup: string;
};

export type WalletProps = {
  currentDevice?: Device | undefined;
  setCurrentDevice: Dispatch<React.SetStateAction<Device | undefined>>;
  currentWallet: Wallet;
  setCurrentWallet: Dispatch<React.SetStateAction<Wallet>>;
  backups: Backup[];
  setBackups: Dispatch<React.SetStateAction<Backup[]>>;
};

export const WalletContext = createContext<WalletProps>({
  currentDevice: undefined,
  setCurrentDevice: () => {},
  currentWallet: {currentIndex: 0, assets: {}},
  setCurrentWallet: () => {},
  backups: [],
  setBackups: () => {},
});

export const useWallet = () => {
  return useContext(WalletContext);
};

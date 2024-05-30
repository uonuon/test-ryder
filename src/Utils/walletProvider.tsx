import React, {useState} from 'react';
import {AssetList, Backup, Device, Wallet, WalletContext} from './walletContext';

const EMPTY_WALLET: Wallet = {
  currentIndex: 0,
  assets: {},
};

export const TOP3_ASSETS: AssetList = {
  stx: {accounts: []},
  btc: {accounts: []},
  eth: {accounts: []},
};

export const ALL_ASSETS: AssetList = {
  stx: {accounts: []},
  btc: {accounts: []},
  eth: {accounts: []},
  sol: {accounts: []},
  usdc: {accounts: []},
  polygon: {accounts: []},
  shib: {
    accounts: [],
  },
};

export const WalletProvider = ({children, wallet, device}) => {
  const [currentWallet, setCurrentWallet] = useState<Wallet>(wallet || EMPTY_WALLET);
  const [currentDevice, setCurrentDevice] = useState<Device | undefined>(device);
  const [backups, setBackups] = useState<Backup[]>([]);

  return (
    <WalletContext.Provider
      value={{
        currentWallet,
        setCurrentWallet,
        currentDevice,
        setCurrentDevice,
        backups,
        setBackups,
      }}>
      {children}
    </WalletContext.Provider>
  );
};

// Settings Context - src/context/Settings
import { StacksMainnet, StacksTestnet } from '@stacks/network';
import { createContext, useContext } from 'react';
import { StacksAccount, StacksProps } from '../../lib/stacks';
import { TransactionState } from './transactions';
import { AccountsApi, MempoolApi, TransactionsApi } from '@stacks/blockchain-api-client';

export const defaultNetwork = new StacksMainnet();
export const defaultAccount = {
  name: '',
  txState: TransactionState.NONE,
  totalUSD: 1802.32,
  txAmount: 0,
} as StacksAccount;

export const StacksContext = createContext<StacksProps>({
  network: defaultNetwork,
  setNetwork: () => {
    return;
  },
  currentAccount: defaultAccount,
  setCurrentAccount: () => {
    return;
  },
  recentTxs: [],
  setRecentTxs: () => {
    return;
  },
  pendingTxs: [],
  setPendingTxs: () => {
    return;
  },
  transactionsApi: new TransactionsApi(),
  mempoolApi: new MempoolApi(),
  accountsApi: new AccountsApi(),
});

export const useStacks = () => {
  return useContext(StacksContext);
};

import {StacksTransaction} from '@stacks/transactions';
import React, {useState} from 'react';
import {StacksContext, defaultAccount, defaultNetwork} from './stacksContext';

import {
  Configuration,
  TransactionsApi,
  MempoolApi,
  AccountsApi,
} from '@stacks/blockchain-api-client';
import {StacksNetwork} from '@stacks/network';

const mainnetApiBasePath = 'https://api.hiro.so';
const testnetApiBasePath = 'https://api.testnet.hiro.so';

export const StacksProvider = ({children, account}) => {
  const config = new Configuration({
    basePath: defaultNetwork.isMainnet() ? mainnetApiBasePath : testnetApiBasePath,
  });
  const [currentAccount, setCurrentAccount] = useState(account || defaultAccount);
  const [network, setNetwork] = useState(defaultNetwork);
  const [recentTxs, setRecentTxs] = useState<StacksTransaction[]>([]);
  const [pendingTxs, setPendingTxs] = useState<StacksTransaction[]>([]);
  const [transactionsApi, setTransactionsApi] = useState<TransactionsApi>(
    new TransactionsApi(config),
  );
  const [mempoolApi, setMempoolApi] = useState<MempoolApi>(new MempoolApi(config));
  const [accountsApi, setAccountsApi] = useState<AccountsApi>(new AccountsApi(config));
  return (
    <StacksContext.Provider
      value={{
        currentAccount,
        setCurrentAccount: (value) => {
          setRecentTxs([]);
          setPendingTxs([]);
          setCurrentAccount(value);
        },
        network,
        setNetwork: (value) => {
          const isMainnet = (value as any)?.isMainnet
            ? (value as StacksNetwork).isMainnet()
            : (value as (StacksNetwork) => StacksNetwork)(network).isMainnet();

          // change apis
          const config = new Configuration({
            basePath: isMainnet ? mainnetApiBasePath : testnetApiBasePath,
          });
          setTransactionsApi(new TransactionsApi(config));
          setMempoolApi(new MempoolApi(config));
          setAccountsApi(new AccountsApi(config));
          // change network
          setNetwork(value);
        },
        recentTxs,
        setRecentTxs,
        pendingTxs,
        setPendingTxs,
        transactionsApi,
        mempoolApi,
        accountsApi,
      }}>
      {children}
    </StacksContext.Provider>
  );
};

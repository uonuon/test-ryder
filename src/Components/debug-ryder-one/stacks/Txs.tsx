import React from 'react';

import { AddressTransaction } from '@stacks/blockchain-api-client';
import { TxId } from './TxId';

const Txs = ({txs: txs}: {txs: AddressTransaction[]}) => {
  return txs.map((tx: any, index: number) => {
    return <TxId key={index} txId={tx.tx.tx_id} />;
  });
};

export default Txs;

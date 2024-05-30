import React from 'react';

import { MempoolTransaction } from '../../../../lib/stacks';
import { TxId } from './TxId';

const PendingTxs = ({pendingTxs}: {pendingTxs: MempoolTransaction[]}) => {
  return pendingTxs.map((tx, index) => {
    return <TxId key={index} txId={tx.tx_id}/>
  });
};

export default PendingTxs;

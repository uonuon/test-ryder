import React from 'react';
import { Text } from 'react-native-paper';

export const TxId = ({txId}: {txId: string;}) => {
  return (
    <Text>
      {txId.length > 5 ? `${txId.substring(0, 6)}...${txId.substring(txId.length - 4)}` : txId}
    </Text>
  );
};

export type TransactionStateType = 'NONE' | 'SENDING' | 'RECEIVING' | 'CONFIRMED';

export const TransactionState = {
  NONE: 'NONE',
  SENDING: 'SENDING', // send to ryder one
  RECEIVING: 'RECEIVING', // receive from ryder one
  CONFIRMED: 'CONFIRMED',
};

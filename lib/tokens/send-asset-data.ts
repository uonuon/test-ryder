import {Dispatch} from 'react';
import {Token} from './tokens';

export type SendAssetData = {
  asset?: Token;
  sender?: string;
  amount?: number;
  recipient?: string;
  fees?: number;
  network?: string;
};

export type SendAssetProps = {
  sendAsset: SendAssetData;
  setSendAsset: Dispatch<React.SetStateAction<SendAssetData>>;
};

// Settings Context - src/context/Settings
import {createContext, useContext} from 'react';
import {SendAssetData, SendAssetProps} from '../../lib/tokens/send-asset-data';

export const defaultSendAssetData: SendAssetData = {};

export const SendAssetContext = createContext<SendAssetProps>({
  sendAsset: defaultSendAssetData,
  setSendAsset: () => {
    return;
  },
});

export const useSendAsset = () => {
  return useContext(SendAssetContext);
};

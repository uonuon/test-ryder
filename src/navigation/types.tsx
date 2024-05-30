import {StacksTransaction} from '@stacks/transactions';
import {Contact} from '../../lib/contacts/contacts';
import {SupportedAssets} from '../../lib/tokens/tokens';

export type RootStackParamList = {
  Welcome: undefined;
  ChooseAmount: {asset: SupportedAssets; recipient?: Contact; amount?: number; feeAmount?: number};
  QRCode: {asset: SupportedAssets; recipient?: Contact; amount?: number; feeAmount?: number};
  ChooseRecipient: {asset: SupportedAssets};
  ChooseToken: {mode?: 'tokenlist' | 'send'};
  FinalReview: {asset: SupportedAssets; recipient: Contact; amount: number; feeAmount?: number};
  FinalReviewApproval: {
    asset: SupportedAssets;
    recipient: Contact;
    amount: number;
    feeAmount: number;
    unsignedTx: StacksTransaction;
  };
  FinalReviewTxSent: {
    asset: SupportedAssets;
    recipient: Contact;
    amount: number;
    feeAmount: number;
  };
  TransactionDetails: {
    txid: string;
    asset: SupportedAssets;
    network: string;
    recipient?: Contact;
    amount?: number;
    feeAmount?: number;
  };
  WalletRyder: {};
  Step1: {mode: 'create' | 'recover'};
  Step2: {mode: 'create' | 'recover'};
  Step3: undefined;
  Step4: {ryderOneName: string};
  Step5: {ryderOneName: string};
  Step6: {ryderOneName: string};
  Step3RecoverFromApp: undefined;
  Step4RecoverFromApp: undefined;
  Step5RecoverFromApp: undefined;
  Step5Recover: {mode: 'create' | 'recover'};
  Step6Recover: undefined;
  StepFinal: {mode: 'create' | 'recover'};
  SettingsWallet: undefined;
  TokenList: undefined;
  AppPasscode: undefined;
  MainMenu: undefined;
  MainMenuRecover: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

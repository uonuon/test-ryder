import {NavigationContainer} from '@react-navigation/native';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {Platform, StatusBar} from 'react-native';
import {Appbar, MD3DarkTheme} from 'react-native-paper';
import NfcPromptAndroid from './Components/NfcPromptAndroid';
import Toast from './Components/Toast';
import CreateWalletScreen from './Screens/CreateWallet';
import CustomTransceiveScreen from './Screens/CustomTransceive';
import HomeScreen from './Screens/Home';
import LandingScreen from './Screens/Landing';
import NdefTypeListScreen from './Screens/NdefTypeList';
import NdefWriteScreen from './Screens/NdefWrite';
import SavedRecordScreen from './Screens/SavedRecord';
import SettingsScreen from './Screens/Settings';
import TagDetailScreen from './Screens/TagDetail';
import TagKitScreen from './Screens/TagKit';
import ToolKitScreen from './Screens/Toolkit';

import AppPasscode from './AppPasscode/screens/AppPasscode';
import MainMenu from './MainMenu/screens/MainMenu';
import MainMenuRecover from './MainMenuRecover/screens/MainMenuRecover';
import SelectorScreen from './P0Home/SelectorScreen';
import WalletRyder from './P0Home/screens/WalletRyder';
import Step1 from './P1Onboarding/Step1/screens/Step1';
import Step2 from './P1Onboarding/Step2/screens/Step2';
import Step3 from './P1Onboarding/Step3/screens/Step3';
import Step3RecoverFromApp from './P1Onboarding/Step3RecoverFromApp/screens/Step3RecoverFromApp';
import Step4 from './P1Onboarding/Step4/screens/Step4';
import Step4RecoverFromApp from './P1Onboarding/Step4RecoverFromApp/screens/Step4RecoverFromApp';
import Step5 from './P1Onboarding/Step5/screens/Step5';
import Step5RecoverFromApp from './P1Onboarding/Step5RecoverFromApp/screens/Step5RecoverFromApp';
import Step6 from './P1Onboarding/Step6/screens/Step6';
import StepFinal from './P1Onboarding/StepFinal/screens/StepFinal';
import ChooseAmount from './P2SendAsset/ChooseAmount/screens/ChooseAmount';
import ChooseRecipient from './P2SendAsset/ChooseRecipient/screens/ChooseRecipient';
import ChooseToken from './P2SendAsset/ChooseToken/screens/ChooseToken';
import ShowReceive from './P2SendAsset/ShowReceive/screens/ShowReceive';
import FinalReview from './P2SendAsset/FinalReview/screens/FinalReview';
import FinalReviewApproval from './P2SendAsset/FinalReviewApproval/screens/FinalReviewApproval';
import FinalReviewTxSent from './P2SendAsset/FinalReviewTxSent/screens/FinalReviewTxSent';
import TransactionDetails from './P2SendAsset/TransactionDetails/screens/TransactionDetails';
import AddRyderOneScreen from './Screens/AddRyderOne';
import CheckPermissions from './Screens/CheckPermissions';
import PickAnAvatar from './Screens/PickAvatar/PickAvatar';
import PickAName from './Screens/PickName';
import SelectRecipient from './Screens/SelectRecipient';
import SelectToken from './Screens/SelectToken';
import SendToken from './Screens/SendToken';
import TransactionPrepare from './Screens/TransactionPrepare';
import Wallet from './Screens/Wallet/Wallet';
import Wallet2 from './Screens/Wallet/Wallet2';
import Welcome from './Welcome/Screens/Welcome';
import QRCode from './P2SendAsset/ChooseAmount/screens/QRCode';

const MainStack = createStackNavigator();
function Main(props) {
  return (
    <MainStack.Navigator
      screenOptions={{
        header: (headerProps) => {
          const {navigation, back, options, route} = headerProps;
          const excludedScreens = [
            'Home',
            'NdefWrite',
            'CustomTransceive',
            'Welcome',
            'AppPasscode',
            // On boarding
            'MainMenu',
            'MainMenuRecover',
            'Step1',
            'Step2',
            'Step3',
            'Step4',
            'Step5',
            'Step6',
            'Step3RecoverFromApp',
            'Step4RecoverFromApp',
            'Step5RecoverFromApp',
            'Step5Recover',
            'Step6Recover',
            'StepFinal',
            // Home
            'Wallet2',
            'WalletRyder',
            'SettingsWallet',
            // Send Asset
            'ChooseToken',
            'ChooseRecipient',
            'ShowReceive',
            'ChooseAmount',
            'FinalReview',
            'FinalReviewApproval',
            'FinalReviewTxSent',
            'TransactionDetails',
            'TokenList',
            'QRCode',
          ];

          if (excludedScreens.findIndex((name) => name === route?.name) > -1) {
            return null;
          }

          return (
            <Appbar.Header style={{backgroundColor: 'white'}}>
              {back && <Appbar.BackAction onPress={() => navigation.goBack()} />}
              <Appbar.Content title={options?.title || ''} />
            </Appbar.Header>
          );
        },
      }}>
      <MainStack.Screen name="SelectorScreen" component={SelectorScreen} />
      <MainStack.Screen name="WalletRyder" component={WalletRyder} />
      {/* not used for demo
      <MainStack.Screen name="SettingsWallet" component={SettingsWallet} />
      */}
      <MainStack.Screen name="MainMenu" component={MainMenu} />
      <MainStack.Screen name="MainMenuRecover" component={MainMenuRecover} />

      <MainStack.Screen name="Home" component={HomeScreen} options={{title: 'HOME'}} />
      {/* onboarding asset */}
      <MainStack.Screen name="Welcome" component={Welcome} />
      {/* app pass code */}
      <MainStack.Screen name="AppPasscode" component={AppPasscode} />
      {/* new ryder */}
      <MainStack.Screen name="Step1" component={Step1} />
      <MainStack.Screen name="Step2" component={Step2} />
      <MainStack.Screen name="Step3" component={Step3} />
      <MainStack.Screen name="Step4" component={Step4} />
      <MainStack.Screen name="Step5" component={Step5} />
      <MainStack.Screen name="Step6" component={Step6} />
      <MainStack.Screen name="Step3RecoverFromApp" component={Step3RecoverFromApp} />
      <MainStack.Screen name="Step4RecoverFromApp" component={Step4RecoverFromApp} />
      <MainStack.Screen name="Step5RecoverFromApp" component={Step5RecoverFromApp} />
      <MainStack.Screen name="StepFinal" component={StepFinal} />
      {/* send asset */}
      <MainStack.Screen name="ChooseAmount" component={ChooseAmount} />
      <MainStack.Screen name="QRCode" component={QRCode} />
      <MainStack.Screen name="ChooseRecipient" component={ChooseRecipient} />
      <MainStack.Screen name="ShowReceive" component={ShowReceive} />
      <MainStack.Screen name="ChooseToken" component={ChooseToken} />
      <MainStack.Screen name="FinalReview" component={FinalReview} />
      <MainStack.Screen name="FinalReviewApproval" component={FinalReviewApproval} />
      <MainStack.Screen name="FinalReviewTxSent" component={FinalReviewTxSent} />
      <MainStack.Screen name="TransactionDetails" component={TransactionDetails} />

      <MainStack.Screen name="PickName" component={PickAName} options={{title: 'PICK A NAME'}} />
      <MainStack.Screen
        name="PickAvatar"
        component={PickAnAvatar}
        options={{title: 'PICK AN AVATAR'}}
      />
      <MainStack.Screen
        name="CheckPermissions"
        component={CheckPermissions}
        options={{title: 'CHECK PERMISSIONS'}}
      />
      <MainStack.Screen name="Wallet" component={Wallet} options={{title: 'RYDER APP'}} />
      <MainStack.Screen name="Wallet2" component={Wallet2} options={{title: 'RYDER APP'}} />
      <MainStack.Screen name="SendToken" component={SendToken} options={{title: 'SEND'}} />
      <MainStack.Screen name="SelectToken" component={SelectToken} options={{title: 'SEND'}} />
      <MainStack.Screen
        name="SelectRecipient"
        component={SelectRecipient}
        options={{title: 'SEND'}}
      />
      <MainStack.Screen
        name="TransactionPrepare"
        component={TransactionPrepare}
        options={{title: 'Transaction Summary'}}
      />
      <MainStack.Screen
        name="AddRyderOne"
        component={AddRyderOneScreen}
        options={{title: 'ADD RYDER ONE'}}
      />
      <MainStack.Screen
        name="TagDetail"
        options={{title: 'TAG DETAIL'}}
        component={TagDetailScreen}
      />
      <MainStack.Screen
        name="NdefTypeList"
        component={NdefTypeListScreen}
        options={{title: 'CHOOSE NDEF TYPE'}}
      />
      <MainStack.Screen
        name="NdefWrite"
        component={NdefWriteScreen}
        options={{title: 'WRITE NDEF'}}
      />
      <MainStack.Screen
        name="ToolKit"
        component={ToolKitScreen}
        options={{title: 'NFC TOOL KIT'}}
      />
      <MainStack.Screen name="TagKit" component={TagKitScreen} options={{title: 'NFC TAG KIT'}} />
      <MainStack.Screen
        name="CustomTransceive"
        component={CustomTransceiveScreen}
        options={{title: 'CUSTOM TRANSCEIVE'}}
      />
      <MainStack.Screen
        name="CreateWallet"
        component={CreateWalletScreen}
        options={{title: 'CREATE WALLET'}}
      />
      <MainStack.Screen
        name="SavedRecord"
        component={SavedRecordScreen}
        options={{title: 'MY SAVED RECORDS'}}
      />
    </MainStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function Settings(props) {
  return (
    <SettingsStack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        header: (headerProps) => {
          const {navigation, back, options, route} = headerProps;
          return (
            <>
              <Appbar.Header
                style={{
                  backgroundColor: 'white',
                  marginTop: Platform.OS === 'ios' ? 40 : 0,
                }}>
                {back && <Appbar.BackAction onPress={() => navigation.goBack()} />}
                <Appbar.Content title={options.title || ''} />
              </Appbar.Header>
            </>
          );
        },
      }}>
      <SettingsStack.Screen
        name="SettingsScreen"
        options={{title: 'Settings'}}
        component={SettingsScreen}
      />
    </SettingsStack.Navigator>
  );
}

const RootStack = createStackNavigator();

function Root(props) {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'modal',
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
      }}>
      <RootStack.Screen name="Landing" component={LandingScreen} />
      <RootStack.Screen name="CreateWallet" component={CreateWalletScreen} />
      <RootStack.Screen name="Main" component={Main} options={{animationEnabled: false}} />
    </RootStack.Navigator>
  );
}

function AppNavigator(props) {
  React.useEffect(() => {
    StatusBar.setBarStyle('light-content');
  }, []);
  return (
    <NavigationContainer theme={MD3DarkTheme}>
      <Root />
      <NfcPromptAndroid />
      <Toast />
    </NavigationContainer>
  );
}

export default AppNavigator;

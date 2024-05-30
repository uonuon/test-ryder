import './AppOutlets';
import * as React from 'react';
import {Platform, UIManager} from 'react-native';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import AppNavigator from './AppNavigator';
import * as AppContext from './AppContext';
import {AppLoggerProvider} from './context/AppendLoggerContext';
import {StacksProvider} from './Utils/stacksProvider';
import {WalletProvider} from './Utils/walletProvider';

const CustomDefaultTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3985cb',
  },
};

//if (typeof BigInt === 'undefined') global.BigInt = require('big-integer')

class App extends React.Component {
  constructor(props) {
    super();
    // explicitly create redux store
    // enable LayoutAnimation for Android
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  render() {
    return (
      <AppContext.Provider>
        <WalletProvider>
          <StacksProvider>
            <PaperProvider theme={CustomDefaultTheme}>
              <AppLoggerProvider>
                <AppNavigator />
              </AppLoggerProvider>
            </PaperProvider>
          </StacksProvider>
        </WalletProvider>
      </AppContext.Provider>
    );
  }
}

export default App;

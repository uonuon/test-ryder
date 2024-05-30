import {useEffect} from 'react';
import {useWallet} from '../Utils/walletContext';

const SelectorScreen = ({navigation}) => {
  const {currentWallet, currentDevice} = useWallet();
  useEffect(() => {
    navigation.replace(currentDevice === undefined ? 'Welcome' : 'WalletRyder', {});
  }, [currentDevice]);
  return null;
};

export default SelectorScreen;

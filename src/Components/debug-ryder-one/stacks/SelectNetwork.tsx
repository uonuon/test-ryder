import React from 'react';

import {StacksMainnet, StacksNetwork, StacksTestnet} from '@stacks/network';
import {Button} from 'react-native-paper';
import {useStacks} from '../../../Utils/stacksContext';

const SelectNetwork = ({
  onNetworkChanged,
}: {
  onNetworkChanged: (network: StacksNetwork) => void;
}) => {
  const {network, setNetwork} = useStacks();
  const toggleNetwork = () => {
    const newNetwork = network.isMainnet() ? new StacksTestnet() : new StacksMainnet();
    setNetwork(newNetwork);
    onNetworkChanged(newNetwork);
  };

  return (
    <Button mode="outlined" style={{marginVertical: 20}} onPress={toggleNetwork}>
      {network.isMainnet() ? 'Use Testnet' : 'Use Mainnet'}
    </Button>
  );
};
export default SelectNetwork;

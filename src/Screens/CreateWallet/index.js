import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import ScreenHeader from '../../Components/ScreenHeader';

function CreateWalletScreen(props) {
  const {params} = props.route;
  const {title} = params;

  return (
    <>
      <ScreenHeader title={title || 'CREATE_WALLET'} navigation={props.navigation} />
      <View style={[styles.wrapper]}>
        <Button>Create Wallet</Button>
        <SafeAreaView />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  actionBar: {
    padding: 10,
  },
});

export default CreateWalletScreen;

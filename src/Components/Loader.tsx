import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const Loader = () => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size={52} color="#6A63F5" />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    width: 52,
    height: 52,
    marginLeft: 65,
    marginRight: 65,
    marginTop: 35,
    marginBottom: 35,
    overflow: 'hidden',
  },
});

export default Loader;

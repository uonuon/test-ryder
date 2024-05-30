import * as React from 'react';
import {Image, StyleSheet} from 'react-native';

const RyderOneImage = () => {
  return (
    <Image
      style={styles.ryderOneIcon}
      resizeMode="cover"
      source={require('../../../../assets/ryder-one.png')}
    />
  );
};

const styles = StyleSheet.create({
  ryderOneIcon: {
    flex: 1,
    width: '100%',
    height: 151,
  },
});

export default RyderOneImage;

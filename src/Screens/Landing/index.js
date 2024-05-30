import React from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import * as AppContext from '../../AppContext';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function LandingScreen(props) {
  const opacityAnimValue = React.useRef(new Animated.Value(0)).current;
  const scaleAnimValue = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    async function initialize() {
      Animated.timing(opacityAnimValue, {
        duration: 1000,
        toValue: 1,
        useNativeDriver: true,
      }).start();

      await delay(1000);

      Animated.parallel([
        Animated.timing(opacityAnimValue, {
          duration: 350,
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start();

      await delay(350);

      await AppContext.Actions.initStorage();

      props.navigation.reset({
        index: 0,
        routes: [{name: 'Main'}],
      });
    }

    initialize();
  }, [props.navigation, opacityAnimValue, scaleAnimValue]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../../images/logo-white.png')}
        resizeMode="contain"
        style={[
          styles.image,
          {opacity: opacityAnimValue, transform: [{scale: scaleAnimValue}]},
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6A63F5',
  },
  image: {
    width: 250,
    height: 250,
    backgroundColor: 'transparent',
  },
});

export default LandingScreen;

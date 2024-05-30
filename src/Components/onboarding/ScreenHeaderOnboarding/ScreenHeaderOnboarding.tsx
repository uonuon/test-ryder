import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';

const ScreenheaderOnboarding = ({step, mode}: {step: number; mode: 'create' | 'recover'}) => {
  const {goBack} = useNavigation();
  const max = mode === 'recover' ? 5 : 6;
  return (
    <View style={[styles.buttoniconOnlyParent, styles.buttoniconParentSpaceBlock]}>
      <Pressable
        onPress={() => {
          goBack();
        }}
        style={[styles.buttoniconOnly, styles.textWrapperFlexBox]}>
        <Image
          style={styles.iconWrapper}
          resizeMode="cover"
          source={require('./assets/icon-wrapper.png')}
        />
      </Pressable>
      <View style={styles.rectangleParent}>
        {Array.from({length: max}, (_, key) => key).map((i) => (
          <View key={i} style={step === i + 1 ? styles.indicatorActive : styles.indicatorPassive} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttoniconParentSpaceBlock: {
    paddingHorizontal: 20,
    paddingVertical: 0,
  },
  textWrapperFlexBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 16,
    height: 16,
  },
  buttoniconOnly: {
    paddingVertical: 0,
    paddingRight: 20,
    height: 40,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  indicatorActive: {
    backgroundColor: '#7b61ff',
    width: 32,
    marginLeft: 6,
    height: 6,
    borderRadius: 100,
  },
  indicatorPassive: {
    width: 12,
    marginLeft: 6,
    backgroundColor: '#2b2b2b',
    height: 6,
    borderRadius: 100,
  },
  rectangleParent: {
    flexDirection: 'row',
  },
  buttoniconOnlyParent: {
    paddingVertical: 0,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});

export default ScreenheaderOnboarding;

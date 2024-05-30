import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

const ScreenHeader = ({title}: {title: string}) => {
  const {goBack, navigate} = useNavigation();
  return (
    <View style={styles.instanceParent}>
      <View style={[styles.iconWrapperParent, styles.wrapperSpaceBlock]}>
        <Pressable
          onPress={() => {
            goBack();
          }}>
          <Image
            style={styles.iconWrapper}
            resizeMode="cover"
            source={require('./assets/icon-wrapper.png')}
          />
        </Pressable>
        <Text style={[styles.settings, styles.labelTypo]}>{title}</Text>
        <Pressable
          onPress={() => {
            navigate('WalletRyder', {});
          }}>
          <Image
            style={styles.iconWrapper}
            resizeMode="cover"
            source={require('./assets/icon-wrapper1.png')}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapperSpaceBlock: {
    paddingVertical: 0,
    flexDirection: 'row',
  },
  labelTypo: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },

  iconWrapper: {
    height: 24,
    width: 24,
  },
  settings: {
    textAlign: 'left',
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: 14,
    color: '#fff',
  },
  iconWrapperParent: {
    paddingHorizontal: 12,
    paddingVertical: 0,
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  instanceParent: {
    paddingTop: 4,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
});

export default ScreenHeader;

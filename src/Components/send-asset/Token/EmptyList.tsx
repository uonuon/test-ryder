import * as React from 'react';
import {Text, StyleSheet, View, Image, Pressable} from 'react-native';

const EmptyList = () => {
  return (
    <View style={styles.noAssetsFoundParent}>
      <Text style={[styles.noAssetsFound, styles.searchTypo]}>No assets found</Text>
      <View style={[styles.buttonclassic2, styles.textWrapperFlexBox]}>
        <View style={[styles.textWrapper, styles.textWrapperFlexBox]}>
          <Text style={[styles.labelText2, styles.searchLayout]}>Receive assets</Text>
        </View>
        <Image
          style={styles.iconWrapper5}
          resizeMode="cover"
          source={require('./assets/arrow-down.png')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textWrapperFlexBox: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  searchTypo: {
    fontFamily: 'Poppins-Regular',
    textAlign: 'left',
  },
  searchLayout: {
    lineHeight: 16,
    letterSpacing: 0,
    fontSize: 14,
  },
  textWrapper: {
    paddingHorizontal: 8,
    paddingVertical: 0,
    alignItems: 'center',
  },
  noAssetsFound: {
    letterSpacing: 1,
    lineHeight: 24,
    fontSize: 16,
    color: '#fff',
  },
  labelText2: {
    color: '#fff',
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    textAlign: 'center',
  },
  iconWrapper5: {
    width: 16,
    height: 16,
  },
  buttonclassic2: {
    borderRadius: 16,
    borderColor: '#fff',
    height: 40,
    marginTop: 8,
    overflow: 'hidden',
    paddingVertical: 0,
    alignItems: 'center',
    paddingHorizontal: 12,
    borderWidth: 1,
    borderStyle: 'solid',
  },
  noAssetsFoundParent: {
    marginTop: 28,
    alignItems: 'center',
  },
});

export default EmptyList;

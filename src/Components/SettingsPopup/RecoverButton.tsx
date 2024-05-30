import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

const RecoverButton = () => {
  const {navigate} = useNavigation();
  return (
    <View style={styles.frameWrapper1}>
      <View style={[styles.frameParent13, styles.frameParentFlexBox]}>
        <View style={styles.iconWrapperParent}>
          <Image
            style={styles.iconLayout1}
            resizeMode="cover"
            source={require('./assets/icon-wrapper8.png')}
          />
          <Text style={[styles.recoverRyderOne, styles.text8Typo]}>Lost your Ryder One?</Text>
        </View>
        <Pressable
          style={[styles.buttonclassic13, styles.buttonclassicFlexBox]}
          onPress={() => {
            navigate('MainMenuRecover');
          }}>
          <View style={styles.buttonclassicFlexBox1}>
            <Text style={[styles.labelText23, styles.labelTypo1]}>Recover</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonclassicFlexBox1: {
    paddingHorizontal: 8,
    paddingVertical: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  labelTypo1: {
    color: '#131313',
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    letterSpacing: 0,
  },
  text8Typo: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
  },
  buttonclassicFlexBox: {
    height: 48,
    paddingVertical: 0,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 16,
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  frameParentFlexBox: {
    height: 80,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  iconLayout1: {
    height: 24,
    width: 24,
  },
  iconWrapperParent: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  recoverRyderOne: {
    marginLeft: 8,
    color: '#fff',
    lineHeight: 20,
    fontFamily: 'Poppins-Regular',
    textAlign: 'left',
    letterSpacing: 0,
  },
  labelText23: {
    lineHeight: 20,
    fontSize: 16,
  },
  buttonclassic13: {
    backgroundColor: '#fff',
  },
  frameParent13: {
    borderColor: '#4a4a4a',
  },
  frameWrapper1: {
    marginTop: 8,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
});

export default RecoverButton;

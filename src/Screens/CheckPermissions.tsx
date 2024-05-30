import React, {useRef, useEffect, useState} from 'react';
import {Image, StyleSheet, View, Text, TextInput} from 'react-native';
import {Border, FontSize, FontFamily, Color, Padding} from '../GlobalStyles';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {useNavigation} from '@react-navigation/native';
import OnboardingHeader from '../Components/OnBoardingHeader';
import PermissionItem from '../Components/PermissionItem';

const CheckPermissions = () => {
  const [name, setName] = useState('');
  const navigation = useNavigation();

  const active = name && name.length > 2;
  return (
    <View style={[styles.welcome, styles.welcomePosition]}>
      <View style={styles.frameParent}>
        <View style={styles.frameParent}>
          <OnboardingHeader step={3} navigationTarget="PickAvatar" />
          <View style={styles.rectangleGroupSpaceBlock}>
            <Text style={styles.pickAName}>Turn on permissions</Text>
            <Text style={[styles.thisNameOr, styles.labelTextLayout]}>
              Don’t worry, you can always change your preferences later.
            </Text>
          </View>
        </View>
        <View style={styles.frameGroup}>
          <PermissionItem />
        </View>
        <Pressable
          style={[styles.buttonActive, styles.buttonFlexBox]}
          onPress={() => {
            navigation.navigate('Wallet');
          }}>
          <View style={[styles.frameContainer, styles.buttonFlexBox]}>
            <View style={[styles.button, styles.q3BgActive]}>
              <Text style={[styles.labelText, styles.labelTextTypo]}>Continue</Text>
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frameGroup: {
    marginTop: 80,
    marginBottom: 40,
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  welcomePosition: {
    left: 0,
    position: 'absolute',
  },
  buttonFlexBox: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelTextLayout: {
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: FontSize.bodyMedium400_size,
  },
  rectangleGroupSpaceBlock: {
    marginTop: 40,
    alignSelf: 'stretch',
  },
  labelTextTypo: {
    fontFamily: FontFamily.bodyLarge500,
    fontWeight: '500',
  },
  q3Bg: {
    backgroundColor: Color.ghostwhite,
    paddingVertical: 0,
  },
  q3BgActive: {
    backgroundColor: Color.purple,
    paddingVertical: 0,
  },
  pickAName: {
    fontSize: FontSize.headlineSmall700_size,
    lineHeight: 32,
    fontWeight: '700',
    fontFamily: FontFamily.headlineSmall700,
    color: '#1a1a1a',
    textAlign: 'center',
  },
  thisNameOr: {
    fontFamily: FontFamily.bodyMedium400,
    color: '#707070',
    marginTop: 20,
    textAlign: 'left',
    alignSelf: 'stretch',
  },
  frameParent: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  rectangleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    color: Color.white,
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: FontSize.bodyMedium400_size,
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: Border.br_341xl,
    overflow: 'hidden',
    backgroundColor: Color.ghostwhite,
    alignSelf: 'stretch',
  },
  frameContainer: {
    marginTop: 40,
    alignSelf: 'stretch',
  },
  welcome: {
    height: 850,
    paddingHorizontal: Padding.p_xl,
    paddingTop: Padding.p_xl,
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: Color.whiteOverride,
    width: '100%',
  },
});

export default CheckPermissions;

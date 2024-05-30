import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import OnboardingHeader from '../../Components/OnBoardingHeader';
import {Border, Color, FontFamily, FontSize, Padding} from '../../GlobalStyles';
import AddButton from './AddButton';
import AvatarChooser from '../../Components/AvatarChooser';

const PickAnAvatar = () => {
  const [avatar, setAvatar] = useState<number | undefined>(undefined);
  const navigation = useNavigation();

  const selected = avatar !== undefined;
  return (
    <View style={[styles.welcome, styles.welcomePosition]}>
      <View style={styles.frameParent}>
        <View style={styles.frameParent}>
          <OnboardingHeader step={2} navigationTarget="PickName" />

          <View style={styles.rectangleGroupSpaceBlock}>
            <Text style={styles.pickAName}>Choose your avatar</Text>
            <Text style={[styles.thisNameOr, styles.labelTextLayout]}>
              Select an emoji and a background color or choose an image from your device.
            </Text>
          </View>
        </View>
        <View style={[styles.rectangleGroup, styles.rectangleGroupSpaceBlock]}>
          {avatar ? (
            <AvatarChooser />
          ) : (
            <AddButton
              onPress={() => {
                setAvatar(1);
              }}
            />
          )}
        </View>
        {selected && (
          <Pressable
            style={[styles.buttonFlexBox]}
            onPress={() => {
              navigation.navigate('CheckPermissions');
            }}>
            <View style={[styles.frameContainer, styles.buttonFlexBox]}>
              <View style={[styles.button, styles.q3BgActive]}>
                <Text style={[styles.labelText, styles.labelTextTypo]}>Continue</Text>
              </View>
            </View>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  welcomePosition: {
    left: 0,
    position: 'absolute',
  },
  buttonFlexBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
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
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelText: {
    color: Color.white,
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: FontSize.bodyMedium400_size,
    textAlign: 'center',
  },
  labelTextDisabled: {
    color: Color.lightsteelblue,
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
    alignSelf: 'stretch',
  },
  q: {
    right: '91.37%',
    left: '0%',
  },
  w: {
    right: '81.22%',
    left: '10.15%',
  },
  r: {
    right: '60.91%',
    left: '30.46%',
  },
  t: {
    right: '50.76%',
    left: '40.61%',
  },
  p: {
    left: '91.37%',
    right: '0%',
  },
  f: {
    right: '56.5%',
    left: '33.9%',
  },
  l: {
    left: '90.4%',
    right: '0%',
  },
  b: {
    right: '29.2%',
    left: '58.39%',
  },
  q3: {
    paddingVertical: 0,
    backgroundColor: Color.ghostwhite,
    flexDirection: 'row',
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

export default PickAnAvatar;

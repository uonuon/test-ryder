import React, {useRef, useEffect, useContext} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Border, FontSize, FontFamily, Color, Padding} from '../GlobalStyles';
import {useNavigation} from '@react-navigation/native';
import {useStacks} from '../Utils/stacksContext';
import OnboardingHeader from '../Components/OnBoardingHeader';

const PickAName = () => {
  const inputReference = useRef<TextInput | null>(null);
  const navigation = useNavigation();

  const {currentAccount, updateAccount} = useStacks();

  useEffect(() => {
    if (inputReference?.current) {
      inputReference.current.focus();
    }
  }, []);

  const active = currentAccount?.name && currentAccount.name.length > 2;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.welcome, styles.welcomePosition]}>
      <View style={[styles.wrapper, styles.frameParent]}>
        <View style={styles.frameParent}>
          <OnboardingHeader step={1} navigationTarget="Home" />
          <View style={styles.rectangleGroupSpaceBlock}>
            <Text style={styles.pickAName}>Pick a name</Text>
            <Text style={[styles.thisNameOr, styles.labelTextLayout]}>
              This name (or nickname) will be stored locally on your device and we cannot access it.
            </Text>
          </View>
        </View>
        <View style={[styles.rectangleGroup, styles.rectangleGroupSpaceBlock]}>
          <TextInput
            style={[styles.myNewRyder, styles.labelTextTypo]}
            placeholder="My New Ryder"
            autoFocus={true}
            ref={inputReference}
            onChangeText={(text) => updateAccount({name: text})}
          />
        </View>
        <View style={[styles.stretch]} />
        <Pressable
          style={[styles.buttonFlexBox]}
          onPress={() => {
            navigation.navigate('PickAvatar');
          }}>
          <View style={[styles.frameContainer, styles.buttonFlexBox]}>
            <View
              style={active ? [styles.button, styles.q3BgActive] : [styles.button, styles.q3Bg]}>
              <Text
                style={
                  active
                    ? [styles.labelText, styles.labelTextTypo]
                    : [styles.labelTextDisabled, styles.labelTextTypo]
                }>
                Continue
              </Text>
            </View>
          </View>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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
  wrapper: {
    flex: 1,
  },
  frameParent: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  myNewRyder: {
    fontSize: FontSize.bodyLarge500_size,
    letterSpacing: 1,
    color: Color.black,
    lineHeight: 24,
    textAlign: 'left',
    flex: 1,
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
  stretch: {
    height: '20%',
  },
  frameContainer: {
    alignSelf: 'stretch',
  },
  welcome: {
    height: 850,
    paddingHorizontal: Padding.p_xl,
    paddingTop: Padding.p_xl,
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
    width: '100%',
    backgroundColor: Color.whiteOverride,
  },
});

export default PickAName;

import React, {useState} from 'react';
import {KeyboardAvoidingView, StyleSheet, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BottomButton from '../../../Components/BottomButton';
import ScreenheaderOnboarding from '../../../Components/onboarding/ScreenHeaderOnboarding/ScreenHeaderOnboarding';

const Step3 = ({route, navigation}) => {
  const {navigate, goBack} = navigation;
  const [validName, setValidName] = useState(false);
  const [ryderOneName, setRyderOneName] = useState('');

  return (
    <SafeAreaView style={styles.companionAppTemplate}>
      <KeyboardAvoidingView behavior="height" style={styles.welcome}>
        <View style={styles.frameParent}>
          <View style={styles.frameGroup}>
            <View style={styles.frameContainer}>
              <ScreenheaderOnboarding step={3} mode={'create'} />
              <View style={styles.frameWrapper}>
                <View style={[styles.frameView, styles.frameViewSpaceBlock]}>
                  <View>
                    <Text style={[styles.step3, styles.step3Typo]}>Step 3</Text>
                    <Text style={styles.nameYourRyder}>Name your Ryder One</Text>
                  </View>
                  <Text style={[styles.thisNameWill, styles.step3Typo]}>
                    This name will be used for your Ryder App profile and Tapsafe Recovery backups.
                  </Text>
                </View>
              </View>
            </View>
            <View style={[styles.rectangleGroup, styles.frameViewSpaceBlock]}>
              <TextInput
                autoFocus={true}
                style={[styles.satoshiNakamoto, styles.labelTextTypo]}
                onChangeText={(newName) => {
                  setRyderOneName(newName);
                  setValidName(newName.length >= 3);
                }}
                value={ryderOneName}
                placeholder="Satoshi Nakamoto"
                placeholderTextColor="#4d4d4d"
                selectionColor="#fff"
                clearButtonMode="always"
              />
            </View>
          </View>
          <BottomButton
            onPress={() => {
              navigate('Step4', {ryderOneName});
            }}
            active={validName}
            label="Continue"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  frameViewSpaceBlock: {
    paddingVertical: 0,
    paddingHorizontal: 20,
  },
  step3Typo: {
    color: '#919191',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
  },
  labelTextTypo: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  step3: {
    textAlign: 'left',
  },
  nameYourRyder: {
    fontSize: 22,
    lineHeight: 28,
    marginTop: 4,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    textAlign: 'left',
    color: '#fff',
  },
  thisNameWill: {
    marginTop: 12,
    textAlign: 'left',
    alignSelf: 'stretch',
  },
  frameView: {
    alignSelf: 'stretch',
  },
  frameWrapper: {
    marginTop: 40,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  frameContainer: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  satoshiNakamoto: {
    letterSpacing: 1,
    lineHeight: 24,
    color: '#fff',
    padding: 10,
    textAlign: 'left',
    borderRadius: 8,
    flex: 1,
  },
  rectangleGroup: {
    marginTop: 80,
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
  },
  frameGroup: {
    height: 314,
    alignSelf: 'stretch',
    alignItems: 'center',
  },

  frameParent: {
    paddingBottom: 20,
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  welcome: {
    paddingTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden',
    flex: 1,
  },
  companionAppTemplate: {
    backgroundColor: '#131313',
    borderColor: '#404040',
    borderWidth: 0,
    height: 852,
    overflow: 'hidden',
    width: '100%',
    flex: 1,
    borderStyle: 'solid',
  },
});

export default Step3;

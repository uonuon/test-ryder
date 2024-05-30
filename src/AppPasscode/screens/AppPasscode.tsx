import React, { useEffect, useState } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getStoredAppPasscode, storeAppPasscode } from '../../../lib/storage';
import AppPasscodeInput from '../../Components/AppPasscodeInput';

const IGNORE_CHECK_PASSCODE = false;

const AppPasscode = ({ navigation }) => {
  const [createState, setCreateState] = useState(true);
  const [currentCode, setCurrentCode] = useState('');
  const [userCode, setUserCode] = useState<string>('');
  let storedUserCode: string | null = null;

  useEffect(() => {
    const f = async () => {
      //TODO: marvin: temporarily disabled pulling passcode from storage for user testing
      //storedUserCode = await getStoredAppPasscode();
      storedUserCode = null;
      setCreateState(storedUserCode === null);
      if (storedUserCode !== null) {
        setUserCode(storedUserCode);
      }
    };
    f();
  }, [setCreateState, setCurrentCode]);

  return (
    <SafeAreaView style={[styles.companionAppTemplate, styles.keyIconLayout]}>
      <KeyboardAvoidingView behavior="height" style={styles.welcome}>
        <View style={styles.frameParent}>
          <View style={[styles.buttoniconOnlyParent, styles.parentSpaceBlock]}>
            <View style={styles.buttoniconOnly}>
              <Image
                style={styles.iconWrapper}
                resizeMode="cover"
                source={require('../assets/icon-wrapper.png')}
              />
            </View>
          </View>
          <View style={[styles.frameGroup, styles.frameSpaceBlock]}>
            <View style={[styles.createAppPasscodeParent, styles.parentSpaceBlock]}>
              <Text style={[styles.createAppPasscode, styles.timeFlexBox]}>
                {createState ? 'Create app passcode' : 'Confirm security pin code'}
              </Text>
              <Text style={styles.thisPasscodeWill}>
                {createState ? 'This passcode will be required to unlock the application.' : '\n'}
              </Text>
            </View>
            <AppPasscodeInput
              currentCode={currentCode}
              setCurrentCode={(s: string) => {
                setCurrentCode(s);
              }}
              onChange={(code: string) => {
                if (createState) {
                  setUserCode(code);
                  setCurrentCode('');
                  setCreateState(false);
                } else {
                  if (IGNORE_CHECK_PASSCODE || userCode === code) {
                    setCurrentCode('');
                    Keyboard.dismiss();
                    storeAppPasscode(code).then(navigation.replace('MainMenu'));
                  } else {
                    setCurrentCode('');
                    if (storedUserCode === null) {
                      setUserCode('');
                      setCreateState(true);
                    }
                  }
                }
              }}
            />
          </View>
        </View>
        <View style={[styles.buttonclassicWrapper, styles.parentSpaceBlock]}>
          <View style={styles.buttonclassic}>
            <Image
              style={styles.buttoniconOnly1}
              resizeMode="cover"
              source={require('../assets/buttonicononly.png')}
            />
            <View style={styles.yourAppPasscodeIsStoredOnParent}>
              <Text style={[styles.yourAppPasscode, styles.whatIfITypo]}>
                Your app passcode is stored on your phone and we cannot access it.
              </Text>
              <Text style={[styles.whatIfI, styles.whatIfITypo]}>
                What if I lose my app passcode?
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  keyIconLayout: {
    width: '100%',
    overflow: 'hidden',
  },
  timeFlexBox: {
    textAlign: 'left',
    color: '#fff',
  },
  parentSpaceBlock: {
    paddingVertical: 0,
    paddingHorizontal: 20,
  },
  frameSpaceBlock: {
    marginTop: 40,
    alignSelf: 'stretch',
  },
  whatIfITypo: {
    lineHeight: 16,
    fontSize: 12,
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    alignSelf: 'stretch',
  },
  // rowPosition: {
  //   height: 46,
  //   left: 6,
  //   right: 6,
  //   flexDirection: 'row',
  //   position: 'absolute',
  // },
  // labelTypo: {
  //   width: 123,
  //   fontFamily: 'SF Pro Text',
  //   fontWeight: '700',
  //   letterSpacing: 2,
  //   fontSize: 10,
  //   top: '61.9%',
  //   height: '28.57%',
  //   textAlign: 'center',
  //   color: '#fff',
  //   left: 0,
  //   position: 'absolute',
  // },
  // letterPosition: {
  //   height: 26,
  //   marginTop: -21,
  //   fontFamily: 'SF Pro Display',
  //   fontSize: 25,
  //   top: '50%',
  //   width: 123,
  //   letterSpacing: 0,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   textAlign: 'center',
  //   color: '#fff',
  //   left: 0,
  //   position: 'absolute',
  // },
  // keycontainerShadowBox: {
  //   shadowOpacity: 1,
  //   elevation: 0,
  //   shadowRadius: 0,
  //   shadowOffset: {
  //     width: 0,
  //     height: 1,
  //   },
  //   shadowColor: 'rgba(0, 0, 0, 0.3)',
  //   backgroundColor: '#6f6f70',
  //   borderRadius: 5,
  //   left: '0%',
  //   bottom: '0%',
  //   right: '0%',
  //   top: '0%',
  //   height: '100%',
  //   position: 'absolute',
  //   width: '100%',
  // },
  // keyFlexBox: {
  //   marginLeft: 5,
  //   alignSelf: 'stretch',
  //   flex: 1,
  // },
  // time: {
  //   fontSize: 15,
  //   fontWeight: '600',
  //   fontFamily: 'Poppins-SemiBold',
  // },
  // timeStyle: {
  //   top: 10,
  //   flexDirection: 'row',
  //   left: 0,
  // },
  // lensIcon: {
  //   width: 11,
  //   height: 11,
  // },
  // dynamicIsland: {
  //   left: 114,
  //   borderRadius: 37,
  //   backgroundColor: '#000',
  //   width: 124,
  //   justifyContent: 'flex-end',
  //   paddingTop: 13,
  //   paddingRight: 12,
  //   paddingBottom: 13,
  //   top: 0,
  //   flexDirection: 'row',
  //   position: 'absolute',
  // },
  iconWrapper: {
    width: 16,
    height: 16,
  },
  buttoniconOnly: {
    height: 32,
    paddingHorizontal: 0,
    justifyContent: 'flex-start',
    paddingVertical: 0,
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  buttoniconOnlyParent: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  createAppPasscode: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },
  thisPasscodeWill: {
    fontSize: 14,
    lineHeight: 20,
    color: '#919191',
    marginTop: 12,
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    letterSpacing: 0,
    alignSelf: 'stretch',
  },
  createAppPasscodeParent: {
    alignSelf: 'stretch',
  },
  frameGroup: {
    alignItems: 'center',
  },
  frameParent: {
    alignSelf: 'stretch',
    alignItems: 'center',
    flexGrow: 1,
  },
  buttoniconOnly1: {
    height: 24,
    width: 24,
    overflow: 'hidden',
  },
  yourAppPasscode: {
    color: '#f9b332',
  },
  whatIfI: {
    textDecorationLine: 'underline',
    marginTop: 4,
    color: '#fff',
    fontSize: 12,
  },
  yourAppPasscodeIsStoredOnParent: {
    marginLeft: 4,
    flex: 1,
  },
  buttonclassic: {
    borderRadius: 8,
    backgroundColor: '#200d01',
    borderColor: '#673200',
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'stretch',
    borderWidth: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    borderStyle: 'solid',
  },
  buttonclassicWrapper: {
    alignSelf: 'stretch',
    alignItems: 'center',
    flexGrow: 1,
  },
  // homeIndicator: {
  //   marginLeft: -67,
  //   bottom: 8,
  //   width: 134,
  //   height: 5,
  //   borderRadius: 100,
  //   backgroundColor: '#fff',
  //   left: '50%',
  //   position: 'absolute',
  // },
  // homeindicator: {
  //   bottom: 0,
  //   height: 34,
  //   left: 0,
  // },
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
    borderWidth: 0,
    // height: 852,
    overflow: 'hidden',
    flex: 1,
    borderColor: '#404040',
    borderStyle: 'solid',
    width: '100%',
  },
});

export default AppPasscode;

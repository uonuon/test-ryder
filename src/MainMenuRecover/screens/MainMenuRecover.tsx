import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {Text, StyleSheet, View, Image, Pressable} from 'react-native';

const MainMenuRecover = ({navigation}) => {
  const {navigate, goBack} = navigation;
  return (
    <View style={styles.companionAppTemplate}>
      <View style={styles.welcome}>
        <Pressable
          style={[styles.buttoniconOnlyParent, styles.parentSpaceBlock]}
          onPress={() => goBack()}>
          <Image
            style={styles.buttoniconOnly}
            resizeMode="cover"
            source={require('../assets/buttonicononly.png')}
          />
        </Pressable>
        <View style={styles.frameFlexBox}>
          <View style={[styles.selectAPreferredMethodParent, styles.parentSpaceBlock]}>
            <Text style={[styles.selectAPreferred, styles.labelTextTypo]}>
              Select a recovery method
            </Text>
          </View>
          <View style={[styles.frameGroup, styles.frameFlexBox]}>
            <View style={[styles.buttonclassic, styles.buttonclassicFlexBox]}>
              <View style={styles.buttonclassicFlexBox}>
                <Text style={[styles.labelText, styles.labelTextLayout]}>Fast and secure</Text>
              </View>
            </View>
            <Pressable
              style={styles.frameSpaceBlock}
              onPress={() => {
                navigate('Step1', {mode: 'recover'});
              }}>
              <View style={styles.tapsafeRecoveryParent}>
                <Text style={[styles.tapsafeRecovery, styles.tapsafeRecoveryFlexBox]}>
                  Tapsafe Recovery
                </Text>
                <Text style={[styles.recoverYourWallet, styles.labelTextLayout]}>
                  Recover your wallet using your personal backups, friends and family.
                </Text>
              </View>
              <Image
                style={styles.frameIcon}
                resizeMode="cover"
                source={require('../assets/frame-26085700.png')}
              />
            </Pressable>
            <Pressable style={[styles.frameView, styles.frameSpaceBlock]}>
              <View style={styles.tapsafeRecoveryParent}>
                <Text style={[styles.tapsafeRecovery, styles.tapsafeRecoveryFlexBox]}>
                  Seed phrase
                </Text>
                <Text style={[styles.recoverYourWallet, styles.labelTextLayout]}>
                  Recover your wallet using a 12, 18 or 24 words seed phrase.
                </Text>
              </View>
              <Image
                style={styles.paperBackupIcon}
                resizeMode="cover"
                source={require('../assets/paper-backup.png')}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentSpaceBlock: {
    paddingVertical: 0,
    paddingHorizontal: 20,
  },
  labelTextTypo: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  tapsafeRecoveryFlexBox: {
    textAlign: 'left',
    color: '#fff',
  },
  frameFlexBox: {
    marginTop: 40,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  labelTextLayout: {
    lineHeight: 16,
    fontSize: 12,
  },
  frameSpaceBlock: {
    paddingHorizontal: 16,
    height: 138,
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    alignSelf: 'stretch',
    paddingVertical: 20,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  buttonclassicFlexBox: {
    paddingHorizontal: 4,
    justifyContent: 'center',
    paddingVertical: 0,
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttoniconOnly: {
    height: 24,
    width: 24,
    overflow: 'hidden',
  },
  buttoniconOnlyParent: {
    height: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  selectAPreferred: {
    fontSize: 22,
    lineHeight: 28,
    textAlign: 'left',
    color: '#fff',
  },
  selectAPreferredMethodParent: {
    alignSelf: 'stretch',
    zIndex: 0,
  },
  tapsafeRecovery: {
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  recoverYourWallet: {
    width: 181,
    marginTop: 16,
    textAlign: 'left',
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  tapsafeRecoveryParent: {
    zIndex: 0,
  },
  frameIcon: {
    top: 25,
    left: 216,
    width: 177,
    height: 121,
    zIndex: 1,
    position: 'absolute',
  },
  paperBackupIcon: {
    top: 24,
    left: 222,
    width: 182,
    height: 122,
    zIndex: 1,
    position: 'absolute',
    overflow: 'hidden',
  },
  frameView: {
    marginTop: 20,
  },
  frameGroup: {
    zIndex: 1,
    paddingVertical: 0,
    paddingHorizontal: 20,
  },
  labelText: {
    color: '#d1d4ff',
    letterSpacing: 0,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    textAlign: 'center',
  },
  buttonclassic: {
    top: -12,
    left: 225,
    backgroundColor: '#342f75',
    borderColor: '#573ccd',
    zIndex: 2,
    borderRadius: 16,
    paddingHorizontal: 4,
    height: 24,
    borderWidth: 1,
    borderStyle: 'solid',
    position: 'absolute',
    overflow: 'hidden',
  },
  welcome: {
    paddingVertical: 20,
    paddingHorizontal: 0,
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden',
    flex: 1,
  },
  companionAppTemplate: {
    backgroundColor: '#131313',
    width: '100%',
    height: 844,
    overflow: 'hidden',
    flex: 1,
  },
});

export default MainMenuRecover;

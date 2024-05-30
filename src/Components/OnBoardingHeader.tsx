import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {Border, Color, Padding} from '../GlobalStyles';

const steps = [1, 2, 3];
const OnboardingHeader = ({
  step,
  navigationTarget,
}: {
  step: number;
  navigationTarget: string;
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerParent}>
      <View style={[styles.header, styles.headerFlexBox]}>
        <Pressable
          onPress={() => {
            navigation.navigate(navigationTarget);
          }}>
          <View style={styles.iconWrapper}>
            <Image
              style={styles.leftIcon}
              resizeMode="cover"
              source={
                step === 1
                  ? require('../../assets/x.png')
                  : require('../../assets/chevronleft.png')
              }
            />
          </View>
        </Pressable>
      </View>
      <View style={styles.iconWrapper}>
        {steps.map((s: number) =>
          s === step ? (
            <View key={s} style={[styles.frameChild, styles.frameLayout]} />
          ) : (
            <View key={s} style={[styles.frameItem, styles.frameLayout]} />
          ),
        )}
      </View>
      {/* icon right not shown */}
      <View style={[styles.rightIcon, styles.buttonIconLayout]}>
        <View style={styles.iconWrapper}>
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require('../../assets/icon.png')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerFlexBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  frameLayout: {
    height: 6,
    borderRadius: Border.br_81xl,
  },
  buttonIconLayout: {
    height: 40,
    borderRadius: Border.br_341xl,
    overflow: 'hidden',
  },

  leftIcon: {
    height: 24,
    width: 24,
    overflow: 'hidden',
  },
  iconWrapper: {
    flexDirection: 'row',
  },
  header: {
    backgroundColor: Color.whitesmoke,
    height: 40,
    borderRadius: Border.br_341xl,
    overflow: 'hidden',
    width: 40,
  },
  frameChild: {
    marginLeft: 6,
    width: 50,
    backgroundColor: Color.mediumslateblue,
  },
  frameItem: {
    marginLeft: 6,
    width: 20,
    backgroundColor: Color.gainsboro,
  },
  icon: {
    height: 20,
    width: 20,
    overflow: 'hidden',
  },
  rightIcon: {
    opacity: 0,
    backgroundColor: Color.black,
    width: 40,
    height: 40,
    borderRadius: Border.br_341xl,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerParent: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 48,
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
});

export default OnboardingHeader;

import * as React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {Border, Color, FontFamily, FontSize, StyleVariable} from '../GlobalStyles';

const AvatarChooser = () => {
  return (
    <View style={styles.iconButtonGroup}>
      <View style={[styles.iconButton2, styles.iconLayout]}>
        <View style={styles.iconwrapper}>
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require('../../assets/pencil.png')}
          />
        </View>
      </View>
      <View style={styles.wrapper}>
        <Image source={require('../../assets/wallatar.png')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    height: 40,
    width: 40,
    borderRadius: Border.br_341xl,
    alignItems: 'center',
    overflow: 'hidden',
  },

  buttonFlexBox1: {
    paddingVertical: 0,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  labelTypo: {
    fontFamily: FontFamily.labelLarge500,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: FontSize.bodyMedium400_size,
    textAlign: 'center',
  },
  iconwrapper: {
    flexDirection: 'row',
  },
  iconButton: {
    justifyContent: 'center',
    backgroundColor: Color.neutralSolid3,
  },
  icon: {
    height: 20,
    width: 20,
    overflow: 'hidden',
  },
  iconButton2: {
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowRadius: 6,
    elevation: 6,
    shadowOpacity: 1,
    zIndex: 1,
    justifyContent: 'center',
    backgroundColor: Color.neutralSolid3,
  },
  wrapper: {
    backgroundColor: Color.singaporeSolid7,
    width: 104,
    height: 104,
    padding: 10,
    zIndex: 0,
    marginTop: -28,
    borderRadius: Border.br_81xl,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  iconButtonGroup: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 200,
  },
  labelText: {
    color: Color.whiteOverride,
  },
  button: {
    height: 48,
    paddingHorizontal: StyleVariable.classicButtonsPaddingNoIcon,
    paddingVertical: 0,
    backgroundColor: Color.singaporeSolid9,
    justifyContent: 'center',
    borderRadius: Border.br_341xl,
    overflow: 'hidden',
  },
  frameGroup: {
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
});

export default AvatarChooser;

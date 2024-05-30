import * as React from 'react';
import {Image, StyleSheet, View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Border, Padding, StyleVariable, FontFamily, FontSize, Color} from '../GlobalStyles';

const PermissionItem = () => {
  return (
    <View style={styles.buttonParent}>
      <View style={[styles.button, styles.buttonFlexBox]}>
        <View style={styles.iconwrapperParent}>
          <View style={styles.iconwrapper}>
            <Image
              style={styles.chevronLeftIcon}
              resizeMode="cover"
              source={require('../../images/nfc-512.png')}
            />
          </View>
          <View style={styles.labelTextParent}>
            <Text style={[styles.labelText, styles.labelTypo2]}>NFC</Text>
            <Text style={[styles.labelText1, styles.labelTypo]}>Enabled!</Text>
          </View>
        </View>
        <View style={styles.iconLayout}>
          <LinearGradient
            style={[styles.shape, styles.shapePosition]}
            locations={[0, 1]}
            colors={['#8075ff', '#6558ff']}
            useAngle={true}
            angle={90}
          />
          <Image
            style={[styles.shapeIcon, styles.shapeIconLayout]}
            resizeMode="cover"
            source={require('../../assets/shape.png')}
          />
        </View>
      </View>
      <View style={[styles.labelTextWrapper, styles.labelSpaceBlock]}>
        <Text style={[styles.labelText2, styles.labelTypo1]}>Scan wallets and send assets</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    height: 40,
    width: 40,
  },
  buttonFlexBox: {
    paddingRight: Padding.p_base,
    paddingLeft: StyleVariable.classicButtonsPaddingNoIcon,
    height: 56,
    borderRadius: Border.br_341xl,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },
  labelTypo2: {
    fontFamily: FontFamily.titleSmall500,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: FontSize.bodyMedium400_size,
    textAlign: 'center',
  },
  labelTypo: {
    marginTop: 8,
    lineHeight: 16,
    fontSize: FontSize.bodySmall400_size,
    fontFamily: FontFamily.bodySmall400,
    textAlign: 'center',
  },
  shapePosition: {
    borderRadius: 13,
    left: '8.33%',
    bottom: '25%',
    right: '8.33%',
    top: '25%',
    width: '83.33%',
    height: '50%',
    position: 'absolute',
  },
  shapeIconLayout: {
    maxHeight: '100%',
    maxWidth: '100%',
    bottom: '33.33%',
    top: '33.33%',
    width: '33.33%',
    height: '33.33%',
    overflow: 'hidden',
    position: 'absolute',
  },
  labelSpaceBlock: {
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: 0,
    marginTop: 8,
    flexDirection: 'row',
  },
  labelTypo1: {
    lineHeight: 16,
    fontSize: FontSize.bodySmall400_size,
    color: Color.blackOverride,
    textAlign: 'left',
    fontFamily: FontFamily.bodySmall400,
  },
  chevronLeftIcon: {
    height: 24,
    width: 24,
    overflow: 'hidden',
  },
  iconwrapper: {
    flexDirection: 'row',
  },
  icon: {
    height: 20,
    width: 20,
    overflow: 'hidden',
  },
  labelText: {
    color: Color.purple13,
    alignSelf: 'flex-start',
  },
  labelText1: {
    color: Color.singaporeSolid12,
    alignSelf: 'flex-start',
  },
  labelTextParent: {
    marginLeft: 8,
    justifyContent: 'center',
  },
  iconwrapperParent: {
    width: 176,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  shape: {
    backgroundColor: 'transparent',
  },
  shapeIcon: {
    right: '16.67%',
    left: '50%',
  },
  button: {
    backgroundColor: Color.singaporeSolid4,
  },
  labelText2: {
    color: Color.blackOverride,
  },
  labelTextWrapper: {
    paddingVertical: 0,
  },
  buttonParent: {
    alignSelf: 'stretch',
  },
});

export default PermissionItem;

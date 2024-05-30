import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {Border, Color, FontFamily, FontSize} from '../GlobalStyles';
import {useStacks} from '../Utils/stacksContext';

const IdCard = ({isNew}: {isNew: boolean}) => {
  const {currentAccount} = useStacks();
  const {totalUSD} = currentAccount;
  const totalFullUSD = Math.floor(totalUSD);
  const totalCents = Math.round((totalUSD - totalFullUSD) * 100);
  return (
    <View style={[styles.idCard, styles.idCardLayout]}>
      <View style={[styles.wrapper, styles.iconPosition]}>
        <ImageBackground
          style={[styles.icon, styles.iconSpaceBlock]}
          resizeMode="cover"
          source={require('../../assets/rectangle.png')}>
          <Image
            style={[styles.frameChild, styles.iconPosition]}
            resizeMode="cover"
            source={require('../../assets/frame-26085557.png')}
          />
          <View style={[styles.totalBalanceUsdParent, styles.frameParentPosition]}>
            <Text style={[styles.totalBalanceUsd, styles.textClr]}>TOTAL BALANCE (USD)</Text>
            <View style={[styles.parent, styles.parentFlexBox]}>
              <Text style={styles.textClr}>
                {isNew ? (
                  <>
                    <Text style={[styles.text1, styles.text1Typo]}>$--</Text>
                    <Text style={styles.text2}>.--</Text>
                  </>
                ) : (
                  <>
                    <Text style={[styles.text1, styles.text1Typo]}>${totalFullUSD}</Text>
                    <Text style={styles.text2}>.{totalCents}</Text>
                  </>
                )}
              </Text>
              <View style={styles.iconwrapper}>
                <Image
                  style={styles.eyeIcon}
                  resizeMode="cover"
                  source={require('../../assets/eye.png')}
                />
              </View>
            </View>
          </View>
          <View style={[styles.frameContainer, styles.frameParentPosition]}>
            <View>
              <ImageBackground
                style={styles.frameItem}
                resizeMode="cover"
                source={require('../../assets/wallatar.png')}
              />

              <Text style={[styles.name, styles.nameSpaceBox]}>{currentAccount.name}</Text>
            </View>
          </View>
          {isNew ? (
            <Image
              style={[styles.ryderOneShapeIcon, styles.iconPosition]}
              resizeMode="cover"
              source={require('../../assets/ryder-one-shape.png')}
            />
          ) : (
            <Image
              style={[styles.ryderOneIcon, styles.iconPosition]}
              resizeMode="cover"
              source={require('../../assets/ryder-one.png')}
            />
          )}
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frameParentPosition: {
    left: 20,
    position: 'absolute',
  },
  parentFlexBox: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  idCardLayout: {
    height: 200,
    width: 350,
  },
  iconPosition: {
    top: '50%',
    position: 'absolute',
  },
  iconSpaceBlock: {
    marginLeft: -175,
    marginTop: -100,
  },
  textClr: {
    color: Color.whiteOverride,
    textAlign: 'left',
    lineHeight: 26,
    letterSpacing: 0,
  },
  text1Typo: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
  },
  nameSpaceBox: {
    marginTop: 8,
    textAlign: 'left',
    fontFamily: FontFamily.bodySmall400,
  },
  rectangleIcon: {
    marginLeft: -175,
    marginTop: -100,
    height: 200,
    width: 350,
    left: '50%',
  },
  frameChild: {
    width: 300,
    opacity: 0.2,
    marginTop: -100,
    top: '50%',
    height: 200,
    left: 0,
  },
  totalBalanceUsd: {
    fontSize: 10,
    fontFamily: FontFamily.bodySmall400,
  },
  text1: {
    fontSize: 26,
  },
  text2: {
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.bodySmall400,
  },
  eyeIcon: {
    width: 20,
    height: 20,
    overflow: 'hidden',
  },
  iconwrapper: {
    marginLeft: 16,
    flexDirection: 'row',
  },
  parent: {
    marginTop: 4,
  },
  totalBalanceUsdParent: {
    top: 135,
  },
  frameItem: {
    borderRadius: 71,
    width: 44,
    height: 44,
    overflow: 'hidden',
  },
  name: {
    fontSize: FontSize.size_xl,
    color: Color.whiteOverride,
    textAlign: 'left',
    lineHeight: 24,
    letterSpacing: 0,
  },
  frameContainer: {
    top: 20,
  },
  ryderOneIcon: {
    marginTop: -75,
    left: 216,
    width: 112,
    height: 148,
  },
  ryderOneShapeIcon: {
    marginTop: -75,
    left: 216,
    width: 112,
    height: 148,
  },
  icon: {
    height: '100%',
    backgroundColor: 'transparent',
    borderRadius: Border.br_base,
    overflow: 'hidden',
    width: '100%',
  },
  wrapper: {
    height: 200,
    width: 350,
    left: '50%',
  },
  idCard: {
    borderRadius: Border.br_base,
    overflow: 'hidden',
  },
  frameParent: {
    top: 51,
  },
});

export default IdCard;

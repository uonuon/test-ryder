import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Border, Color, FontFamily, FontSize} from '../GlobalStyles';

const AppHeader = ({
  title,
  showSteps,
  step,
}: {
  title: string;
  showSteps: boolean;
  step?: number;
}) => {
  const steps = [1, 2, 3];
  console.log('app-header', new Date());
  return (
    <View style={styles.frameWrapper}>
      <View style={styles.headerParent}>
        <Image
          style={styles.leftIcon}
          resizeMode="cover"
          source={
            showSteps
              ? require('../../assets/chevronleft.png')
              : require('../../assets/usercircle.png')
          }
        />
        <Text style={[styles.transactionSummary, styles.transactionSummaryClr]}>
          {title}
        </Text>
        {showSteps ? (
          <View style={[styles.rectangleParent, styles.rightIconPosition]}>
            {steps.map((s: number) =>
              s === step ? (
                <View key={s} style={[styles.frameStep, styles.frameLayout]} />
              ) : (
                <View key={s} style={[styles.frameItem, styles.frameLayout]} />
              ),
            )}
          </View>
        ) : (
          <Image
            style={styles.rightIcon}
            resizeMode="cover"
            source={require('../../assets/settings.png')}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rightIconPosition: {
    right: 0,
    position: 'absolute',
  },
  transactionSummaryClr: {
    color: Color.neutral13,
    letterSpacing: 0,
  },
  frameLayout: {
    marginLeft: 6,
    height: 6,
    borderRadius: Border.br_81xl,
  },
  right: {
    top: 13,
    left: 281,
    flexDirection: 'row',
    position: 'absolute',
  },
  leftIcon: {
    height: 24,
    width: 24,
    left: 0,
    top: 0,
    position: 'absolute',
    overflow: 'hidden',
  },
  rightIcon: {
    height: 24,
    width: 24,
    left: 326,
    top: 0,
    position: 'absolute',
    overflow: 'hidden',
  },

  transactionSummary: {
    lineHeight: 24,
    textAlign: 'center',
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
    fontSize: FontSize.bodySmall400_size,
    color: Color.blackOverride,
    letterSpacing: 0,
  },
  frameItem: {
    width: 6,
    borderRadius: Border.br_81xl,
    backgroundColor: Color.neutralSolid6,
    marginLeft: 6,
  },
  frameStep: {
    backgroundColor: Color.singaporeSolid9,
    width: 20,
  },
  rectangleParent: {
    marginTop: -3,
    top: '50%',
    flexDirection: 'row',
  },
  headerParent: {
    height: 24,
    width: 350,
    justifyContent: 'space-between',
  },
  frameWrapper: {
    zIndex: 0,
    height: 24,
    marginTop: 48,
    marginBottom: 20,
  },
});

export default AppHeader;

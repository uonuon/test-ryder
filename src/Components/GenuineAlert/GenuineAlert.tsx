import * as React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const GenuineAlert = () => {
  return (
    <View style={[styles.alert, styles.alertFlexBox]}>
      <View style={styles.iconWrapperParent}>
        <Image
          style={styles.iconWrapper}
          resizeMode="cover"
          source={require('./assets/genuine.png')}
        />
        <View style={styles.message}>
          <Text style={[styles.yourRyderOne, styles.labelTextLayout]}>
            Your Ryder One is genuine
          </Text>
          <Text style={[styles.whatDoesThis, styles.thisFlexBox]}>What does this mean?</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  thisFlexBox: {
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    alignSelf: 'stretch',
  },
  alertFlexBox: {
    overflow: 'hidden',
    borderRadius: 8,
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  labelTextLayout: {
    lineHeight: 20,
    letterSpacing: 0,
  },
  iconWrapper: {
    width: 24,
    height: 24,
  },
  yourRyderOne: {
    fontSize: 14,
    letterSpacing: 0,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    color: '#fff',
  },
  whatDoesThis: {
    fontSize: 12,
    textDecorationLine: 'underline',
    lineHeight: 16,
    marginTop: 4,
    color: '#fff',
  },
  message: {
    marginLeft: 12,
    justifyContent: 'center',
    flex: 0,
  },
  iconWrapperParent: {
    paddingLeft: 8,
    paddingTop: 12,
    paddingBottom: 12,
    flexDirection: 'row',
    flex: 1,
  },
  alert: {
    backgroundColor: '#2b2c60',
    borderStyle: 'solid',
    borderColor: '#3f41ab',
    borderWidth: 1,
    flexDirection: 'row',
  },
});

export default GenuineAlert;

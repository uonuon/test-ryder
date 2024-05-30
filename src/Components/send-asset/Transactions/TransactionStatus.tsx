import * as React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const TransactionStatus = ({mode}: {mode: 'sending' | 'sent'}) => {
  return (
    <View
      style={[
        styles.labelsending,
        styles.labelsendingFlexBox,
        mode === 'sending' ? styles.sendingColors : styles.sentColors,
      ]}>
      <Image
        style={styles.iconWrapperLayout}
        resizeMode="cover"
        source={
          mode === 'sending'
            ? require('./assets/sending-icon.png')
            : require('./assets/icon-wrapper4.png')
        }
      />
      <View style={styles.labelsendingFlexBox}>
        <Text
          style={[
            styles.labelText,
            styles.settingsTypo,
            mode === 'sending' ? styles.sendingTextColor : styles.sentTextColor,
          ]}>
          {mode === 'sending' ? 'Sending' : 'Sent'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  settingsTypo: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    letterSpacing: 0,
  },
  iconWrapperLayout: {
    height: 16,
    width: 16,
  },
  labelsendingFlexBox: {
    paddingHorizontal: 4,
    justifyContent: 'center',
    paddingVertical: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    letterSpacing: 0,
    textAlign: 'center',
  },
  sentTextColor: {
    color: '#bdebd4',
  },
  sendingTextColor: {
    color: '#fde7b6',
  },
  labelsending: {
    borderRadius: 999,
    marginTop: 12,
    height: 24,
    borderWidth: 1,
    borderStyle: 'solid',
    overflow: 'hidden',
  },
  sendingColors: {
    backgroundColor: '#381800',
    borderColor: '#9b5800',
  },
  sentColors: {
    backgroundColor: '#11422b',
    borderColor: '#1f784e',
  },
});

export default TransactionStatus;

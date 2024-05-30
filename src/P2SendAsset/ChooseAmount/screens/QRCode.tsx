import * as React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

const QRCode = ({ route, navigation }) => {
  return (
    <QRCodeScanner
      onRead={(qrData) => {
        const params = {
          ...route.params,
          recipient: { address: { stx: qrData.data }, icon: undefined, name: undefined },
        };
        console.log(params);
        navigation.replace('ChooseAmount', params);
      }}
      topContent={<Text style={styles.labelTypo}>Scan a STX address QR code</Text>}
      bottomContent={
        <Pressable style={[styles.buttonclassic1, styles.buttonclassicLayout]} onPress={() => navigation.goBack()}>
          <View style={styles.textWrapper1FlexBox}>
            <Text style={[styles.labelText3]}>Cancel</Text>
          </View>
        </Pressable>}
    />
  );
};

const styles = StyleSheet.create({
  buttonclassicLayout: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  buttonclassic1: {
    height: 48,
    paddingHorizontal: 20,
    margin: 20,
    justifyContent: 'center',
    paddingVertical: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  labelText3: {
    color: '#131313',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  textWrapper1FlexBox: {
    paddingHorizontal: 8,
    justifyContent: 'center',
    paddingVertical: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelTypo: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    color: '#fff'
  },
});

export default QRCode;

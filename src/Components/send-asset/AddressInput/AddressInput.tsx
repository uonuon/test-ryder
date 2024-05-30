import * as React from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const AddressInput = ({ address, setAddress, onPaste, onScan }) => {
  console.log('input', { address });
  return (
    <View style={[styles.frameGroup, styles.frameGroupFlexBox]}>
      <View style={[styles.enterNameOrAddressParent, styles.parentFlexBox1]}>
        <TextInput
          style={[styles.addressInput]}
          value={address}
          onChangeText={setAddress}
          placeholder="Enter recipient address"
          placeholderTextColor="#4d4d4d"
          selectionColor="#b1b1b1"
        />
        <Pressable style={styles.frameGroupFlexBox} onPress={onPaste}>
          <Image
            style={styles.frameChild}
            resizeMode="cover"
            source={require('./assets/vector-152.png')}
          />
          <Text style={[styles.paste, styles.pasteTypo]}>Paste</Text>
        </Pressable>
      </View>
      <Pressable style={styles.frameGroupFlexBox} onPress={onScan}>
        <Image
          style={[styles.iconWrapper2, styles.iconWrapperLayout]}
          resizeMode="cover"
          source={require('./assets/icon-wrapper2.png')}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  pasteTypo: {
    textAlign: 'left',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    letterSpacing: 0,
  },
  frameGroupFlexBox: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  parentFlexBox1: {
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  addressInput: {
    //lineHeight: 32,
    height: 30,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    textAlign: 'left',
    letterSpacing: 0,
    fontSize: 16,
    textAlignVertical: 'top',
    borderRadius: 8,
    flex: 1,
  },
  iconWrapperLayout: {
    height: 24,
    width: 24,
  },
  enterNameOr: {},
  frameChild: {
    maxWidth: '100%',
    height: 16,
    overflow: 'hidden',
  },
  paste: {
    color: '#9696fd',
    marginLeft: 12,
  },
  enterNameOrAddressParent: {
    borderRadius: 8,
    backgroundColor: '#1a1a1a',
    paddingVertical: 8,
    marginVertical: 8,
    alignItems: 'center',
    overflow: 'hidden',
    flex: 1,
  },
  iconWrapper2: {
    marginLeft: 20,
  },
  frameGroup: {
    alignSelf: 'stretch',
  },
});

export default AddressInput;

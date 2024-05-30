import React, {ReactNode, useState} from 'react';
import {View, StyleSheet, Keyboard} from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input-v2';

export type AppPasscodeInputProps = {
  onChange: (code: string) => void;
  currentCode: string;
  setCurrentCode: any;
};

const passcodeLength = 6;

const AppPasscodeInput = ({onChange, currentCode, setCurrentCode}: AppPasscodeInputProps) => {
  return (
    <View style={[styles.frameContainer, styles.frameSpaceBlock]}>
      <SmoothPinCodeInput
        autoFocus={true}
        password
        mask="*"
        cellSpacing={10}
        containerStyle={styles.inputContainer}
        cellStyle={styles.frameLayout}
        cellStyleFocused={styles.frameActive}
        codeLength={passcodeLength}
        value={currentCode}
        onTextChange={(code: string) => setCurrentCode(code)}
        onFulfill={(c: string) => {
          onChange(c);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  frameActive: {
    borderColor: '#fff',
  },
  frameContainer: {
    paddingVertical: 0,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputContainer: {
    width: '100%',
  },
  frameSpaceBlock: {
    marginTop: 40,
    alignSelf: 'stretch',
  },
  frameLayout: {
    height: 60,
    width: 46,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    borderStyle: 'solid',
    borderColor: '#404040',
    color: '#fff',
  },
});

export default AppPasscodeInput;

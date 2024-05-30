import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
const BottomButton = ({
  onPress,
  active,
  label,
}: {
  onPress: () => void;
  active: boolean;
  label: string;
}) => {
  return (
    <View style={[styles.frameView, styles.frameViewSpaceBlock]}>
      <Pressable onPress={onPress}>
        <View
          style={
            active
              ? [styles.buttonclassicActive, styles.textWrapperFlexBox]
              : [styles.buttonclassic, styles.textWrapperFlexBox]
          }>
          <View style={[styles.textWrapper, styles.textWrapperFlexBox]}>
            <Text style={[styles.labelText, styles.labelTextTypo]}>{label}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  frameViewSpaceBlock: {
    paddingVertical: 0,
    paddingHorizontal: 20,
  },
  textWrapperFlexBox: {
    justifyContent: 'center',
    paddingVertical: 0,
    alignItems: 'center',
    flexDirection: 'row',
  },
  labelTextTypo: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  frameView: {
    alignSelf: 'stretch',
  },
  labelText: {
    color: '#131313',
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: 16,
    textAlign: 'center',
  },
  textWrapper: {
    paddingHorizontal: 8,
  },
  buttonclassic: {
    borderRadius: 8,
    backgroundColor: '#393939',
    height: 48,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignSelf: 'stretch',
    overflow: 'hidden',
  },
  buttonclassicActive: {
    borderRadius: 8,
    height: 48,
    paddingVertical: 0,
    paddingHorizontal: 20,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    flexDirection: 'row',
    overflow: 'hidden',
  },
});

export default BottomButton;

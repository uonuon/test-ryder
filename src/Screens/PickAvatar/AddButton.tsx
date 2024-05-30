import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {StyleSheet, View, Pressable, Image} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

const AddButton = ({onPress}: {onPress: () => void}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.frameParent}>
      <Pressable
        style={[styles.componentChild, styles.plusIconPosition]}
        onPress={() => {
          onPress();
          /*
          launchImageLibrary({mediaType: 'photo'}, (r) => {
            console.log(r);
          });
          */
        }}>
        <Image
          style={[styles.plusIcon, styles.plusIconPosition]}
          resizeMode="cover"
          source={require('../../../assets/plus.png')}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  plusIconPosition: {
    overflow: 'hidden',
    position: 'absolute',
  },
  componentChild: {
    borderRadius: 192,
    backgroundColor: '#e9e9fe',
    borderStyle: 'solid',
    borderColor: '#918ef7',
    borderWidth: 4,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  plusIcon: {
    top: 60,
    left: 56,
    width: 80,
    height: 80,
  },
  frameParent: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AddButton;

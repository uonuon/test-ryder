import * as React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {Color, Border, FontFamily, Padding, FontSize, StyleVariable} from '../GlobalStyles';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {useNavigation} from '@react-navigation/native';
import {useStacks} from '../Utils/stacksContext';
import {TransactionState} from '../Utils/transactions';
import AppHeader from '../Components/AppHeader';

const SelectRecipient = () => {
  const navigator = useNavigation();
  const {updateAccount} = useStacks();
  return (
    <View style={styles.walletHome}>
      <View style={styles.frameParent}>
        <AppHeader title={'SEND'} showSteps step={2} />
        <View style={[styles.inputsParent, styles.frameGroupSpaceBlock]}>
          <View style={[styles.inputs, styles.inputsFlexBox]}>
            <Text style={[styles.usernameaddress, styles.toTypo]}>Username/address</Text>
            <View style={styles.iconwrapper}>
              <Image
                style={styles.scanIcon}
                resizeMode="cover"
                source={require('../../assets/scan.png')}
              />
            </View>
            <View style={[styles.toWrapper, styles.buttonSpaceBlock]}>
              <Text style={[styles.to, styles.toTypo]}>To</Text>
            </View>
          </View>
          <View style={[styles.frameGroup, styles.frameGroupSpaceBlock]}>
            <View style={styles.inputsFlexBox}>
              <Text style={styles.contacts}>Contacts</Text>
              <Image
                style={styles.scanIcon}
                resizeMode="cover"
                source={require('../../assets/plus.png')}
              />
            </View>
            <View style={styles.frameContainer}>
              <View style={[styles.frameView, styles.frameFlexBox]}>
                <View style={styles.frameParent1}>
                  <Image
                    style={[styles.frameIcon, styles.buttonLayout]}
                    resizeMode="cover"
                    source={require('../../assets/frame-8.png')}
                  />
                  <View style={styles.leoYeWrapper}>
                    <Text style={styles.leoYeTypo}>Leo Ye</Text>
                  </View>
                </View>
                <View style={styles.iconwrapper1}>
                  <Image
                    style={styles.scanIcon}
                    resizeMode="cover"
                    source={require('../../assets/dots.png')}
                  />
                </View>
              </View>
              <View style={[styles.frameParent2, styles.frameFlexBox]}>
                <View>
                  <View style={styles.frameParent1}>
                    <Image
                      style={[styles.frameIcon, styles.buttonLayout]}
                      resizeMode="cover"
                      source={require('../../assets/frame-9.png')}
                    />
                    <Text style={[styles.friedger, styles.leoYeTypo]}>Friedger</Text>
                  </View>
                </View>
                <View style={styles.iconwrapper1}>
                  <Image
                    style={styles.scanIcon}
                    resizeMode="cover"
                    source={require('../../assets/dots.png')}
                  />
                </View>
              </View>
              <View style={[styles.frameParent2, styles.frameFlexBox]}>
                <View>
                  <View style={styles.frameParent1}>
                    <Image
                      style={[styles.frameIcon, styles.buttonLayout]}
                      resizeMode="cover"
                      source={require('../../assets/frame-26085570.png')}
                    />
                    <Text style={[styles.friedger, styles.leoYeTypo]}>Julien N.</Text>
                  </View>
                </View>
                <View style={styles.iconwrapper1}>
                  <Image
                    style={styles.scanIcon}
                    resizeMode="cover"
                    source={require('../../assets/dots.png')}
                  />
                </View>
              </View>
              <Pressable
                onPress={() => {
                  updateAccount({txState: TransactionState.SENDING});
                  navigator.navigate('TransactionPrepare');
                }}>
                <View style={[styles.component21, styles.frameFlexBox]}>
                  <View style={styles.frameParent1}>
                    <Image
                      style={[styles.frameIcon, styles.buttonLayout]}
                      resizeMode="cover"
                      source={require('../../assets/frame-81.png')}
                    />
                    <View style={styles.leoYeWrapper}>
                      <Text style={styles.leoYeTypo}>Satoshi N.</Text>
                    </View>
                  </View>
                  <View style={styles.iconwrapper1}>
                    <Image
                      style={styles.scanIcon}
                      resizeMode="cover"
                      source={require('../../assets/dots.png')}
                    />
                  </View>
                </View>
              </Pressable>
              <View style={[styles.frameParent2, styles.frameFlexBox]}>
                <View>
                  <View style={styles.frameParent1}>
                    <Image
                      style={[styles.frameIcon, styles.buttonLayout]}
                      resizeMode="cover"
                      source={require('../../assets/frame-260855701.png')}
                    />
                    <Text style={[styles.friedger, styles.leoYeTypo]}>Marvin</Text>
                  </View>
                </View>
                <View style={styles.iconwrapper1}>
                  <Image
                    style={styles.scanIcon}
                    resizeMode="cover"
                    source={require('../../assets/dots.png')}
                  />
                </View>
              </View>
              <View style={[styles.frameParent2, styles.frameFlexBox]}>
                <View>
                  <View style={styles.frameParent1}>
                    <Image
                      style={[styles.frameIcon, styles.buttonLayout]}
                      resizeMode="cover"
                      source={require('../../assets/frame-260855702.png')}
                    />
                    <Text style={[styles.friedger, styles.leoYeTypo]}>Quentin</Text>
                  </View>
                </View>
                <View style={styles.iconwrapper1}>
                  <Image
                    style={styles.scanIcon}
                    resizeMode="cover"
                    source={require('../../assets/dots.png')}
                  />
                </View>
              </View>
              <View style={[styles.frameParent2, styles.frameFlexBox]}>
                <View>
                  <View style={styles.frameParent1}>
                    <Image
                      style={[styles.frameIcon, styles.buttonLayout]}
                      resizeMode="cover"
                      source={require('../../assets/frame-260855703.png')}
                    />
                    <Text style={[styles.friedger, styles.leoYeTypo]}>Louise</Text>
                  </View>
                </View>
                <View style={styles.iconwrapper1}>
                  <Image
                    style={styles.scanIcon}
                    resizeMode="cover"
                    source={require('../../assets/dots.png')}
                  />
                </View>
              </View>
              <View style={[styles.frameParent2, styles.frameFlexBox]}>
                <View>
                  <View style={styles.frameParent1}>
                    <Image
                      style={[styles.frameIcon, styles.buttonLayout]}
                      resizeMode="cover"
                      source={require('../../assets/frame-260855704.png')}
                    />
                    <Text style={[styles.friedger, styles.leoYeTypo]}>Ray H.</Text>
                  </View>
                </View>
                <View style={styles.iconwrapper1}>
                  <Image
                    style={styles.scanIcon}
                    resizeMode="cover"
                    source={require('../../assets/dots.png')}
                  />
                </View>
              </View>
              <View style={[styles.frameParent2, styles.frameFlexBox]}>
                <View>
                  <View style={styles.frameParent1}>
                    <Image
                      style={[styles.frameIcon, styles.buttonLayout]}
                      resizeMode="cover"
                      source={require('../../assets/frame-260855705.png')}
                    />
                    <Text style={[styles.friedger, styles.leoYeTypo]}>Rob H.</Text>
                  </View>
                </View>
                <View style={styles.iconwrapper1}>
                  <Image
                    style={styles.scanIcon}
                    resizeMode="cover"
                    source={require('../../assets/dots.png')}
                  />
                </View>
              </View>
              <View style={[styles.frameParent2, styles.frameFlexBox]}>
                <View>
                  <View style={styles.frameParent1}>
                    <Image
                      style={[styles.frameIcon, styles.buttonLayout]}
                      resizeMode="cover"
                      source={require('../../assets/frame-260855706.png')}
                    />
                    <Text style={[styles.friedger, styles.leoYeTypo]}>Owen</Text>
                  </View>
                </View>
                <View style={styles.iconwrapper1}>
                  <Image
                    style={styles.scanIcon}
                    resizeMode="cover"
                    source={require('../../assets/dots.png')}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.button, styles.buttonLayout]}>
        <Text style={styles.labelText}>Continue</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frameGroupSpaceBlock: {
    marginTop: 20,
    alignItems: 'center',
  },
  inputsFlexBox: {
    justifyContent: 'space-between',
    width: 350,
    alignItems: 'center',
    flexDirection: 'row',
  },
  toTypo: {
    fontFamily: FontFamily.labelLarge500,
    fontWeight: '500',
    textAlign: 'left',
    color: Color.neutralSolid12,
  },
  buttonSpaceBlock: {
    paddingVertical: 0,
    alignItems: 'center',
    position: 'absolute',
  },
  frameFlexBox: {
    paddingVertical: Padding.p_5xs,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonLayout: {
    borderRadius: Border.br_341xl,
    overflow: 'hidden',
  },
  leoYeTypo: {
    color: Color.purple13,
    fontSize: FontSize.labelLarge500_size,
    lineHeight: 20,
    fontFamily: FontFamily.labelLarge500,
    fontWeight: '500',
    textAlign: 'left',
    letterSpacing: 0,
  },
  usernameaddress: {
    lineHeight: 16,
    zIndex: 0,
    fontWeight: '500',
    fontSize: FontSize.bodySmall500_size,
  },
  scanIcon: {
    height: 24,
    width: 24,
    overflow: 'hidden',
  },
  iconwrapper: {
    zIndex: 1,
    flexDirection: 'row',
  },
  to: {
    fontSize: 10,
    letterSpacing: 1,
    lineHeight: 24,
    fontWeight: '500',
  },
  toWrapper: {
    top: -12,
    left: 12,
    paddingHorizontal: Padding.p_5xs,
    zIndex: 2,
    flexDirection: 'row',
    backgroundColor: Color.whiteOverride,
    paddingVertical: 0,
  },
  inputs: {
    height: 44,
    paddingLeft: Padding.p_xl,
    paddingTop: Padding.p_5xs,
    paddingRight: Padding.p_5xs,
    paddingBottom: Padding.p_5xs,
    borderRadius: Border.br_xs,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Color.neutralSolid6,
    borderStyle: 'solid',
  },
  contacts: {
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'left',
    color: Color.neutral13,
    fontFamily: FontFamily.poppinsSemiBold,
    letterSpacing: 0,
    fontWeight: '600',
  },
  frameIcon: {
    width: 32,
    height: 32,
  },
  leoYeWrapper: {
    marginLeft: 8,
  },
  frameParent1: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconwrapper1: {
    flexDirection: 'row',
  },
  frameView: {
    paddingHorizontal: 0,
    alignSelf: 'stretch',
    paddingVertical: Padding.p_5xs,
    borderRadius: Border.br_xs,
  },
  friedger: {
    marginLeft: 8,
  },
  frameParent2: {
    paddingHorizontal: 0,
    alignSelf: 'stretch',
    paddingVertical: Padding.p_5xs,
    borderRadius: Border.br_xs,
    marginTop: 12,
  },
  component21: {
    width: 389,
    paddingHorizontal: Padding.p_xl,
    marginTop: 12,
  },
  frameContainer: {
    marginTop: 12,
    width: 350,
    alignItems: 'center',
  },
  frameGroup: {
    width: 390,
    overflow: 'hidden',
  },
  inputsParent: {
    width: 350,
  },
  frameParent: {
    top: 5,
    left: 20,
    alignItems: 'center',
    position: 'absolute',
  },
  labelText: {
    color: Color.whiteOverride,
    fontSize: FontSize.labelLarge500_size,
    lineHeight: 20,
    fontFamily: FontFamily.labelLarge500,
    fontWeight: '500',
    letterSpacing: 0,
    textAlign: 'center',
  },
  button: {
    marginLeft: -178,
    top: 747,
    height: 54,
    paddingHorizontal: StyleVariable.classicButtonsPaddingNoIcon,
    justifyContent: 'center',
    display: 'none',
    paddingVertical: 0,
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: Color.singaporeSolid9,
    width: 350,
    left: '50%',
  },
  walletHome: {
    flex: 1,
    width: '100%',
    height: 850,
    overflow: 'hidden',
    backgroundColor: Color.whiteOverride,
  },
});

export default SelectRecipient;

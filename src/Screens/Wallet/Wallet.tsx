import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import AppHeader from '../../Components/AppHeader';
import IdCard from '../../Components/IdCard';
import {Border, Color, FontFamily, FontSize, Padding} from '../../GlobalStyles';
import {useStacks} from '../../Utils/stacksContext';

const Wallet = () => {
  const navigation = useNavigation();
  const {currentAccount} = useStacks();
  console.log(currentAccount);
  return (
    <View style={styles.idCardParent}>
      <AppHeader title="RYDER APP" showSteps={false} />
      <IdCard isNew={true} />

      <Pressable
        onPress={() => {
          console.log('clicked');
          navigation.navigate('AddRyderOne');
        }}>
        <View style={[styles.frameGroup, styles.frameGroupFlexBox]}>
          <View>
            <Text style={[styles.addARyder, styles.addARyderTypo]}>Add a Ryder One</Text>
          </View>
          <View style={styles.iconButtonParent}>
            <View style={[styles.iconButton, styles.frameGroupFlexBox]}>
              <View style={styles.iconwrapper1}>
                <Image
                  style={styles.icon2}
                  resizeMode="cover"
                  source={require('../../../assets/ryder-one-icon.png')}
                />
              </View>
            </View>
          </View>
        </View>
      </Pressable>
      <Text style={[styles.setupANew, styles.setupANewLayout]}>
        Setup a new Ryder One to buy, receive or transfer assets.
      </Text>
      <View style={styles.stretchLayout}></View>
      <View style={styles.frameContainer}>
        <View style={[styles.frameView, styles.iconLayout]}>
          <View style={[styles.component2Parent, styles.component6FlexBox]}>
            <View style={[styles.component2, styles.componentLayout]} />
            <View style={[styles.component2, styles.componentLayout]} />
            <View style={[styles.component2, styles.componentLayout]} />
            <View style={[styles.component2, styles.componentLayout]} />
            <View style={[styles.component6, styles.componentLayout]}>
              <View style={styles.fullShapes}>
                <Image
                  style={styles.vectorIcon}
                  resizeMode="cover"
                  source={require('../../../assets/component6.png')}
                />
              </View>
            </View>
            <View style={[styles.component2, styles.componentLayout]} />
            <View style={[styles.component2, styles.componentLayout]} />
            <View style={[styles.component2, styles.componentLayout]} />
            <View style={[styles.component2, styles.componentLayout]} />
          </View>
          <View style={styles.bePartOfACircleParent}>
            <Text style={[styles.bePartOf, styles.bePartOfLayout]}>Be part of a Circle</Text>
            <Text style={[styles.helpAFriend, styles.setupANewLayout]}>
              Help a friend or family member by keeping a backup for them.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frameGroupFlexBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addARyderTypo: {
    fontFamily: FontFamily.bodySmall500,
    fontWeight: '500',
  },
  setupANewLayout: {
    lineHeight: 16,
    fontSize: FontSize.bodySmall400_size,
  },
  iconLayout: {
    borderRadius: Border.br_base,
    overflow: 'hidden',
  },
  component6FlexBox: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  componentLayout: {
    height: 15,
    width: 15,
  },
  bePartOfLayout: {
    lineHeight: 20,
    textAlign: 'left',
    letterSpacing: 0,
  },
  iconwrapper: {
    marginLeft: 16,
    flexDirection: 'row',
  },
  icon: {
    height: '100%',
    backgroundColor: 'transparent',
    borderRadius: Border.br_base,
    overflow: 'hidden',
    width: '100%',
  },
  idCard: {
    borderRadius: Border.br_base,
    overflow: 'hidden',
  },
  addARyder: {
    fontSize: FontSize.bodyMedium500_size,
    lineHeight: 20,
    textAlign: 'left',
    letterSpacing: 0,
    color: Color.white,
  },
  icon2: {
    width: 24,
    height: 24,
    overflow: 'hidden',
  },
  iconwrapper1: {
    flexDirection: 'row',
  },
  iconButton: {
    borderRadius: 216,
    width: 24,
    height: 24,
    overflow: 'hidden',
  },
  iconButtonParent: {
    marginLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  frameGroup: {
    width: 350,
    borderRadius: Border.br_341xl,
    backgroundColor: Color.mediumslateblue,
    padding: Padding.p_xs,
    marginTop: 20,
    flexDirection: 'row',
  },
  setupANew: {
    width: 222,
    color: Color.gray,
    fontFamily: FontFamily.bodySmall500,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 20,
  },
  component2: {
    borderRadius: Border.br_26xl,
    backgroundColor: Color.darkgoldenrod,
    overflow: 'hidden',
  },
  vectorIcon: {
    maxWidth: '100%',
    maxHeight: '100%',
    alignSelf: 'stretch',
    overflow: 'hidden',
    width: '100%',
    flex: 1,
  },
  fullShapes: {
    width: 16,
    height: 16,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  component6: {
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  component2Parent: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bePartOf: {
    fontSize: 16,
    color: Color.gray,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
  },
  helpAFriend: {
    color: '#765d1e',
    alignSelf: 'stretch',
    marginTop: 8,
    textAlign: 'left',
    fontFamily: FontFamily.bodySmall400,
  },
  bePartOfACircleParent: {
    width: 271,
    marginTop: 12,
  },
  frameView: {
    backgroundColor: '#ffe299',
    paddingHorizontal: 8,
    paddingVertical: Padding.p_xs,
    marginVertical: Padding.p_xs,
    justifyContent: 'flex-end',
    flex: 1,
  },
  frameContainer: {
    marginTop: 20,
    flexDirection: 'row',
    width: 350,
    overflow: 'hidden',
  },
  stretchLayout: {
    height: '25%',
  },
  idCardParent: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: Color.whiteOverride,
  },
});

export default Wallet;

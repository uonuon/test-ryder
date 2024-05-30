import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import IdCard from '../../Components/IdCard';
import {Border, Color, FontFamily, FontSize, Padding} from '../../GlobalStyles';
import {useStacks} from '../../Utils/stacksContext';
import AppHeader from '../../Components/AppHeader';

const Wallet2 = () => {
  const navigation = useNavigation();
  const {currentAccount} = useStacks();
  const {totalUSD} = currentAccount;
  const totalFullUSD = Math.floor(totalUSD);
  return (
    <View style={styles.idCardParent}>
      <AppHeader title="RYDER APP" showSteps={false} />
      <IdCard isNew={false} />
      <View style={styles.component20Parent}>
        <Pressable
          onPress={() => {
            navigation.navigate('SendToken');
          }}>
          <View style={[styles.component20, styles.component20FlexBox]}>
            <Image
              style={styles.userCircleIconLayout}
              resizeMode="cover"
              source={require('../../../assets/frame-26085550.png')}
            />
            <Text style={[styles.send, styles.sendTypo]}>Send</Text>
          </View>
        </Pressable>
        <View style={[styles.component20, styles.component20FlexBox]}>
          <Image
            style={styles.userCircleIconLayout}
            resizeMode="cover"
            source={require('../../../assets/frame-26085549.png')}
          />
          <Text style={[styles.receive, styles.sendTypo]}>Receive</Text>
        </View>
        <View style={[styles.component20, styles.component20FlexBox]}>
          <Image
            style={styles.userCircleIconLayout}
            resizeMode="cover"
            source={require('../../../assets/frame-26085551.png')}
          />
          <Text style={[styles.swap, styles.sendTypo]}>Swap</Text>
        </View>
      </View>
      <View style={styles.frameParent2}>
        <View style={[styles.frameParent3, styles.frameParentSpaceBlock1]}>
          <Image
            style={[styles.topicIcon]}
            resizeMode="cover"
            source={require('../../../assets/tapsafe.png')}
          />
          <View>
            <Text style={[styles.recovery, styles.recoveryLayout]}>Recovery</Text>
            <Text style={[styles.waysToRecover, styles.recoveryLayout]}>12 ways to recover</Text>
          </View>
        </View>
        <View style={[styles.frameParent4, styles.frameParentSpaceBlock]}>
          <Image
            style={[styles.topicIcon]}
            resizeMode="cover"
            source={require('../../../assets/history.png')}
          />
          <View>
            <Text style={[styles.recovery, styles.recoveryLayout]}>History</Text>
            <Text style={[styles.waysToRecover, styles.recoveryLayout]}>
              126 signed transactions
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.frameParent2}>
        <View style={[styles.frameParent6, styles.frameParentSpaceBlock1]}>
          <Image
            style={[styles.topicIcon]}
            resizeMode="cover"
            source={require('../../../assets/wallet.png')}
          />
          <View>
            <Text style={[styles.recovery, styles.recoveryLayout]}>Tokens</Text>
            <Text style={[styles.waysToRecover, styles.recoveryLayout]}>
              6 tokens in your wallet
            </Text>
          </View>
        </View>
        <View style={[styles.frameParent7, styles.frameParentSpaceBlock]}>
          <Image
            style={[styles.topicIcon]}
            resizeMode="cover"
            source={require('../../../assets/collectible.png')}
          />
          <View>
            <Text style={[styles.recovery, styles.recoveryLayout]}>Collectibles</Text>
            <Text style={[styles.waysToRecover, styles.recoveryLayout]}>322 NFTs stored</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  walletHomeFlexBox: {
    flex: 1,
    overflow: 'hidden',
    width: '100%',
  },
  userCircleIconLayout: {
    height: 24,
    width: 24,
  },
  component20FlexBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendTypo: {
    fontFamily: FontFamily.titleSmall500,
    fontWeight: '500',
    fontSize: FontSize.titleSmall500_size,
    lineHeight: 20,
    marginTop: 8,
    letterSpacing: 0,
    textAlign: 'center',
  },
  frameParentSpaceBlock1: {
    paddingHorizontal: Padding.p_5xs,
    height: 120,
    paddingVertical: Padding.p_xs,
    borderRadius: Border.br_base,
    justifyContent: 'space-between',
    flex: 1,
  },
  component6FlexBox: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  componentLayout2: {
    height: 10,
    width: 10,
  },
  fullLayout: {
    width: 5,
    height: 5,
  },
  recoveryLayout: {
    lineHeight: 20,
    textAlign: 'left',
    letterSpacing: 0,
  },
  frameParentSpaceBlock: {
    marginLeft: 20,
    paddingHorizontal: Padding.p_5xs,
    height: 120,
    paddingVertical: Padding.p_xs,
    borderRadius: Border.br_base,
    justifyContent: 'space-between',
    flex: 1,
  },
  componentLayout1: {
    backgroundColor: Color.colorSkyblue,
    height: 10,
    width: 10,
    overflow: 'hidden',
  },
  componentLayout: {
    backgroundColor: Color.colorDarkgray,
    height: 10,
    width: 10,
    overflow: 'hidden',
  },
  componentBg: {
    backgroundColor: Color.colorSeagreen,
    overflow: 'hidden',
  },
  userCircleIcon: {
    overflow: 'hidden',
  },
  idCard: {
    borderRadius: Border.br_base,
    overflow: 'hidden',
  },
  send: {
    color: Color.neutral13,
  },
  component20: {
    borderRadius: Border.br_5xs,
    width: 74,
    height: 58,
    padding: Padding.p_9xs,
  },
  receive: {
    color: Color.success13,
  },
  swap: {
    color: Color.info13,
  },
  component20Parent: {
    backgroundColor: Color.neutralSolid3,
    paddingHorizontal: 20,
    paddingVertical: Padding.p_xs,
    borderRadius: Border.br_base,
    marginTop: 20,
    justifyContent: 'space-between',
    width: 350,
    flexDirection: 'row',
  },
  component2: {
    backgroundColor: Color.colorDarkgoldenrod,
    borderRadius: Border.br_11xl,
    overflow: 'hidden',
  },
  vectorIcon: {
    alignSelf: 'stretch',
    maxWidth: '100%',
    maxHeight: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  fullShapes: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
  component6: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  component2Parent: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topicIcon: {
    width: 30,
    height: 30,
  },
  recovery: {
    fontSize: FontSize.size_base,
    color: Color.neutral13,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
  },
  waysToRecover: {
    color: Color.colorGray_100,
    marginTop: 8,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_xs,
    lineHeight: 20,
  },
  frameParent3: {
    backgroundColor: '#ffe299',
  },
  component21: {
    borderBottomLeftRadius: Border.br_11xl,
  },
  component31: {
    borderRadius: Border.br_11xl,
  },
  component41: {
    borderBottomRightRadius: Border.br_11xl,
  },
  frameParent4: {
    backgroundColor: '#bdefff',
  },
  frameParent2: {
    marginTop: 20,
    width: 350,
    flexDirection: 'row',
  },
  component14: {
    borderTopLeftRadius: Border.br_11xl,
  },
  component16: {
    borderBottomRightRadius: Border.br_11xl,
  },
  frameParent6: {
    backgroundColor: '#e6e6e6',
  },
  component22: {
    height: 10,
    width: 10,
    borderRadius: Border.br_11xl,
  },
  component32: {
    overflow: 'hidden',
  },
  component52: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
  fullShapes4: {
    borderBottomLeftRadius: Border.br_11xl,
    width: 5,
    height: 5,
  },
  fullShapes5: {
    borderBottomRightRadius: Border.br_11xl,
    width: 5,
    height: 5,
  },
  component83: {
    borderBottomLeftRadius: Border.br_11xl,
    height: 10,
    width: 10,
  },
  fullShapes10: {
    width: 5,
    height: 5,
  },
  component103: {
    borderBottomRightRadius: Border.br_11xl,
    height: 10,
    width: 10,
  },
  frameParent7: {
    backgroundColor: '#c2f9cb',
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
  frameParent: {
    top: 51,
  },
});

export default Wallet2;

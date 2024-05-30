import * as React from 'react';
import {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SupportedAssets, assets} from '../../../../lib/tokens/tokens';
import ScreenHeader from '../../../Components/send-asset/ScreenHeader/ScreenHeader';
import EmptyList from '../../../Components/send-asset/Token/EmptyList';
import TokenList from '../../../Components/send-asset/Token/TokenList';
import {useSendAsset} from '../../../Utils/sendAssetContext';
import {useWallet} from '../../../Utils/walletContext';
import {ALL_ASSETS} from '../../../Utils/walletProvider';

const ButtonTab = ({
  title,
  active,
  onPress,
}: {
  title: string;
  active: boolean;
  onPress: () => void;
}) => {
  return (
    <>
      {active === true ? (
        <Pressable style={[styles.buttonclassic, styles.buttonclassicSpaceBlock]} onPress={onPress}>
          <View style={[styles.textWrapper, styles.wrapperFlexBox]}>
            <Text style={[styles.labelText, styles.labelTypo]}>{title}</Text>
          </View>
        </Pressable>
      ) : (
        <Pressable
          style={[styles.buttonclassic1, styles.buttonclassic1SpaceBlock]}
          onPress={onPress}>
          <View style={[styles.textWrapper, styles.wrapperFlexBox]}>
            <Text style={[styles.labelText1, styles.ethClr]}>{title}</Text>
          </View>
        </Pressable>
      )}
    </>
  );
};

const ChooseToken = ({route, navigation}) => {
  const {navigate, goBack} = navigation;
  const {mode} = route.params;
  const {setSendAsset} = useSendAsset();
  const {currentWallet} = useWallet();
  const [tab, setTab] = useState<'assets' | 'collectibles'>('assets');
  const allAssets =
    mode === 'tokenlist' ? {...ALL_ASSETS, ...currentWallet.assets} : currentWallet.assets;
  const selectToken = (asset: SupportedAssets) => {
    if (mode === 'tokenlist') {
      // do nothing
    }
    else if (mode === "receive") {
      // show receive screen
      setSendAsset({asset: assets[asset]});
      navigate('ShowReceive', {asset});
    }
    else {
      setSendAsset({asset: assets[asset]});
      navigate('ChooseAmount', {asset});
    }
  };
  return (
    <SafeAreaView style={styles.send}>
      <View style={styles.parentFlexBox}>
        <ScreenHeader title={mode === 'tokenlist' ? 'Assets' : (mode === 'receive' ? 'Receive' : 'Send')} />
        <View style={[styles.buttonmultipleParent, styles.parentFlexBox]}>
          <View style={styles.buttonmultiple}>
            <ButtonTab
              title="Assests"
              active={tab === 'assets'}
              onPress={() => {
                setTab('assets');
              }}
            />
            <ButtonTab
              title="Collectibles"
              active={tab === 'collectibles'}
              onPress={() => {
                setTab('collectibles');
              }}
            />
          </View>
          <View style={styles.frameParent}>
            <Pressable
              style={[styles.iconWrapperGroup, styles.iconWrapperSpaceBlock]}
              onPress={() => {}}>
              <Image
                style={styles.iconWrapperLayout}
                resizeMode="cover"
                source={require('../assets/icon-wrapper4.png')}
              />
              <Image
                style={styles.frameChild}
                resizeMode="cover"
                source={require('../assets/vector-152.png')}
              />
              <Text style={[styles.search, styles.ethClr]}>Search</Text>
            </Pressable>
            {tab === 'assets' ? (
              <>
                {Object.keys(allAssets).length > 0 ? (
                  <TokenList allAssets={allAssets} selectToken={selectToken} />
                ) : (
                  <EmptyList />
                )}
              </>
            ) : (
              <EmptyList />
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dynamicIslandLayout: {
    height: 37,
    position: 'absolute',
  },
  rightFlexBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightPosition: {
    top: 13,
    position: 'absolute',
  },
  borderPosition: {
    opacity: 0.3,
    position: 'absolute',
  },
  wrapperFlexBox: {
    paddingVertical: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ethTypo: {
    textAlign: 'left',
    fontSize: 14,
  },
  iconWrapperLayout1: {
    height: 24,
    width: 24,
  },
  parentFlexBox: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  buttonclassicSpaceBlock: {
    paddingHorizontal: 4,
    height: 32,
    overflow: 'hidden',
    borderRadius: 12,
    paddingVertical: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelTypo: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    lineHeight: 20,
    textAlign: 'center',
  },
  iconWrapperLayout: {
    height: 20,
    width: 20,
  },
  buttonclassic1SpaceBlock: {
    marginLeft: 8,
    justifyContent: 'center',
  },
  ethClr: {
    color: '#b3b3b3',
    letterSpacing: 0,
  },
  iconWrapperSpaceBlock: {
    paddingHorizontal: 12,
    alignSelf: 'stretch',
  },
  textTypo: {
    lineHeight: 24,
    letterSpacing: 1,
    fontSize: 16,
    textAlign: 'left',
    color: '#fff',
  },
  time: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'SF Pro',
    textAlign: 'center',
    color: '#fff',
  },
  timeStyle: {
    top: 10,
    left: 0,
    width: 33,
    justifyContent: 'space-between',
    position: 'absolute',
  },
  lensIcon: {
    left: 101,
    width: 11,
    zIndex: 0,
    height: 11,
  },
  dynamicIsland: {
    left: 114,
    borderRadius: 37,
    backgroundColor: '#000',
    width: 124,
    paddingTop: 13,
    paddingRight: 12,
    paddingBottom: 13,
    top: 0,
    justifyContent: 'space-between',
    height: 37,
    position: 'absolute',
  },
  cellularConnectionIcon: {
    width: 17,
    height: 11,
  },
  wifiIcon: {
    width: 15,
    height: 11,
  },
  border: {
    right: 2,
    borderRadius: 3,
    borderColor: '#fff',
    width: 22,
    borderWidth: 1,
    borderStyle: 'solid',
    height: 11,
    top: 0,
  },
  capIcon: {
    top: 4,
    right: 0,
    width: 1,
    height: 4,
  },
  capacity: {
    top: 2,
    right: 4,
    borderRadius: 1,
    width: 18,
    height: 7,
    backgroundColor: '#fff',
    position: 'absolute',
  },
  battery: {
    width: 24,
    height: 11,
  },
  right: {
    left: 279,
    width: 71,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeStyleParent: {
    top: 11,
    left: 20,
    width: 350,
  },
  statusBars: {
    width: 390,
    height: 60,
  },
  settings: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    lineHeight: 20,
    textAlign: 'left',
    fontSize: 14,
    letterSpacing: 0,
    color: '#fff',
  },
  iconWrapper1: {
    opacity: 0,
  },
  iconWrapperParent: {
    paddingHorizontal: 12,
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
  labelText: {
    color: '#000',
    letterSpacing: 0,
  },
  textWrapper: {
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  iconWrapper2: {
    display: 'none',
  },
  buttonclassic: {
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  labelText1: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    lineHeight: 20,
    textAlign: 'center',
  },
  buttonclassic1: {
    paddingHorizontal: 4,
    height: 32,
    overflow: 'hidden',
    borderRadius: 12,
    paddingVertical: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonmultiple: {
    borderRadius: 360,
    paddingVertical: 8,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  frameChild: {
    maxWidth: '100%',
    height: 16,
    marginLeft: 12,
    overflow: 'hidden',
  },
  search: {
    lineHeight: 16,
    fontFamily: 'Poppins-Regular',
    marginLeft: 12,
    textAlign: 'left',
    fontSize: 14,
    color: '#b3b3b3',
  },
  iconWrapperGroup: {
    borderRadius: 16,
    backgroundColor: '#1a1a1a',
    borderColor: '#4a4a4a',
    paddingVertical: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderStyle: 'solid',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokensFinalIcon: {
    borderRadius: 1249,
    width: 40,
    height: 40,
    overflow: 'hidden',
  },
  ethereum: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  eth: {
    fontFamily: 'Poppins-Regular',
    textAlign: 'left',
    fontSize: 14,
    lineHeight: 20,
  },
  text: {
    fontFamily: 'Poppins-Regular',
  },
  parent: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  frameContainer: {
    borderColor: '#2b2b2b',
    borderBottomWidth: 1,
    height: 80,
    borderStyle: 'solid',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  frameWrapper: {
    marginTop: 28,
  },
  frameParent: {
    paddingVertical: 12,
    marginTop: 12,
    borderRadius: 12,
    paddingHorizontal: 24,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  buttonmultipleParent: {
    marginTop: 20,
  },
  send: {
    backgroundColor: '#131313',
    flex: 1,
    width: '100%',
    height: 844,
    paddingBottom: 24,
    alignItems: 'center',
  },
});

export default ChooseToken;

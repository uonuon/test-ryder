import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { calculateTotal } from '../../../lib/tokens/calculations';
import SettingsPopup from '../../Components/SettingsPopup/SettingsPopup';
import TotalBalance from '../../Components/home/TotalBalance/TotalBalance';
import TokenList from '../../Components/send-asset/Token/TokenList';
import { usePrices } from '../../Utils/pricesContext';
import { AssetList, useWallet } from '../../Utils/walletContext';
import { TOP3_ASSETS } from '../../Utils/walletProvider';
import { useStacks } from '../../Utils/stacksContext';
import { publicKeyFromXtendedPubKey } from '../../../lib/nfc-protocol/stacks-network';
import { AddressVersion, createStacksPublicKey, publicKeyToAddress } from '@stacks/transactions';
import { bytesToHex, hexToBytes } from '@stacks/common';
import { StxBalance } from '@stacks/blockchain-api-client';
import { setupWithKey } from '../../../lib/nfc-protocol/wallet';

const WalletRyder = () => {
  const { navigate } = useNavigation();
  const { currentWallet, currentDevice, setCurrentWallet } = useWallet();
  const { network, accountsApi } = useStacks();
  const [numberOfNFTs] = useState<number>(0);
  const [allAssets, setAllAssets] = useState<AssetList>({});
  const prices = usePrices();
  const totalAmountUsd = calculateTotal(currentWallet, prices, 'usd');
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(0);

  useEffect(() => {
    if (totalAmountUsd > 0) {
      setAllAssets({ ...TOP3_ASSETS, ...currentWallet.assets });
    } else {
      setAllAssets(currentWallet.assets);
    }
  }, [currentWallet.assets, totalAmountUsd]);

  useEffect(() => {
    if (currentDevice === undefined) {
      navigate('Welcome');
      return;
    }
  });

  useEffect(() => {
    const accountIndex = currentWallet.currentIndex;
    const extendedPubKey = currentWallet.assets.stx?.xtendedPublicKey;
    const now = new Date().getTime();

    if (extendedPubKey && now - lastUpdate > 1000) {
      console.log('mainnet', network.isMainnet());
      const pubKey = publicKeyFromXtendedPubKey(extendedPubKey, accountIndex);
      let stxAddress = publicKeyToAddress(
        network.isMainnet() ? AddressVersion.MainnetSingleSig : AddressVersion.TestnetSingleSig,
        createStacksPublicKey(bytesToHex(pubKey)),
      );
      console.log('get account stx balance', stxAddress);
      accountsApi
        .getAccountStxBalance({ principal: stxAddress })
        .then((balance: any) => {
          setCurrentWallet({
            currentIndex: currentWallet.currentIndex,
            assets: {
              ...currentWallet.assets,
              stx: {
                accounts: [{ amountAvailable: Number(balance.balance) / 1e6 }],
                xtendedPublicKey: extendedPubKey,
              },
            },
          });
          setLastUpdate(new Date().getTime());
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [currentWallet]);

  const emptyAssetList = Object.keys(allAssets).length === 0;
  const { name, icon, serial } = currentDevice || { name: '', icon: '', serial: '' };
  const { currentIndex } = currentWallet;
  return (
    <SafeAreaView style={[styles.home]}>
      {showSettingsPopup ? (
        <SettingsPopup
          onHide={() => {
            setShowSettingsPopup(false);
          }}
        />
      ) : null}
      <View style={styles.fullPage}>
        <View style={styles.walletBannerParent}>
          <View style={styles.walletBanner}>
            <Image
              style={styles.bannerPosition}
              resizeMode="cover"
              source={require('../assets/banner-color.png')}
            />
            <View style={[styles.banner, styles.bannerPosition]}>
              <Image
                style={styles.bannerPosition}
                resizeMode="cover"
                source={require('../assets/mask-group.png')}
              />
              <View style={styles.nameId}>
                <Text style={[styles.marvinJanssen, styles.textTypo1]}>{name}</Text>
                <Text style={[styles.text, styles.textTypo]}>Ryder One {serial}</Text>
              </View>
              <Pressable
                style={[styles.buttoniconOnly, styles.buttoniconLayout]}
                onPress={() => {
                  setShowSettingsPopup(!showSettingsPopup);
                }}>
                <Image
                  style={styles.iconLayout1}
                  resizeMode="cover"
                  source={require('../assets/icon-wrapper.png')}
                />
              </Pressable>
            </View>
            <View style={[styles.pfp, styles.buttonclassicBg]}>
              <Text style={[styles.text1, styles.text1Position]}>{currentIndex + 1 || '1'}</Text>
            </View>
            <Image
              style={[styles.activityIcon, styles.pfpPosition]}
              resizeMode="cover"
              source={require('../assets/activity.png')}
            />
          </View>
          <View style={[styles.labeliconWrapper, styles.bodySpaceBlock, { alignSelf: 'flex-start' }]}>
            <Pressable style={styles.labelicon} onPress={() => { }}>
              <Text style={[styles.labelText, styles.textLayout]}>Main account</Text>
              <Image
                style={[styles.iconWrapper1, styles.iconWrapperLayout1]}
                resizeMode="cover"
                source={require('../assets/icon-wrapper1.png')}
              />
            </Pressable>
          </View>
        </View>
        <ScrollView style={styles.scrollBackground}>
          <View style={[styles.body, styles.bodySpaceBlock]}>
            <View style={styles.account}>
              <View style={styles.mainMoney}>
                <View style={[styles.balanceParent]}>
                  <Text style={styles.balance}>Balance</Text>
                  <TotalBalance total={totalAmountUsd} fiat={'usd'} />
                </View>
              </View>
              <Image
                style={[styles.separatorIcon, styles.actionsSpaceBlock, { marginTop: 0 }]}
                resizeMode="cover"
                source={require('../assets/separator.png')}
              />
              <View style={[styles.actions, styles.actionsSpaceBlock]}>
                <Pressable
                  style={styles.send}
                  onPress={() => {
                    navigate('ChooseToken', { mode: 'send' });
                  }}>
                  <Image
                    style={styles.iconLayout1}
                    resizeMode="cover"
                    source={require('../assets/icon-send.png')}
                  />
                  <Text style={[styles.send1, styles.textTypo1]}>Send</Text>
                </Pressable>
                <Pressable
                  style={styles.send}
                  onPress={() => {
                    navigate('ChooseToken', { mode: 'receive' });
                  }}>
                  <Image
                    style={styles.iconLayout1}
                    resizeMode="cover"
                    source={require('../assets/icon-receive.png')}
                  />
                  <Text style={[styles.send1, styles.textTypo1]}>Receive</Text>
                </Pressable>
                <Pressable style={styles.send}>
                  <Image
                    style={styles.iconLayout1}
                    resizeMode="cover"
                    source={require('../assets/icon-swap.png')}
                  />
                  <Text style={[styles.send1, styles.textTypo1]}>Swap</Text>
                </Pressable>
              </View>
            </View>
            <View style={[styles.row3, styles.rowBorder]}>
              <View style={styles.headGroup}>
                <View style={[styles.head1, styles.frameParentFlexBox]}>
                  <Image
                    style={styles.tapsafeIconLayout}
                    resizeMode="cover"
                    source={require('../assets/icon-token.png')}
                  />
                  <Pressable
                    style={[styles.buttonclassic10, styles.buttoniconFlexBox]}
                    onPress={() => { }}>
                    <View style={styles.textWrapper}>
                      <Text style={[styles.labelText1, styles.textTypo1]}>Top assets</Text>
                    </View>
                    <Image
                      style={styles.iconWrapperLayout1}
                      resizeMode="cover"
                      source={require('../assets/icon-wrapper3.png')}
                    />
                  </Pressable>
                </View>
                <View style={styles.totalParent}>
                  <Text style={styles.wealthTypo}>Assets</Text>
                  {emptyAssetList ? null : (
                    <TokenList allAssets={allAssets} selectToken={() => { }} />
                  )}
                </View>
              </View>
              {emptyAssetList ? (
                <>
                  <Text style={[styles.nftsStored, styles.todayClr]}>No assets yet. </Text>
                  <Pressable
                    style={[styles.buttonclassic9, styles.buttonclassicAction]}
                    onPress={() => {
                      navigate('ChooseToken', { mode: 'tokenlist' });
                    }}>
                    <View style={styles.textWrapper7}>
                      <Text style={[styles.labelTextAction, styles.textLayout]}>
                        Receive assets
                      </Text>
                    </View>
                  </Pressable>
                </>
              ) : (
                <Pressable
                  style={[styles.buttonclassic9, styles.buttonclassicBorder]}
                  onPress={() => navigate('ChooseToken', { mode: 'tokenlist' })}>
                  <View style={styles.textWrapper7}>
                    <Text style={[styles.labelText, styles.textLayout]}>See all assets</Text>
                  </View>
                </Pressable>
              )}
            </View>
            <View style={styles.collectiblesParent}>
              <View style={[styles.collectibles, styles.rowBorder]}>
                <Image
                  style={styles.tapsafeIconLayout}
                  resizeMode="cover"
                  source={require('../assets/icon-collectibles.png')}
                />
                <View style={styles.text18}>
                  <Text style={styles.wealthTypo}>Collectibles</Text>
                  <Text style={[styles.nftsStored, styles.todayClr]}>
                    {numberOfNFTs} NFTs stored.
                  </Text>
                </View>
              </View>
              <View style={[styles.row11, styles.rowBorder]}>
                <View style={styles.headParent1}>
                  <View style={styles.head3}>
                    <View style={styles.rectangleParent}>
                      <Image
                        style={[styles.remixIconslineuseremotion, styles.tapsafeIconLayout]}
                        resizeMode="cover"
                        source={require('../assets/icon-transactions.png')}
                      />
                    </View>
                  </View>
                  <View style={styles.totalParent}>
                    <Text style={styles.wealthTypo}>Activities</Text>
                    <Text style={[styles.viewTheEvolution, styles.todayClr]}>
                      No activities yet.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <Pressable onPress={() => {
              const wallet = {
                currentIndex: 0,
                assets: {
                  stx: {
                    // stx xpub from hardcoded master seed and chain code
                    accounts: [{ amountAvailable: 0 }],
                    xtendedPublicKey: 'cace0d31676ec24c148892c3f024422034610c37cb0032685a71c83ae289dedf7b3a9b4f8127e09255a9317f48149ff656f1a22acbf87b2598cdecd82ddb8901',
                  },
                },
              };
              setCurrentWallet(wallet);
              setupWithKey(
                hexToBytes(
                  // hardcoded master seed and chain code
                  '1d98771ec171a89d860e58fc44ee4b07631ebd156cec21b5dcffaf0525d18e0bc130713f84a75771e60d796e1affd25365f4af6d3668a1b3bb32b0c40b729e02',
                ),
              )
            }}>
              <Text style={[styles.ryderAppVersion, styles.todayClr]}>Ryder App Version 0.0.1</Text>
              <Text style={[styles.ryderAppVersion, styles.todayClr]}>Firmware Version 0.1</Text>
            </Pressable>

          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bannerPosition: {
    height: 202,
    left: 0,
    top: 0,
    position: 'absolute',
    width: '100%',
  },
  textTypo1: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  textTypo: {
    fontSize: 12,
    lineHeight: 16,
  },
  framePosition: {
    left: 0,
    position: 'absolute',
  },
  ellipseIconPosition: {
    top: 11,
    position: 'absolute',
  },
  frameParentFlexBox: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  capacityBg: {
    backgroundColor: '#000',
    position: 'absolute',
  },
  componentLayout: {
    width: 11,
    height: 11,
  },
  rightPosition: {
    top: 13,
    position: 'absolute',
  },
  borderPosition: {
    opacity: 0.3,
    position: 'absolute',
  },
  buttoniconLayout: {
    height: 40,
    width: 40,
  },
  buttonclassicBg: {
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  text1Position: {
    left: '50%',
    top: '50%',
    position: 'absolute',
  },
  pfpPosition: {
    top: 166,
    left: 12,
    position: 'absolute',
  },
  bodySpaceBlock: {
    paddingHorizontal: 12,
    alignSelf: 'stretch',
  },
  textLayout: {
    lineHeight: 20,
    letterSpacing: 0,
  },
  iconWrapperLayout1: {
    height: 16,
    width: 16,
  },
  iconLayout: {
    maxWidth: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  frameLayout: {
    height: 8,
    borderRadius: 100,
  },
  actionsSpaceBlock: {
    marginTop: 32,
    alignSelf: 'stretch',
  },
  row1Layout: {
    width: 366,
    marginTop: 8,
    display: 'none',
  },
  tapsafeIconLayout: {
    width: 32,
    height: 32,
  },
  todayClr: {
    color: '#b3b3b3',
    fontFamily: 'Poppins-Regular',
  },
  buttoniconFlexBox: {
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  parentFlexBox: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  labelTypo: {
    color: '#919191',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0,
  },
  rowSpaceBlock: {
    padding: 20,
    backgroundColor: '#1a1a1a',
    borderRadius: 36,
    overflow: 'hidden',
  },
  buttonclassicAction: {
    borderColor: '#4a4a4a',
    backgroundColor: '#ffffff',
    color: '#000000',
    paddingVertical: 0,
    justifyContent: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  buttonclassicBorder: {
    borderColor: '#4a4a4a',
    backgroundColor: '#2b2b2b',
    paddingVertical: 0,
    justifyContent: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  iconWrapperLayout: {
    height: 20,
    width: 20,
  },
  rowBorder: {
    borderColor: '#2b2b2b',
    borderStyle: 'solid',
  },
  text12Typo: {
    lineHeight: 24,
    letterSpacing: 1,
    color: '#fff',
    fontSize: 16,
    textAlign: 'left',
  },
  wealthTypo: {
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 22,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'left',
    letterSpacing: 0,
  },
  marvinJanssen: {
    textAlign: 'left',
    color: '#000',
    lineHeight: 16,
    fontWeight: '500',
    letterSpacing: 0,
    fontSize: 14,
  },
  text: {
    opacity: 0.7,
    fontFamily: 'Poppins-Regular',
    textAlign: 'left',
    color: '#000',
    letterSpacing: 0,
    fontSize: 12,
  },
  nameId: {
    top: 69,
    left: 12,
    position: 'absolute',
  },
  time: {
    fontSize: 15,
    fontFamily: 'SF Pro',
    textAlign: 'center',
    fontWeight: '600',
    color: '#000',
  },
  timeStyle: {
    top: 10,
    width: 33,
    alignItems: 'center',
    left: 0,
    position: 'absolute',
  },
  lensIcon: {
    left: 101,
    zIndex: 0,
    height: 11,
    top: 13,
    position: 'absolute',
  },
  dynamicIsland: {
    left: 114,
    borderRadius: 37,
    width: 124,
    paddingTop: 13,
    paddingRight: 12,
    paddingBottom: 13,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 37,
    top: 0,
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
    borderColor: '#000',
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
    left: 20,
    width: 350,
    height: 37,
  },
  statusBars: {
    height: 60,
    top: 0,
    width: 390,
  },
  iconLayout1: {
    height: 24,
    width: 24,
  },
  buttoniconOnly: {
    top: 150,
    left: 337,
    backgroundColor: 'rgba(255, 255, 255, 0.32)',
    justifyContent: 'center',
    borderRadius: 16,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    overflow: 'hidden',
  },
  banner: {
    overflow: 'hidden',
  },
  text1: {
    marginTop: -18,
    marginLeft: -8,
    fontSize: 28,
    lineHeight: 36,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  pfpIcon: {
    marginTop: -31,
    marginLeft: -39,
    width: 95,
    height: 77,
  },
  pfp: {
    width: 54,
    height: 54,
    borderRadius: 999,
    backgroundColor: '#fff',
    top: 166,
    left: 12,
    position: 'absolute',
  },
  activityIcon: {
    width: 14,
    height: 14,
  },
  walletBanner: {
    height: 220,
    alignSelf: 'stretch',
  },
  labelTextAction: {
    color: '#000000',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  labelText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  iconWrapper1: {
    marginLeft: 8,
  },
  labelicon: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  labeliconWrapper: {
    paddingVertical: 4,
    marginTop: 4,
  },
  walletBannerParent: {
    zIndex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#131313',
  },
  labelText1: {
    color: '#fff',
    textAlign: 'center',
    lineHeight: 16,
    fontWeight: '500',
    letterSpacing: 0,
    fontSize: 14,
  },
  lineIcon: {
    height: 0,
    display: 'none',
    alignSelf: 'stretch',
  },
  buttonclassic: {
    height: 32,
    display: 'none',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  frameChild: {
    width: 16,
    borderRadius: 100,
    backgroundColor: '#fff',
  },
  frameItem: {
    backgroundColor: '#342f75',
    width: 8,
    marginLeft: 8,
  },
  rectangleParent: {
    flexDirection: 'row',
  },
  buttonclassicParent: {
    display: 'none',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  balance: {
    lineHeight: 22,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    textAlign: 'left',
    letterSpacing: 0,
  },
  text2: {
    fontSize: 32,
    lineHeight: 48,
  },
  text4: {
    fontSize: 24,
    lineHeight: 32,
  },
  text3: {
    fontFamily: 'Poppins-Regular',
  },
  usd2: {
    letterSpacing: 0,
    fontSize: 12,
  },
  usd: {
    color: '#fff',
    textAlign: 'left',
  },
  total: {
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  labelText2: {
    color: '#0b6c44',
    marginLeft: 8,
    textAlign: 'center',
    lineHeight: 16,
    fontWeight: '500',
    letterSpacing: 0,
    fontSize: 14,
  },
  buttonclassic1: {
    height: 32,
    display: 'none',
    marginTop: 4,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  totalParent: {
    marginTop: 12,
    alignSelf: 'stretch',
  },
  balanceParent: {
    marginTop: 0,
    alignSelf: 'stretch',
    marginBottom: 32,
  },
  mainMoney: {
    paddingVertical: 0,
    paddingHorizontal: 20,
    alignSelf: 'stretch',
  },
  separatorIcon: {
    maxHeight: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  send1: {
    marginTop: 8,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 16,
    fontWeight: '500',
    letterSpacing: 0,
    fontSize: 14,
  },
  send: {
    borderRadius: 8,
    width: 74,
    height: 58,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actions: {
    paddingVertical: 0,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  account: {
    backgroundColor: '#222245',
    borderColor: 'rgba(54, 54, 89, 0.95)',
    paddingVertical: 32,
    paddingHorizontal: 0,
    borderRadius: 36,
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  component2: {
    height: 11,
    overflow: 'hidden',
  },
  component4: {
    height: 11,
    width: 11,
  },
  component2Parent: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  labelText3: {
    color: '#131313',
    textAlign: 'center',
    lineHeight: 16,
    fontWeight: '500',
    letterSpacing: 0,
    fontSize: 14,
  },
  textWrapper: {
    paddingHorizontal: 4,
    paddingVertical: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonclassic2: {
    paddingHorizontal: 8,
    height: 32,
    paddingVertical: 0,
    borderRadius: 999,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  viewTheEvolution: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'left',
    alignSelf: 'stretch',
  },
  headParent: {
    paddingVertical: 0,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  iconWrapper6: {
    display: 'none',
  },
  buttonclassic3: {
    paddingHorizontal: 8,
    height: 32,
    paddingVertical: 0,
    justifyContent: 'center',
    borderRadius: 16,
    alignItems: 'center',
    flexDirection: 'row',
  },
  labelText5: {
    color: '#d1d4ff',
    textAlign: 'center',
    lineHeight: 16,
    fontWeight: '500',
    letterSpacing: 0,
    fontSize: 14,
  },
  buttonclassic4: {
    borderColor: '#573ccd',
    paddingHorizontal: 8,
    height: 32,
    paddingVertical: 0,
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    overflow: 'hidden',
  },
  buttonclassicGroup: {
    marginTop: 20,
    paddingVertical: 0,
    paddingHorizontal: 20,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  frameInner: {
    top: 47,
    width: 315,
    height: 0,
    zIndex: 0,
  },
  vectorIcon: {
    top: -3,
    width: 241,
    height: 105,
    zIndex: 1,
  },
  frameChild1: {
    top: 16,
    width: 188,
    height: 84,
    zIndex: 2,
  },
  ellipseIcon: {
    left: 181,
    width: 12,
    height: 12,
    zIndex: 3,
  },
  vectorParent: {
    height: 101,
    paddingRight: 80,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  labelText10: {
    marginTop: 20,
  },
  labelTextParent: {
    paddingRight: 20,
  },
  frameGroup: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  labelTextGroup: {
    paddingLeft: 20,
    paddingRight: 60,
    marginTop: 8,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  frameParent: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  account1: {
    paddingVertical: 20,
    backgroundColor: '#1a1a1a',
    width: 366,
    paddingHorizontal: 0,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonclassic8: {
    paddingHorizontal: 8,
    height: 32,
  },
  head1: {
    alignSelf: 'stretch',
  },
  headGroup: {
    alignSelf: 'stretch',
  },
  personal: {
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: 'left',
    fontSize: 14,
  },
  myRecoveryTags: {
    marginLeft: 4,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    textAlign: 'left',
    fontSize: 14,
    lineHeight: 20,
  },
  iconWrapperParent: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text8: {
    color: '#fff',
    textAlign: 'left',
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
  },
  iconWrapper13: {
    marginLeft: 4,
  },
  parent: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  frameParent1: {
    marginTop: 8,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  frameContainer: {
    marginTop: 4,
    alignSelf: 'stretch',
  },
  frameParent2: {
    marginTop: 4,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  textWrapper7: {
    paddingHorizontal: 8,
    paddingVertical: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconWrapper18: {
    display: 'none',
  },
  buttonclassic9: {
    height: 48,
    marginTop: 20,
    paddingHorizontal: 20,
    alignSelf: 'stretch',
  },
  row1: {
    width: 366,
    marginTop: 8,
    display: 'none',
  },
  buttonclassic10: {
    borderColor: '#fff',
    paddingHorizontal: 8,
    height: 32,
    paddingVertical: 0,
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    overflow: 'hidden',
  },
  tokensFinalIcon: {
    borderRadius: 1249,
    overflow: 'hidden',
  },
  ethereum: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  ethereumParent: {
    marginLeft: 8,
    justifyContent: 'center',
  },
  text12: {
    fontFamily: 'Poppins-Regular',
  },
  frameParent4: {
    borderBottomWidth: 1,
    height: 80,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  row3: {
    padding: 20,
    backgroundColor: '#1a1a1a',
    borderRadius: 36,
    overflow: 'hidden',
    marginTop: 8,
    borderWidth: 1,
    alignSelf: 'stretch',
  },
  nftsStored: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'left',
  },
  text18: {
    marginTop: 12,
  },
  collectibles: {
    padding: 20,
    backgroundColor: '#1a1a1a',
    borderRadius: 36,
    overflow: 'hidden',
    borderWidth: 1,
    flex: 1,
  },
  row1Child: {
    top: -63,
    left: 90,
    width: 127,
    height: 127,
    zIndex: 0,
    position: 'absolute',
  },
  remixIconslineuseremotion: {
    overflow: 'hidden',
  },
  head3: {
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  headParent1: {
    zIndex: 1,
    alignSelf: 'stretch',
  },
  row11: {
    padding: 20,
    backgroundColor: '#1a1a1a',
    borderRadius: 36,
    overflow: 'hidden',
    marginLeft: 8,
    borderWidth: 1,
    flex: 1,
  },
  collectiblesParent: {
    marginTop: 8,
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  buttoniconOnly1: {
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderRadius: 16,
    alignItems: 'center',
    flexDirection: 'row',
  },
  ryderAppVersion: {
    width: 290,
    marginTop: 8,
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 16,
  },
  body: {
    paddingBottom: 340,
    marginTop: 12,
    zIndex: 0,
    alignItems: 'center',
  },
  fullPage: {
    overflow: 'hidden',
    width: '100%',
  },
  home: {
    width: '100%',
    flex: 1,
    backgroundColor: '#131313',
  },
  scrollBackground: {
    backgroundColor: '#131313',
  },
});

export default WalletRyder;

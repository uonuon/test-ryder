import * as React from 'react';
import {Text, StyleSheet, View, Image, Pressable, ScrollView} from 'react-native';
import ScreenHeader from '../../Components/send-asset/ScreenHeader/ScreenHeader';
import {useWallet} from '../../Utils/walletContext';

const SettingsWallet = ({navigation}) => {
  const {navigate} = navigation;
  const {currentDevice, setCurrentDevice} = useWallet();
  if (currentDevice === undefined) {
    navigate('Welcome');
    return;
  }
  const {name, icon, serial} = currentDevice;
  return (
    <View style={styles.settings}>
      <View style={styles.instanceParent}>
        <ScreenHeader title={'Settings'} />
        <View style={[styles.frameParent, styles.frameParentSpaceBlock]}>
          <View style={styles.instanceParent}>
            <Image
              style={styles.oneFrontViewBlackScreen1}
              resizeMode="cover"
              source={require('../assets/one-front-view-black-screen-1.png')}
            />
            <View style={[styles.marvinJanssenParent, styles.parentSpaceBlock]}>
              <Text style={[styles.marvinJanssen, styles.settings1Typo]}>{name}</Text>
              <Text style={styles.ryderWallet1076}>Ryder One {serial}</Text>
            </View>
            <Pressable
              style={[styles.buttonclassic, styles.buttonclassicBorder]}
              onPress={() => setCurrentDevice(undefined)}>
              <View style={[styles.textWrapper, styles.wrapperFlexBox]}>
                <Text style={styles.labelText}>Switch Ryder One</Text>
              </View>
              <Image
                style={styles.iconWrapperLayout}
                resizeMode="cover"
                source={require('../assets/icon-wrapper2.png')}
              />
            </Pressable>
          </View>
          <View style={[styles.frameGroup, styles.frameGroupFlexBox]}>
            <View style={styles.frameContainer}>
              <Image
                style={styles.iconWrapperLayout1}
                resizeMode="cover"
                source={require('../assets/frame-26086140.png')}
              />
              <Text style={[styles.bannerColor, styles.systemTypo]}>Banner color</Text>
            </View>
            <View style={styles.amberParent}>
              <Text style={styles.ryderWallet1076}>Amber</Text>
              <Image
                style={[styles.iconWrapper3, styles.frameItemLayout]}
                resizeMode="cover"
                source={require('../assets/icon-wrapper3.png')}
              />
            </View>
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={styles.frameView}>
          <View style={styles.generalSettingsWrapper}>
            <Text style={styles.ryderWallet1076}>GENERAL SETTINGS</Text>
          </View>
          <View style={[styles.frameParent1, styles.frameParentFlexBox]}>
            <View style={styles.frameContainer}>
              <Image
                style={styles.iconWrapperLayout1}
                resizeMode="cover"
                source={require('../assets/icon-wrapper4.png')}
              />
              <Text style={[styles.bannerColor, styles.systemTypo]}>Theme</Text>
            </View>
            <View style={styles.amberParent}>
              <Text style={[styles.system, styles.systemTypo]}>System</Text>
              <Image
                style={[styles.iconWrapper3, styles.frameItemLayout]}
                resizeMode="cover"
                source={require('../assets/icon-wrapper3.png')}
              />
            </View>
          </View>
          <View style={[styles.frameParent1, styles.frameParentFlexBox]}>
            <View style={styles.frameContainer}>
              <Image
                style={styles.iconWrapperLayout1}
                resizeMode="cover"
                source={require('../assets/icon-wrapper5.png')}
              />
              <Text style={[styles.bannerColor, styles.systemTypo]}>{`Security & privacy`}</Text>
            </View>
            <Image
              style={[styles.frameItem, styles.frameItemLayout]}
              resizeMode="cover"
              source={require('../assets/icon-wrapper3.png')}
            />
          </View>
          <View style={[styles.frameParent1, styles.frameParentFlexBox]}>
            <View style={styles.iconWrapperParent1}>
              <Image
                style={styles.iconWrapperLayout1}
                resizeMode="cover"
                source={require('../assets/icon-wrapper6.png')}
              />
              <View style={styles.notificationsParent}>
                <Text style={[styles.notifications, styles.systemTypo]}>Notifications</Text>
                <View style={[styles.ellipseParent, styles.parentSpaceBlock]}>
                  <Image
                    style={styles.frameInner}
                    resizeMode="cover"
                    source={require('../assets/ellipse-117.png')}
                  />
                  <Text style={[styles.unreadNotifications, styles.ryderAppVersionTypo]}>
                    6 unread notifications
                  </Text>
                </View>
              </View>
            </View>
            <Image
              style={[styles.frameItem, styles.frameItemLayout]}
              resizeMode="cover"
              source={require('../assets/icon-wrapper3.png')}
            />
          </View>
          <View style={[styles.frameParent1, styles.frameParentFlexBox]}>
            <View style={styles.frameContainer}>
              <Image
                style={styles.iconWrapperLayout1}
                resizeMode="cover"
                source={require('../assets/icon-wrapper7.png')}
              />
              <Text style={[styles.bannerColor, styles.systemTypo]}>Newsletter</Text>
            </View>
            <Image
              style={[styles.frameItem, styles.frameItemLayout]}
              resizeMode="cover"
              source={require('../assets/icon-wrapper3.png')}
            />
          </View>
          <View style={[styles.frameParent1, styles.frameParentFlexBox]}>
            <View style={styles.frameContainer}>
              <Image
                style={styles.iconWrapperLayout1}
                resizeMode="cover"
                source={require('../assets/icon-wrapper8.png')}
              />
              <Text style={[styles.bannerColor, styles.systemTypo]}>Tapsafe Recovery</Text>
            </View>
            <Image
              style={[styles.frameItem, styles.frameItemLayout]}
              resizeMode="cover"
              source={require('../assets/icon-wrapper3.png')}
            />
          </View>
          <View style={[styles.frameParent1, styles.frameParentFlexBox]}>
            <View style={styles.frameContainer}>
              <Image
                style={styles.iconWrapperLayout1}
                resizeMode="cover"
                source={require('../assets/icon-wrapper9.png')}
              />
              <Text style={[styles.bannerColor, styles.systemTypo]}>{`My data & wallet`}</Text>
            </View>
            <Image
              style={[styles.frameItem, styles.frameItemLayout]}
              resizeMode="cover"
              source={require('../assets/icon-wrapper3.png')}
            />
          </View>
          <View style={[styles.frameParent1, styles.frameParentFlexBox]}>
            <View style={styles.frameContainer}>
              <Image
                style={styles.iconWrapperLayout1}
                resizeMode="cover"
                source={require('../assets/icon-wrapper10.png')}
              />
              <Text style={[styles.bannerColor, styles.systemTypo]}>FAQ</Text>
            </View>
            <Image
              style={[styles.frameItem, styles.frameItemLayout]}
              resizeMode="cover"
              source={require('../assets/icon-wrapper3.png')}
            />
          </View>
          <View style={[styles.frameParent1, styles.frameParentFlexBox]}>
            <View style={styles.frameContainer}>
              <Image
                style={styles.iconWrapperLayout1}
                resizeMode="cover"
                source={require('../assets/icon-wrapper11.png')}
              />
              <Text style={[styles.bannerColor, styles.systemTypo]}>Send your feedback</Text>
            </View>
            <Image
              style={[styles.frameItem, styles.frameItemLayout]}
              resizeMode="cover"
              source={require('../assets/icon-wrapper3.png')}
            />
          </View>
          <View style={styles.frameParentFlexBox}>
            <View style={styles.frameContainer}>
              <Image
                style={styles.iconWrapperLayout1}
                resizeMode="cover"
                source={require('../assets/icon-wrapper12.png')}
              />
              <Text style={[styles.bannerColor, styles.systemTypo]}>Contact support</Text>
            </View>
            <Image
              style={[styles.frameItem, styles.frameItemLayout]}
              resizeMode="cover"
              source={require('../assets/icon-wrapper3.png')}
            />
          </View>
        </View>
        <View style={[styles.frameParent10, styles.frameParentSpaceBlock]}>
          <View style={styles.frameParent11}>
            <View style={styles.generalSettingsWrapper}>
              <Text style={styles.ryderWallet1076}>TUTORIALS</Text>
            </View>
            <View style={[styles.frameGroup, styles.frameGroupFlexBox]}>
              <View style={styles.frameContainer}>
                <Text style={[styles.notifications, styles.systemTypo]}>
                  Introduction to Ryder One
                </Text>
              </View>
              <Image
                style={[styles.frameItem, styles.frameItemLayout]}
                resizeMode="cover"
                source={require('../assets/frame-26086122.png')}
              />
            </View>
            <View style={[styles.frameGroup, styles.frameGroupFlexBox]}>
              <View style={styles.frameContainer}>
                <Text style={[styles.notifications, styles.systemTypo]}>
                  Send your first transaction
                </Text>
              </View>
              <Image
                style={[styles.frameItem, styles.frameItemLayout]}
                resizeMode="cover"
                source={require('../assets/frame-26086122.png')}
              />
            </View>
            <View style={[styles.frameGroup, styles.frameGroupFlexBox]}>
              <View style={styles.frameContainer}>
                <Text style={[styles.notifications, styles.systemTypo]}>
                  Recover, without seed phrase
                </Text>
              </View>
              <Image
                style={[styles.frameItem, styles.frameItemLayout]}
                resizeMode="cover"
                source={require('../assets/frame-26086122.png')}
              />
            </View>
            <View style={[styles.frameGroup, styles.frameGroupFlexBox]}>
              <View style={styles.frameContainer}>
                <Text style={[styles.notifications, styles.systemTypo]}>
                  How to charge your Ryder One
                </Text>
              </View>
              <Image
                style={[styles.frameItem, styles.frameItemLayout]}
                resizeMode="cover"
                source={require('../assets/frame-26086122.png')}
              />
            </View>
          </View>
          <View style={[styles.buttonclassic1, styles.frameGroupFlexBox]}>
            <View style={[styles.textWrapper, styles.wrapperFlexBox]}>
              <Text style={styles.labelText}>View all tutorials</Text>
            </View>
            <Image style={[styles.iconWrapper14, styles.iconWrapperLayout]} resizeMode="cover" />
          </View>
        </View>
        <Text style={[styles.ryderAppVersion, styles.ryderAppVersionTypo]}>
          Ryder App Version 0.0.1
        </Text>
        <Text style={[styles.ryderAppVersion, styles.ryderAppVersionTypo]}>
          Firmware Version 0.1
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
  settings1Typo: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    textAlign: 'left',
    color: '#fff',
  },
  iconWrapperLayout1: {
    height: 24,
    width: 24,
  },
  frameParentSpaceBlock: {
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 12,
    paddingHorizontal: 24,
    alignSelf: 'stretch',
  },
  parentSpaceBlock: {
    marginTop: 8,
    alignItems: 'center',
  },
  buttonclassicBorder: {
    height: 40,
    justifyContent: 'center',
    paddingVertical: 0,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#fff',
    borderStyle: 'solid',
    overflow: 'hidden',
  },
  frameGroupFlexBox: {
    marginTop: 28,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  systemTypo: {
    fontFamily: 'Poppins-Regular',
    textAlign: 'left',
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: 14,
  },
  frameItemLayout: {
    width: 20,
    height: 20,
  },
  frameParentFlexBox: {
    height: 80,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  ryderAppVersionTypo: {
    fontSize: 12,
    lineHeight: 16,
    color: '#b3b3b3',
    fontFamily: 'Poppins-Regular',
  },
  iconWrapperLayout: {
    height: 16,
    width: 16,
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
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
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
    flexDirection: 'row',
    height: 37,
    position: 'absolute',
    alignItems: 'center',
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
    width: 22,
    borderWidth: 1,
    borderColor: '#fff',
    opacity: 0.3,
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
    backgroundColor: '#fff',
    width: 18,
    height: 7,
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
    height: 37,
    position: 'absolute',
  },
  statusBars: {
    width: 390,
    height: 60,
  },
  settings1: {
    textAlign: 'left',
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  iconWrapper1: {
    opacity: 0,
  },
  iconWrapperParent: {
    paddingHorizontal: 12,
    paddingVertical: 0,
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  instanceParent: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  oneFrontViewBlackScreen1: {
    borderRadius: 11,
    width: 86,
    height: 109,
  },
  marvinJanssen: {
    fontSize: 22,
    lineHeight: 28,
    textAlign: 'left',
  },
  ryderWallet1076: {
    color: '#b3b3b3',
    fontFamily: 'Poppins-Regular',
    textAlign: 'left',
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: 14,
  },
  marvinJanssenParent: {
    justifyContent: 'center',
  },
  labelText: {
    lineHeight: 16,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    letterSpacing: 0,
    fontSize: 14,
    textAlign: 'center',
    color: '#fff',
  },
  textWrapper: {
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  buttonclassic: {
    borderRadius: 999,
    marginTop: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  bannerColor: {
    marginLeft: 8,
    color: '#fff',
  },
  frameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper3: {
    marginLeft: 4,
    height: 20,
  },
  amberParent: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  frameGroup: {
    justifyContent: 'space-between',
  },
  frameParent: {
    marginTop: 12,
    alignItems: 'center',
  },
  generalSettingsWrapper: {
    width: 342,
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  system: {
    color: '#919191',
  },
  frameParent1: {
    borderColor: '#2b2b2b',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    height: 80,
  },
  frameItem: {
    height: 20,
  },
  notifications: {
    color: '#fff',
  },
  frameInner: {
    width: 8,
    height: 8,
  },
  unreadNotifications: {
    marginLeft: 4,
    textAlign: 'left',
  },
  ellipseParent: {
    flexDirection: 'row',
  },
  notificationsParent: {
    marginLeft: 8,
    justifyContent: 'center',
  },
  iconWrapperParent1: {
    flexDirection: 'row',
  },
  frameView: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#131313',
    paddingTop: 24,
    marginTop: 12,
    paddingHorizontal: 24,
    alignSelf: 'stretch',
  },
  frameParent11: {
    alignSelf: 'stretch',
  },
  iconWrapper14: {
    display: 'none',
  },
  buttonclassic1: {
    borderRadius: 16,
    height: 40,
    justifyContent: 'center',
    paddingVertical: 0,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#fff',
    borderStyle: 'solid',
    overflow: 'hidden',
  },
  frameParent10: {
    marginTop: 12,
    backgroundColor: '#1a1a1a',
    paddingVertical: 12,
    borderRadius: 12,
  },
  ryderAppVersion: {
    width: 290,
    marginTop: 12,
    textAlign: 'left',
    paddingHorizontal: 24,
  },
  settings: {
    flex: 1,
    width: '100%',
    paddingBottom: 32,
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
  },
});

export default SettingsWallet;

import * as React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {Contact} from '../../../../lib/contacts/contacts';
import {SupportedAssets} from '../../../../lib/tokens/tokens';
const ellipse = (text: string) => {
  return text.length < 10 ? text : `${text.substring(0, 5)}..${text.substring(text.length - 4)}`;
};
const ContactRow = ({
  contact,
  asset,
  onPress,
}: {
  contact: Contact;
  asset: SupportedAssets;
  onPress: (c: Contact) => void;
}) => {
  return (
    <Pressable
      style={[styles.framePressable, styles.rightFlexBox]}
      onPress={() => {
        onPress(contact);
      }}>
      <View style={styles.tokensParent}>
        <Image style={styles.tokensIcon} resizeMode="cover" source={contact.icon} />
        <View style={styles.contactParent}>
          <Text style={[styles.name, styles.nameTypo]}>{contact.name}</Text>
          <Text style={[styles.address, styles.addressTypo]}>
            {contact.address[asset] ? ellipse(contact.address[asset]!) : ''}
          </Text>
        </View>
      </View>
      <Image
        style={styles.iconWrapperLayout}
        resizeMode="cover"
        source={require('./assets/icon-wrapper3.png')}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  rightFlexBox: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  parentFlexBox: {
    paddingVertical: 0,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
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
  addressTypo: {
    color: '#b3b3b3',
    fontFamily: 'Poppins-Regular',
    textAlign: 'left',
    letterSpacing: 0,
    fontSize: 14,
  },
  iconWrapperLayout: {
    height: 24,
    width: 24,
  },
  nameTypo: {
    fontSize: 16,
    textAlign: 'left',
    color: '#fff',
  },
  time: {
    fontSize: 15,
    fontFamily: 'SF Pro',
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
  },
  timeStyle: {
    top: 10,
    left: 0,
    width: 33,
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
    borderWidth: 1,
    width: 22,
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
  },
  statusBars: {
    width: 390,
    height: 60,
  },
  settings: {
    lineHeight: 20,
    color: '#fff',
  },
  iconWrapperParent: {
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  instanceParent: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  enterNameOr: {
    lineHeight: 16,
  },
  frameChild: {
    maxWidth: '100%',
    height: 16,
    overflow: 'hidden',
  },
  paste: {
    color: '#7b61ff',
    marginLeft: 12,
    lineHeight: 16,
  },
  enterNameOrAddressParent: {
    borderRadius: 8,
    backgroundColor: '#1a1a1a',
    paddingVertical: 16,
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
  trustedContactList: {
    lineHeight: 22,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    letterSpacing: 0,
    fontWeight: '600',
  },
  tokensIcon: {
    borderRadius: 1186,
    width: 38,
    height: 38,
    overflow: 'hidden',
  },
  name: {
    letterSpacing: 1,
    lineHeight: 24,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    fontSize: 16,
  },
  address: {
    lineHeight: 20,
  },
  contactParent: {
    justifyContent: 'center',
    marginLeft: 8,
  },
  tokensParent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  framePressable: {
    borderColor: '#2b2b2b',
    borderBottomWidth: 1,
    height: 80,
    borderStyle: 'solid',
    alignSelf: 'stretch',
  },
  frameContainer: {
    marginTop: 8,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  trustedContactListParent: {
    marginTop: 32,
    alignSelf: 'stretch',
  },
  frameParent: {
    paddingHorizontal: 24,
    marginTop: 20,
  },
  send: {
    backgroundColor: '#131313',
    width: '100%',
    height: 844,
    alignItems: 'center',
    overflow: 'hidden',
  },
});

export default ContactRow;

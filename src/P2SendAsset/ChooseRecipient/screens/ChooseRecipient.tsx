import * as React from 'react';
import {Text, StyleSheet, View, Image, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Contact} from '../../../../lib/contacts/contacts';
import ContactRow from '../../../Components/send-asset/Contact/ContactRow';
import {useUserAddressBook} from '../../../Utils/userAddressBookContext';
import ScreenHeader from '../../../Components/send-asset/ScreenHeader/ScreenHeader';
import AddressInput from '../../../Components/send-asset/AddressInput/AddressInput';

const ChooseRecipient = ({route}) => {
  const {navigate, goBack} = useNavigation();
  const {asset} = route.params;
  const {contacts} = useUserAddressBook();
  const selectRecipient = (recipient: Contact) => {
    navigate('ChooseAmount', {asset, recipient});
  };
  return (
    <SafeAreaView style={[styles.send, styles.sendFlexBox]}>
      <View style={styles.instanceParent}>
        <ScreenHeader title={'Send'} />
        <View style={[styles.frameParent, styles.parentFlexBox]}>
          <View style={styles.trustedContactListParent}>
            <Text style={[styles.trustedContactList, styles.julienNreTypo]}>
              Trusted contact list
            </Text>
            <View style={styles.frameContainer}>
              {contacts.map((c: Contact, index: number) => {
                return (
                  <ContactRow key={index} asset={asset} contact={c} onPress={selectRecipient} />
                );
              })}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sendFlexBox: {
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  parentFlexBox: {
    paddingVertical: 0,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  julienNreTypo: {
    fontSize: 16,
    textAlign: 'left',
    color: '#fff',
  },
  instanceParent: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  trustedContactList: {
    lineHeight: 22,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    letterSpacing: 0,
    fontWeight: '600',
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

export default ChooseRecipient;

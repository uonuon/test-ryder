import * as React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Contact} from '../../../../lib/contacts/contacts';

const Recipient = ({recipient}: {recipient: Contact}) => {
  return (
    <View style={styles.tokensParent}>
      {recipient.icon && (
        <Image
          style={[styles.tokensIcon, styles.iconWrapperLayout]}
          resizeMode="cover"
          source={recipient.icon}
        />
      )}
      <Text style={[styles.julienNre, styles.labelTypo]}>{recipient.address.stx}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  iconWrapperLayout: {
    height: 20,
    width: 20,
    marginRight: 4,
  },
  labelTypo: {
    marginLeft: 0,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    letterSpacing: 0,
    textAlign: 'left',
  },
  tokensIcon: {
    borderRadius: 624,
    overflow: 'hidden',
  },
  julienNre: {
    lineHeight: 22,
    color: '#fff',
  },
  tokensParent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Recipient;

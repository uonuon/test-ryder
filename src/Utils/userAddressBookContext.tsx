// Settings Context - src/context/Settings
import {createContext, useContext} from 'react';
import {Contact} from '../../lib/contacts/contacts';

export const UserAddressBookContext = createContext<{contacts: Contact[]}>({
  contacts: [
    {
      name: 'Julien Nérée',
      address: {
        stx: 'SP1PJWKS5V3X7JR300J3W291DDNCKD6M6XKJFYPAC',
        btc: 'bc1qwncc7cuj2yq9q4zjcdym0sq3hkld0cpzt5x02t',
      },
      icon: require('./AddressBook/julien.png'),
    },
    {
      name: 'Marvin Janssen',
      address: {
        btc: '1Mof4nRzxemB115xEK2sRFQmddHq2qFqAE',
        stx: 'SP8A9HZ3PKST0S42VM9523Z9NV42SZ026V4K39WH',
      },
      icon: require('./AddressBook/marvin.png'),
    },
    {
      name: 'Louise Ivan',
      address: {
        btc: 'bc1qfqr7pf9yt2gmr3f3mr5s4fjd9gp8vychd9lyy9',
      },
      icon: require('./AddressBook/louise.png'),
    },
  ],
});

export const useUserAddressBook = () => {
  return useContext(UserAddressBookContext);
};

import {createMockExtendedPublicKey} from '../../lib/ryder-one-mock';
import {Device, Wallet} from './walletContext';

export const FAKE_SERIAL = '#4021';

export function setFakeDevice1(
  setCurrentDevice: React.Dispatch<React.SetStateAction<Device | undefined>>,
  setCurrentWallet: React.Dispatch<React.SetStateAction<Wallet>>,
) {
  const serial = FAKE_SERIAL;
  const device = {icon: undefined, name: 'Thunderbolt', serial};
  setCurrentDevice(device);
  const wallet: Wallet = {
    currentIndex: 0,
    assets: {
      stx: {
        accounts: [{amountAvailable: 429.34521}],
        xtendedPublicKey: createMockExtendedPublicKey(),
      },
    },
  };
  setCurrentWallet(wallet);
}

export function setFakeDevice2(
  setCurrentDevice: React.Dispatch<React.SetStateAction<Device | undefined>>,
  setCurrentWallet: React.Dispatch<React.SetStateAction<Wallet>>,
) {
  const serial = FAKE_SERIAL;
  const device = {icon: undefined, name: 'Demo', serial};
  setCurrentDevice(device);
  const wallet: Wallet = {
    currentIndex: 0,
    assets: {
      stx: {
        accounts: [{amountAvailable: 0}],
        xtendedPublicKey: createMockExtendedPublicKey(),
      },
    },
  };
  setCurrentWallet(wallet);
}

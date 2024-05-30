// import RNSecureKeyStore, { ACCESSIBLE } from "react-native-secure-key-store";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RyderOneKey} from './ryder-one';

const RYDER_ONE_KEY = 'ryder-one';
const BACKUP_SHARE_PHONE = 'ryder-one-backup-share-phone';
const USER_PASSCODE = 'user-passcode';

export async function storeRyderOneKey(data: RyderOneKey) {
  // // For storing key
  // RNSecureKeyStore.set(RYDER_ONE_KEY, data, { accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY })
  //     .then((res) => {
  //         console.log(res);
  //     }, (err) => {
  //         console.log(err);
  //     });
  return Promise.resolve(true);
}

export async function removeRyderOneKey() {
  // RNSecureKeyStore.remove(RYDER_ONE_KEY)
  // .then((res) => {
  // 	console.log(res);
  // }, (err) => {
  // 	console.log(err);
  // });
}

export function storeBackupSharePhone(share: string) {
  AsyncStorage.setItem(BACKUP_SHARE_PHONE, share);
}

export function getStoredBackupSharePhone() {
  return AsyncStorage.getItem(BACKUP_SHARE_PHONE);
}

export async function storeAppPasscode(passcode: string) {
  AsyncStorage.setItem(USER_PASSCODE, passcode);
}

export async function getStoredAppPasscode() {
  return AsyncStorage.getItem(USER_PASSCODE);
}

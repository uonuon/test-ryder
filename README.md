# react-native-ryder-one-app

uses react-native-nfc-manager:

uses react-native-paper: icons needs to be installed on Android/ios from react-native-vector-icons

## Contributing

### Getting started with Android

1. Set `JAVA_HOME` to point to JDK17 (not JRE or you get jlink missing error)
1. Install Android Studio and enable Android SDK CLI tools (Settings -> Languages & Frameworks -> Android SDK -> SDK Tools -> Android SDK Command-line Tools)
1. Set `ANDROID_HOME` to point to Android SDK (default is $HOME/Android/Sdk)
1. Add `$ANDROID_HOME/platform-tools` and `$ANDROID_HOME/emulator` to `PATH`
1. Enable USB debugging on phone and connect it
1. Clone repo https://github.com/Light-Labs/react-native-ryder-one-app
1. Switch to `feat/demo-2024-04` or other working branch
1. `npm install`
1. `npm run start`
1. `npm run android`

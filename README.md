# Installing requirements
- Install npm
- Install packages: `cd src && npm i`


# Running on Android
Installation steps are adapted from [the React Native site](https://reactnative.dev/docs/environment-setup).
- Install OpenJDK 11: `choco install -y openjdk11` on Windows
- Install Android Studio
- Install Android 11 SDK by opening Android Studio > Configure > SDK Manager
  - Select "SDK platforms" tab, check the "show package details" box, expand Android 11, and
  ensure that "Android SDK Platform 30" and "Intel x86 Atom_64 System Image" are checked
  - Select "SDK Tools" tab, check "show package details", expand "Android SDK Build-Tools", and
  ensure 30.0.2 is selected
  - Click apply to download and install the necessary components
- Configure the ANDROID_HOME environment variable to point to your Android SDK (default location: `%LOCALAPPDATA%/Android/Sdk`)
`cd src && npx react-native run-android`

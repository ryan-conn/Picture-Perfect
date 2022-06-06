import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import { Camera as ExpoCamera } from 'expo-camera';
import styles from './styles';
import ShutterButton from './ShutterButton';
import SettingButton  from './SettingButton';
import { CameraSetting } from '../../redux/cameraSettings';
import Camera from './Camera';


const CameraPage: React.FC = () => {
  const [hasCameraPermission, setHasCameraPermission] = React.useState<Boolean>();

  React.useEffect(() => {
    (async () => {
      // Hide status bar
      StatusBar.setHidden(true, 'fade');

      // Request camera permission
      const { status } = await ExpoCamera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  const cameraSettings = [
    CameraSetting.ISO,
    CameraSetting.ShutterSpeed,
    CameraSetting.Focus,
    CameraSetting.WhiteBalance
  ];

  const settingButtons = cameraSettings.map((setting) => (
    <View style={styles.settingButtonContainer} key={setting}>
      <SettingButton setting={setting} />
    </View>
  ));

  if (hasCameraPermission === undefined) return <View style={styles.background} />;
  else if (hasCameraPermission === false) return <Text>Camera permission denied.</Text>;
  return (
    <View style={styles.background}>
      <View style={styles.settingsContainer}>
        {settingButtons}
      </View>
      <Camera style={styles.cameraContainer} />
      <View style={styles.shutterButtonContainer}>
        <ShutterButton />
      </View>
    </View>
  );
};

export default CameraPage;

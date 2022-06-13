import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import { Camera as ExpoCamera } from 'expo-camera';
import styles from './styles';
import ShutterButton from './ShutterButton';
import SettingButton, { AdjustableCameraSetting }  from './SettingButton/SettingButton';
import { CameraSetting } from '../../redux/cameraSettings';
import Camera from './Camera';
import Slider from '@react-native-community/slider';

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

  const cameraSettings: AdjustableCameraSetting[] = [
    CameraSetting.ExposureTime,
    CameraSetting.FocusDistance,
    CameraSetting.ISO,
    // CameraSetting.WhiteBalance
  ];

  const settingButtons = cameraSettings.map((setting) => (
    <SettingButton setting={setting} key={setting} />
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
        <Slider style={{ width: 90 }} />
      </View>
    </View>
  );
};

export default CameraPage;

import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import styles from './styles';
import ShutterButton from './ShutterButton';
import SettingButton, { CameraSetting } from './SettingButton';


const CameraPage: React.FunctionComponent = () => {
  const [hasCameraPermission, setHasCameraPermission] = React.useState<Boolean>();

  React.useEffect(() => {
    (async () => {
      // Hide status bar
      StatusBar.setHidden(true, 'fade');

      // Request camera permission
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  if (hasCameraPermission === undefined) return <View />;
  else if (hasCameraPermission === false) return <Text>Camera permission denied.</Text>;
  return (
    <View style={styles.background}>
      <View style={styles.settingsContainer}>
      </View>
      <Camera style={styles.cameraContainer} type={CameraType.back} useCamera2Api ratio="16:9" />
      <View style={styles.shutterButtonContainer}>
        <ShutterButton />
      </View>
    </View>
  );
};

export default CameraPage;

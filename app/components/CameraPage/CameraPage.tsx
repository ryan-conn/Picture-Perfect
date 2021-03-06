import React from 'react';
import { Text, View } from 'react-native';
import { Camera as ExpoCamera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import ShutterButton from './ShutterButton';
import SettingButton, { AdjustableCameraSetting }  from './SettingButton/SettingButton';
import { CameraSetting } from '../../redux/cameraSettings';
import Camera from './Camera';
import { CameraPageNavigationProp } from '../common/NavigationStack/NavigationStack';
import FocusAwareStatusBar from '../common/FocusAwareStatusBar/FocusAwareStatusBar';

const CameraPage: React.FC = () => {
  const navigation = useNavigation<CameraPageNavigationProp>();
  const [hasCameraPermission, setHasCameraPermission] = React.useState<Boolean>();

  React.useEffect(() => {
    (async () => {
      // Request camera permission
      const { status } = await ExpoCamera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();

  }, []);

  const cameraSettings: AdjustableCameraSetting[] = [
    CameraSetting.FocusDistance,
    CameraSetting.ExposureTime,
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
      <FocusAwareStatusBar hidden />
      <View style={styles.settingsContainer}>
        {settingButtons}
      </View>
      <Camera style={styles.cameraContainer} />
      <View style={styles.shutterButtonContainer}>
        <ShutterButton onPress={() => navigation.navigate('Evaluation')} />
      </View>
    </View>
  );
};

export default CameraPage;

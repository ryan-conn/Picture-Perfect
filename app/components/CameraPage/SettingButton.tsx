import React from 'react';
import { IconButton, Text } from 'react-native-paper';
import { CameraSetting } from '../../redux/cameraSettings';
import styles from './styles';

const CameraSettingIcons: Record<CameraSetting, JSX.Element> = {
  [CameraSetting.ISO]: <Text style={styles.settingNameText}>ISO</Text>,
  [CameraSetting.ShutterSpeed]: <IconButton source="camera-iris" size={24} />,
  [CameraSetting.Focus]: <IconButton source="image-filter-center-focus" size={24} />,
  [CameraSetting.WhiteBalance]: <Text style={styles.settingNameText}>WB</Text>,
};

export interface SettingButtonProps {
  setting: CameraSetting,
  enabled?: Boolean,
};

const SettingButton: React.FC<SettingButtonProps> = ({ setting, enabled = true }) => {
  return (
    <React.Fragment />
  );
};

export default SettingButton;

import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import React from 'react';
import { Button, IconButton } from 'react-native-paper';
import { CameraSetting, setAutoExposure, setAutoFocus, setAutoWhiteBalance } from '../../../redux/cameraSettings';
import { useDispatch, useSelector } from '../../../redux/store';

export type AutoCameraSetting = (
  CameraSetting.AutoExposure
  | CameraSetting.AutoFocus
  | CameraSetting.AutoWhiteBalance
);

interface AutoSettingProps {
  setter: ActionCreatorWithPayload<any>,
  autoIcon: string,
  manualIcon: string,
};

const autoSettingProps: Record<AutoCameraSetting, AutoSettingProps> = {
  [CameraSetting.AutoExposure]: {
    setter: setAutoExposure,
    autoIcon: "brightness-auto",
    manualIcon: "brightness-5",
  },
  [CameraSetting.AutoFocus]: {
    setter: setAutoFocus,
    autoIcon: "focus-auto",
    manualIcon: "focus-field-horizontal",
  },
  [CameraSetting.AutoWhiteBalance]: {
    setter: setAutoWhiteBalance,
    autoIcon: "white-balance-auto",
    manualIcon: "white-balance-sunny",
  },
};

interface SettingAutoToggleProps {
  setting: AutoCameraSetting,
  style?: object,
  size: number,
}

const SettingAutoToggle: React.FC<SettingAutoToggleProps> = ({ setting, size, style={} }) => {
  const dispatch = useDispatch();
  const props = autoSettingProps[setting];
  const auto = useSelector((state) => state.cameraSettings[setting]);
  const handlePress = () => dispatch(props.setter(!auto));
  const icon = auto ? props.autoIcon : props.manualIcon;

  return (
    <IconButton
      icon={icon}
      color="white"
      size={size}
      style={style}
      onPress={handlePress}
    />
  );
};

export default SettingAutoToggle;

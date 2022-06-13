import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import React from 'react';
import { Animated, Pressable, StyleProp, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  CameraSetting, getAvailableExposureTimes, getAvailableISOValues, getAvailableZoomValues, setAutoExposure, setAutoFocus, setExposureTime, setFocusDistance, setISO, setWhiteBalance
} from '../../../redux/cameraSettings';
import { useDispatch, useSelector } from '../../../redux/store';
import Slider from '../../common/Slider/Slider';
import styles from './styles';

export type AdjustableCameraSetting = (
  CameraSetting.ISO
  | CameraSetting.ExposureTime
  | CameraSetting.FocusDistance
  // | CameraSetting.WhiteBalance
);

interface SettingProps {
  // Icon to use for setting button
  icon: JSX.Element,
  // Redux action to set the new value
  setter: ActionCreatorWithPayload<any>,
  // Redux action to set auto on/off
  autoSetter: ActionCreatorWithPayload<any>,
  // Callback to get the range of possible values for the setting
  getRange: () => Promise<[number, number]>,
  // Unit to display after the setting value
  unit: string,
};

// TODO: add white balance once implemented
const cameraSettingProps: Record<AdjustableCameraSetting, SettingProps> = {
  [CameraSetting.ISO]: {
    icon: <Text style={styles.settingNameText}>ISO</Text>,
    setter: setISO,
    autoSetter: setAutoExposure,
    getRange: getAvailableISOValues,
    unit: '',
  },
  [CameraSetting.ExposureTime]: {
    icon: <MaterialCommunityIcons name="camera-iris" color="white" size={24} />,
    setter: setExposureTime,
    autoSetter: setAutoExposure,
    getRange: getAvailableExposureTimes,
    unit: '',
  },
  [CameraSetting.FocusDistance]: {
    icon: <MaterialCommunityIcons name="image-filter-center-focus" color="white" size={24} />,
    setter: setFocusDistance,
    autoSetter: setAutoFocus,
    // TODO: range correct?
    getRange: getAvailableZoomValues,
    unit: '',
  },
  // [CameraSetting.WhiteBalance]: {
  //   icon: <Text style={styles.settingNameText}>WB</Text>,
  //   setter: setWhiteBalance,
  //   getRange: getAvail
  //   unit: 'K',
  // },
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface SettingButtonProps {
  setting: AdjustableCameraSetting,
  enabled?: Boolean,
};

// TODO: rotate button with device
const SettingButton: React.FC<SettingButtonProps> = ({ setting, enabled = true }) => {
  const props = cameraSettingProps[setting];
  const value = useSelector((state) => state.cameraSettings[setting]);
  const [expanded, setExpanded] = React.useState(false);

  // Determine setting range on initial render
  const [range, setRange] = React.useState<[number, number]>();
  React.useEffect(() => {
    props.getRange().then((calculatedRange) => {
      setRange(calculatedRange)
    });
  }, []);

  // Transition background color on touch
  const animation = React.useRef(new Animated.Value(0)).current;
  const expand = () => Animated.timing(animation, { toValue: 0.8, duration: 300, useNativeDriver: false }).start();
  const collapse = () => Animated.timing(animation, { toValue: 0, duration: 300, useNativeDriver: false }).start();
  const touchableStyle = {
    ...styles.settingButtonContainer,
    backgroundColor: animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.5)'],
    }),
    borderRadius: 6,
  };

  const handleButtonPress = () => {
    const newExpanded = !expanded
    setExpanded(newExpanded);
    newExpanded ? expand() : collapse();
  };

  const slider = expanded ? (
    <View style={styles.sliderContainer} pointerEvents="box-none">
      <Slider value={40} range={[20, 60]} onChange={() => {}} />
    </View>
  ) : null;

  return (
    <AnimatedPressable style={touchableStyle} onPress={handleButtonPress}>
      {props.icon}
      <Text style={styles.settingValueText}>
        {value + props.unit}
      </Text>
      {slider}
    </AnimatedPressable>
  );
};

export default SettingButton;

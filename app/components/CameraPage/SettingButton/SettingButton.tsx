import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import React from 'react';
import { Animated, Pressable, StyleProp, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  CameraSetting, getAvailableExposureTimes, getAvailableFocusDistances, getAvailableISOValues, getAvailableZoomValues, setAutoExposure, setAutoFocus, setExposureTime, setFocusDistance, setISO, setWhiteBalance
} from '../../../redux/cameraSettings';
import { useDispatch, useSelector } from '../../../redux/store';
import Slider from '../../common/Slider/Slider';
import SettingAutoToggle, { AutoCameraSetting } from './SettingAutoToggle';
import styles, { autoToggleSize } from './styles';

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
  autoSetting: AutoCameraSetting,
  // Callback to get the range of possible values for the setting
  getRange: () => Promise<[number, number]>,
  // Unit to display after the setting value
  unit: string,
  // Multiplier to use for the raw setting value when displaying to user (default 1)
  formattedMultiplier?: number,
};

// TODO: add white balance once implemented
const cameraSettingProps: Record<AdjustableCameraSetting, SettingProps> = {
  [CameraSetting.ISO]: {
    icon: <Text style={styles.settingNameText}>ISO</Text>,
    setter: setISO,
    autoSetting: CameraSetting.AutoExposure,
    getRange: getAvailableISOValues,
    unit: '',
  },
  [CameraSetting.ExposureTime]: {
    icon: <MaterialCommunityIcons name="camera-iris" color="white" size={24} />,
    setter: setExposureTime,
    autoSetting: CameraSetting.AutoExposure,
    getRange: getAvailableExposureTimes,
    formattedMultiplier: 1 / 1000000000,
    unit: 's',
  },
  [CameraSetting.FocusDistance]: {
    icon: <MaterialCommunityIcons name="image-filter-center-focus" color="white" size={24} />,
    setter: setFocusDistance,
    autoSetting: CameraSetting.AutoFocus,
    // TODO: range correct?
    getRange: getAvailableFocusDistances,
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

function formatValue(value: number, unit: string, isAuto: boolean, formattedMultiplier = 1) {
  if (isAuto) return 'AUTO';
  value = value * formattedMultiplier;
  let displayValue;
  if (value % 1 === 0) displayValue = value;
  else if (Math.abs(value) < 100) displayValue = value.toFixed(2);
  else displayValue = Math.round(value);
  return displayValue + unit;
};

// TODO: rotate button with device
const SettingButton: React.FC<SettingButtonProps> = ({ setting, enabled = true }) => {
  const dispatch = useDispatch();

  const props = cameraSettingProps[setting];
  const cameraSettingState = useSelector((state) => state.cameraSettings);
  const value = cameraSettingState[setting]
  const isAuto = cameraSettingState[props.autoSetting];

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
  const expand = () => Animated.timing(animation, { toValue: 1, duration: 300, useNativeDriver: false }).start();
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

  // TODO: debounce updates
  const handleSliderChange = (newValue: number) => {
    dispatch(props.setter(newValue));
  };

  const slider = (expanded && range) ? (
    <View style={styles.sliderContainer}>
      <View style={styles.slider}>
        <Slider value={value} range={range} onChange={handleSliderChange} />
      </View>
      <View style={styles.autoToggle}>
        <SettingAutoToggle setting={props.autoSetting} size={autoToggleSize} />
      </View>
    </View>
  ) : null;

  return (
    <AnimatedPressable style={touchableStyle} onPress={handleButtonPress}>
      {props.icon}
      <Text style={styles.settingValueText}>
        {formatValue(value, props.unit, isAuto, props.formattedMultiplier)}
      </Text>
      {slider}
    </AnimatedPressable>
  );
};

export default SettingButton;

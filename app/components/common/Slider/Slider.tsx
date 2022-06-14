import React from 'react';
import { Animated, GestureResponderEvent, LayoutChangeEvent, LayoutRectangle, PanResponder, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { clamp } from '../../../utils/math';
import styles from './styles';

interface SliderElementInfo {
  x: number,
  y: number,
  height: number,
  width: number,
}

interface SliderProps {
  style?: object,
  value: number,
  range: [number, number],
  onChange: (value: number) => any,
};

// TODO: currently only works when vertical due to how PanResponder handles event locations
const Slider: React.FC<SliderProps> = ({
  value: valueProp,
  range,
  onChange: handleChange,
  style={}
}) => {
  const [lower, upper] = range;
  const value = React.useRef(new Animated.Value(valueProp)).current;
  const sliderRef = React.useRef<View>(null);
  const [sliderElementInfo, setSliderElementInfo] = React.useState<SliderElementInfo>();
  const [pressed, setPressed] = React.useState(false);

  // Respond to touch events
  const panResponder = React.useMemo(() => {
    const layout: SliderElementInfo = sliderElementInfo || { x: 0, y: 0, width: 20, height: 150 };
    const updateValueFromEvent = (e: GestureResponderEvent) => {
        // Transform value to range [0, 1] depending on position of slider
        let newValue = clamp((e.nativeEvent.pageY - layout.y) / layout.height, 0, 1);
        // Transform to actual range [lower, upper]
        newValue = lower + (newValue * (upper - lower));
        value.setValue(newValue);

        handleChange(newValue);
    };
    return PanResponder.create({
      onPanResponderGrant: (e) => {
        setPressed(true);
        updateValueFromEvent(e);
      },
      onPanResponderRelease: () => setPressed(false),
      onPanResponderMove: (e) => {
        updateValueFromEvent(e);
      }
    });
  }, [sliderElementInfo]);

  // Create slider knob that gives feedback when pressed and moves with touch
  let slider = undefined;
  if (sliderElementInfo) {
    const sliderFilledWidth = value.interpolate({
        inputRange: [lower, upper],
        outputRange: [0, sliderElementInfo.height],
        extrapolate: "clamp",
    });
    const sliderKnobStyle = {
      ...styles.sliderKnobOuter,
      ...(pressed ? styles.sliderPressed : {}),
      left: sliderFilledWidth,
    };

    slider = (
      <>
        <View style={styles.sliderBarContainer}>
          <Animated.View style={{ ...styles.sliderBarFilled, width: sliderFilledWidth }} />
          <View style={{ ...styles.sliderBarUnfilled }} />
        </View>
        <Animated.View style={sliderKnobStyle} pointerEvents="none">
          <View style={styles.sliderKnobInner} />
        </Animated.View>
      </>
    );
  }

  const handleLayout = (e: LayoutChangeEvent) => {
    sliderRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
      // Rerender component now that slider knob location can be calculated
      setSliderElementInfo({
        x: pageX,
        y: pageY,
        width,
        height,
      });
    });
  };

  return (
    <View style={style} pointerEvents="auto">
      <View
        style={styles.sliderContainer}
        ref={sliderRef}
        hitSlop={16}
        onLayout={handleLayout}
        {...panResponder.panHandlers}
        onStartShouldSetResponderCapture={() => true}
      >
        {slider}
      </View>
    </View>
  );
};

export default Slider;

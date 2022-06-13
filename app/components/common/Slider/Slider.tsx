import React from 'react';
import { Animated, LayoutChangeEvent, LayoutRectangle, PanResponder, View } from 'react-native';
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
  const xPosition = React.useRef(new Animated.Value(0)).current;
  const sliderRef = React.useRef<View>();
  const [sliderElementInfo, setSliderElementInfo] = React.useState<SliderElementInfo>();
  const [pressed, setPressed] = React.useState(false);

  // Respond to touch events
  const panResponder = React.useRef(
    PanResponder.create({
      onPanResponderGrant: (e) => {
        setPressed(true);
        xPosition.setValue(e.nativeEvent.pageY);
      },
      onPanResponderRelease: () => setPressed(false),
      onPanResponderMove: (e) => {
        xPosition.setValue(e.nativeEvent.pageY);
      }
    })
  ).current;

  // Create slider knob that gives feedback when pressed and moves with touch
  let slider = undefined;
  if (sliderElementInfo) {
    const sliderFilledWidth = xPosition.interpolate({
        inputRange: [sliderElementInfo.y, sliderElementInfo.y + sliderElementInfo.height],
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
      // Determine position to place slider based on value prop
      xPosition.setValue((valueProp - lower) / (upper - lower) * height + pageY);

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

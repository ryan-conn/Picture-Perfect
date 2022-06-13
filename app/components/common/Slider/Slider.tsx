import React from 'react';
import { Animated, LayoutRectangle, PanResponder, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { clamp } from '../../../utils/math';
import styles from './styles';

interface SliderProps {
  style?: object,
  value: number,
  range: [number, number],
  onChange: (value: number) => any,
};

const Slider: React.FC<SliderProps> = ({
  value: valueProp,
  range,
  onChange: handleChange,
  style={}
}) => {
  const [lower, upper] = range;

  const xPosition = React.useRef(new Animated.Value(0)).current;
  const [pressed, setPressed] = React.useState(false);
  const [sliderLayout, setSliderLayout] = React.useState<LayoutRectangle>();
        // const positionTouched = clamp(gestureState.x0 - e.nativeEvent.locationX, 0, e.nativeEvent.locationX);

  // TODO: probably have to filter events by touch id
  const panResponder = React.useRef(
    PanResponder.create({
      onPanResponderGrant: () => setPressed(true),
      onPanResponderRelease: () => setPressed(false),
      // onPanResponderMove: Animated.event([
      //   {
      //     nativeEvent: {
      //       locationX: xPosition,
      //     },
      //   },
      //   null,
      // ], { useNativeDriver: false }),
      onPanResponderMove: (e, gestureState) => {
        console.log(e.nativeEvent.target);
        xPosition.setValue(e.nativeEvent.locationX);
      }
    })
  ).current;

  // Create slider knob that gives feedback when pressed and moves with touch
  let sliderKnob = undefined;
  if (sliderLayout !== undefined) {
    const sliderKnobStyle = {
      ...styles.sliderKnobOuter,
      ...(pressed ? styles.sliderPressed : {}),
      left: xPosition.interpolate({
        inputRange: [0, sliderLayout.width],
        outputRange: [0, sliderLayout.width],
        extrapolate: "clamp",
      }),
    };

    sliderKnob = (
      <Animated.View style={sliderKnobStyle} pointerEvents="none">
        <View style={styles.sliderKnobInner} />
      </Animated.View>
    );
  }

  return (
    <View style={style} pointerEvents="auto">
      <View
        style={styles.sliderContainer}
        {...panResponder.panHandlers}
        onStartShouldSetResponderCapture={() => true}
        hitSlop={16}
        onLayout={(e) => setSliderLayout(e.nativeEvent.layout)}
      >
        <ProgressBar style={styles.progressBar} progress={0.5} color="white" pointerEvents="none" />
        {sliderKnob}
      </View>
    </View>
  );
};

export default Slider;

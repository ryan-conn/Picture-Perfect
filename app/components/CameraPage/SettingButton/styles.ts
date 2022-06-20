import { Dimensions, StyleSheet } from 'react-native';

export const sliderWidth = Dimensions.get('window').height * 0.2;
console.log(sliderWidth);
const sliderHeight = 32;
const sliderPadding = 12;
const settingButtonSize = 56;

export default StyleSheet.create({
  settingButtonContainer: {
    width: settingButtonSize,
    height: settingButtonSize,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    transform: [{ rotate: '90deg'}],
    position: 'relative',
  },
  settingNameText: {
    fontFamily: 'roboto',
    color: 'white',
    fontSize: 24,
  },
  settingValueText: {
    fontFamily: 'roboto',
    color: 'white',
    fontSize: 16,
  },
  sliderContainer: {
    position: 'absolute',
    left: settingButtonSize + 8,
    display: 'flex',
    flexDirection: 'row',
    width: sliderWidth + sliderPadding * 2 + 8,
    backgroundColor: '#00000080',
    borderRadius: 6,
    padding: sliderPadding,
    height: sliderHeight,
  },
  slider: {
    width: sliderWidth,
    justifyContent: 'center',
  },
  autoToggle: {
    position: 'absolute',
    left: settingButtonSize + sliderWidth + 16,
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
});

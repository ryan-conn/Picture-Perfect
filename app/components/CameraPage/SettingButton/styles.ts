import { Dimensions, StyleSheet } from 'react-native';

const sliderWidth = Dimensions.get('window').height * 0.2;
const sliderHeight = 40;
const sliderPadding = 12;
const settingButtonSize = 56;
export const autoToggleSize = 24;

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
    width: sliderWidth + sliderPadding * 2 + autoToggleSize + 8,
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
    justifyContent: 'center',
  },
});

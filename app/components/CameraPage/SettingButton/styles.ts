import { Dimensions, StyleSheet } from 'react-native';

export const sliderWidth = Dimensions.get('window').height * 0.2;
const sliderHeight = 32;
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
    justifyContent: 'center',
    width: sliderWidth,
    backgroundColor: '#00000080',
    borderRadius: 6,
    padding: 12,
    height: sliderHeight,
  },
});

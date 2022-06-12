import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  settingButtonContainer: {
    width: 56,
    height: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    transform: [{ rotate: '90deg'}],
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
});

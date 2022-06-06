import { Dimensions, StyleSheet } from 'react-native';

// TODO: need to calculate this on each render rather than statically here
const windowSize = Dimensions.get('window');
// Lock to 16:9 aspect ratio and center vertically
const cameraWidth = windowSize.width;
const cameraHeight = cameraWidth * 16 / 9;

const shutterButtonInnerRadius = windowSize.width * 0.15;
const shutterButtonOuterRadius = shutterButtonInnerRadius + windowSize.width * 0.01;

export default StyleSheet.create({
  background: {
    backgroundColor: 'black',
    height: windowSize.height,
    width: windowSize.width,
    display: 'flex',
    flexDirection: 'column',
  },
  cameraContainer: {
    width: cameraWidth,
    minHeight: cameraHeight,
    maxHeight: cameraHeight,
  },
  settingsContainer: {
    flex: 1,
  },
  settingButtonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingNameText: {
    fontFamily: 'roboto',
    fontSize: 24,
  },
  shutterButtonContainer: {
    flex: 1,
    width: windowSize.width,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterButtonInner: {
    backgroundColor: 'white',
    width: shutterButtonInnerRadius,
    height: shutterButtonInnerRadius,
    borderRadius: shutterButtonInnerRadius / 2,
  },
  shutterButtonOuter: {
    backgroundColor: 'gray',
    width: shutterButtonOuterRadius,
    height: shutterButtonOuterRadius,
    borderRadius: shutterButtonOuterRadius / 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

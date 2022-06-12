import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import { setAutoFocus } from '../../redux/cameraSettings';
import { useDispatch, useSelector } from '../../redux/store';
import styles from './styles';

const ShutterButton: React.FC = () => {
  const dispatch = useDispatch();
  const autoFocus = useSelector((state) => state.cameraSettings.autoFocus);

  const handlePress = () => {
    dispatch(setAutoFocus(!autoFocus));
  };

  return (
    <TouchableHighlight style={styles.shutterButtonOuter} onPress={handlePress}>
      <View style={styles.shutterButtonInner} />
    </TouchableHighlight>
  );
};

export default ShutterButton;

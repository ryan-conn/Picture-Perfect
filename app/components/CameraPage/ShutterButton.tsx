import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import styles from './styles';

interface ShutterButtonProps {
  onPress: () => any,
};

const ShutterButton: React.FC<ShutterButtonProps> = ({ onPress: handlePress }) => {
  return (
    <TouchableHighlight style={styles.shutterButtonOuter} onPress={handlePress}>
      <View style={styles.shutterButtonInner} />
    </TouchableHighlight>
  );
};

export default ShutterButton;

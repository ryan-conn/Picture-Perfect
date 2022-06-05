import React from 'react';
import { Alert, TouchableHighlight, View } from 'react-native';
import styles from './styles';

const ShutterButton: React.FC = () => {
  return (
    <TouchableHighlight style={styles.shutterButtonOuter} onPress={() => Alert.alert('Notice', 'Camera pressed! Great job!')}>
      <View style={styles.shutterButtonInner} />
    </TouchableHighlight>
  );
};

export default ShutterButton;

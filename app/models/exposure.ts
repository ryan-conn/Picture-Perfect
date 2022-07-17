import '@tensorflow/tfjs-react-native';
import * as tf from '@tensorflow/tfjs';

const loadModel = tf.ready().then(() => (
  tf.loadLayersModel('10.135.161.168:8000/exposure/model.json')
));

export default function predictExposure(tensor: tf.Tensor) {
  return tf.ready().then(() => {
    return 0.5;
  });
}

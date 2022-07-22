import '@tensorflow/tfjs-react-native';
import * as tf from '@tensorflow/tfjs';

// TODO: try to set up with GPU/webgl
tf.setBackend('cpu');

const initializeExposureModel = tf.ready().then(() => {
  return tf.loadLayersModel('http://10.135.161.168:8000/exposure/model.json')
});

export default function predictExposure(t: tf.Tensor4D) {
  return initializeExposureModel.then((model) => {
    return model.predict(t);
  });
}

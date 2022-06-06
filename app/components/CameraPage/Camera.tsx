import React from 'react';
import { requireNativeComponent, View } from 'react-native';

export interface CameraProps {
  style: any;
};

const Camera = requireNativeComponent('CameraView');

export default Camera;

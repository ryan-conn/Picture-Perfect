import React from 'react';
import {NativeModules } from 'react-native';

const { DeviceInfoModule } = NativeModules;

interface Settings {
  interval: number,
};

const defaultSettings = { interval: 500 };

export function useOrientation(settings = defaultSettings) {
  const [orientation, setOrientation] = React.useState(0);

  React.useEffect(() => {
    const updateOrientation = setInterval(() => {
      DeviceInfoModule.getOrientation().then((value) => {
        setOrientation(value);
      });
    }, settings.interval);
    return () => clearTimeout(updateOrientation);
  }, []);

  return orientation;
};

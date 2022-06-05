import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import CameraPage from './app/components/CameraPage/CameraPage';

const App = () => {
  return (
    <PaperProvider>
      <CameraPage />
    </PaperProvider>
  );
};

export default App;

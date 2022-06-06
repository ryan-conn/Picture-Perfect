import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import store from './app/redux/store';
import CameraPage from './app/components/CameraPage/CameraPage';

const App = () => {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <CameraPage />
      </PaperProvider>
    </StoreProvider>
  );
};

export default App;

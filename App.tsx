import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import NavigationStack from './app/components/common/NavigationStack/NavigationStack';
import store from './app/redux/store';

const App = () => {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <NavigationStack />
      </PaperProvider>
    </StoreProvider>
  );
};

export default App;

import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ThemeProvider } from './lib';
import { theme } from './theme';
import { AppContainer } from './navigation';
import { persistor, store } from './modules/store';
import { ErrorModal } from './components';

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppContainer />
          </PersistGate>
          <ErrorModal />
        </Provider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;

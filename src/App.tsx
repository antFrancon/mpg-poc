import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider } from './lib';
import { theme } from './theme';
import { AppContainer } from './navigation';

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <AppContainer />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;

import * as React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';
import {Router} from 'react-native-router-flux';
import Routes from './routes';
import store from './store';

export default function App() {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <Router>
          <Routes />
        </Router>
      </PaperProvider>
    </StoreProvider>
  );
}

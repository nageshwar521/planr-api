import React from 'react';
import {Scene, Tabs, Stack} from 'react-native-router-flux';
import {Icon} from 'react-native-paper';

const PrivateRoute = () => {
  const isLoggedIn = false;

  return isLoggedIn ? (
    <Stack key="auth">
      <Scene key="home" component={AboutComponent} />
    </Stack>
  ) : (
    <Stack key="home">
      <Scene key="plans" component={AboutComponent} />
    </Stack>
  );
};

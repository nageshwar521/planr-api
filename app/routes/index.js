import React from 'react';
import {Scene, Tabs, Stack} from 'react-native-router-flux';
import {Icon} from 'react-native-paper';
import Login from '../screens/Login';

const Routes = (
  <Stack hideNavBar>
    <Scene key="login" hideNavBar component={Login} />
  </Stack>
);

export default Routes;

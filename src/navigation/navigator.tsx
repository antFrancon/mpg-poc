import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator, StackHeaderLeftButtonProps } from 'react-navigation-stack';

import { HeaderLogo, defaultHeaderStyle } from '../components';
import { PlayersExplorer } from '../pages';

import { Routes } from './routes';

const AppNavigator = createStackNavigator(
  {
    [Routes.PlayersExplorer]: {
      screen: PlayersExplorer,
    },
  },
  {
    initialRouteName: Routes.PlayersExplorer,
    defaultNavigationOptions: () => ({
      headerTitle: '',
      headerStyle: defaultHeaderStyle,
      headerLeft: (props: StackHeaderLeftButtonProps) => <HeaderLogo {...props} />,
    }),
  }
);

export const AppContainer = createAppContainer(AppNavigator);

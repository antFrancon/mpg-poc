import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

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
  }
);

export const AppContainer = createAppContainer(AppNavigator);

import React from 'react';
import { createAppContainer } from 'react-navigation';
import {
  createStackNavigator,
  NavigationStackScreenProps,
  StackHeaderLeftButtonProps,
} from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import { HeaderLogo, defaultHeaderStyle, defaultTabBarOptions, BackButton } from '../components';
import { PlayersExplorer, PlayerCardInfo, PlayerCardMatches } from '../pages';
import { I18n } from '../lib';

import { Routes } from './routes';

const PlayerCardNavigator = createMaterialTopTabNavigator(
  {
    [Routes.PlayerInfo]: {
      screen: PlayerCardInfo,
      navigationOptions: {
        title: I18n.t(`PlayerCard.tabHeaders.playerInfo`),
      },
    },
    [Routes.PlayerMatches]: {
      screen: PlayerCardMatches,
      navigationOptions: {
        title: I18n.t(`PlayerCard.tabHeaders.playerMatches`),
      },
    },
  },
  {
    swipeEnabled: false,
    tabBarOptions: defaultTabBarOptions,
  }
);

const AppNavigator = createStackNavigator(
  {
    [Routes.PlayersExplorer]: {
      screen: PlayersExplorer,
    },
    [Routes.PlayerCard]: {
      screen: PlayerCardNavigator,
      navigationOptions: ({ navigation }: NavigationStackScreenProps) => ({
        headerLeft: () => <BackButton goBack={() => navigation.navigate(Routes.PlayersExplorer)} />,
      }),
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

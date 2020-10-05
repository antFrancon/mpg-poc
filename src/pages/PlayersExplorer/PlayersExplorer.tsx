import React, { FunctionComponent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FlatList } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { useMemoOne } from 'use-memo-one';

import { Page } from '../../components';
import styled from '../../lib/styledComponents';
import {
  ChampionshipId,
  FieldPosition,
  Player,
  PlayersActions,
  playersSelectorFactory,
} from '../../modules';
import { I18n, getFormattedNumber, getFormattedPercentage } from '../../lib';
import { useDispatchCallback } from '../../services';

import { PlayersListHeader, PlayersListItem } from './components';

interface PlayersListColumnConfig {
  key: string;
  flex: number;
  valueFormatter: (item: Player) => string;
  emphasis?: boolean;
}

const PLAYERS_LIST_COLUMNS_CONFIG: PlayersListColumnConfig[] = [
  {
    key: 'playerName',
    flex: 3,
    valueFormatter: ({ lastname }: Player) => lastname,
    emphasis: true,
  },
  {
    key: 'fieldPosition',
    flex: 1,
    valueFormatter: ({ fieldPosition }: Player) =>
      I18n.t(`PlayersExplorer.fieldPositionLabels.${FieldPosition[fieldPosition]}`),
  },
  {
    key: 'club',
    flex: 1,
    valueFormatter: ({ club }: Player) => club,
  },
  {
    key: 'avgRate',
    flex: 1,
    valueFormatter: ({ basicStats: { avgRate } }: Player) =>
      avgRate === '-' ? '-' : getFormattedNumber(avgRate),
  },
  {
    key: 'sumGoals',
    flex: 1,
    valueFormatter: ({ basicStats: { sumGoals } }: Player) => getFormattedNumber(sumGoals),
  },
  {
    key: 'quotation',
    flex: 1,
    valueFormatter: ({ quotation }: Player) => getFormattedNumber(quotation),
  },
  {
    key: 'percentageStarter',
    flex: 1.5,
    valueFormatter: ({ basicStats: { percentageStarter } }: Player) =>
      getFormattedPercentage(percentageStarter),
    emphasis: true,
  },
];

export const PlayersExplorer: FunctionComponent<NavigationStackScreenProps> = ({ navigation }) => {
  const getPlayers = useDispatchCallback(PlayersActions.getPlayers);

  const championshipId = ChampionshipId.Ligue1;
  const season = 2019;

  useEffect(() => {
    getPlayers(championshipId, season);
    navigation.addListener('didFocus', () => {
      getPlayers(championshipId, season);
    });
  }, [navigation, getPlayers, championshipId, season]);

  const playersSelector = playersSelectorFactory(championshipId, season);
  const players = useSelector(playersSelector);

  const renderPlayersListHeader = useMemoOne(
    () => () => (
      <PlayersListHeader
        headerItems={PLAYERS_LIST_COLUMNS_CONFIG.map(({ key, flex }) => ({
          key,
          label: I18n.t(`PlayersExplorer.${key}`),
          flex,
        }))}
      />
    ),
    []
  );
  const renderPlayersListItem = useMemoOne(
    () => ({ item }: { item: Player }) => (
      <PlayersListItem
        rowItems={PLAYERS_LIST_COLUMNS_CONFIG.map(({ key, flex, valueFormatter, emphasis }) => ({
          key: `${item.playerId}-${key}`,
          value: valueFormatter(item),
          flex,
          emphasis,
        }))}
      />
    ),
    []
  );
  const playerKeyExtractor = useMemoOne(() => (item: Player) => `player-${item.playerId}`, []);

  return (
    <PageContainer>
      <PlayersList
        ListHeaderComponent={renderPlayersListHeader}
        data={players}
        renderItem={renderPlayersListItem}
        keyExtractor={playerKeyExtractor}
      />
    </PageContainer>
  );
};

const PageContainer = styled(Page)`
  padding: 0px;
`;

const PlayersList = React.memo(styled(FlatList as new () => FlatList<Player>)`
  flex: 1;
`);

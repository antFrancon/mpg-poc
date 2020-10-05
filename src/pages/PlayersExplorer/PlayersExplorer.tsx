import React, { FunctionComponent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FlatList, View } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { useMemoOne } from 'use-memo-one';

import { Page } from '../../components';
import styled, { css } from '../../lib/styledComponents';
import {
  ChampionshipId,
  FieldPosition,
  Player,
  PlayersActions,
  playersSelectorFactory,
} from '../../modules';
import { I18n, getFormattedNumber, getFormattedPercentage } from '../../lib';
import { useDispatchCallback } from '../../services';

import { PlayersListHeader, PlayersListItem, OptionPicker } from './components';

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

const SEASON_OPTIONS = [
  { key: 2017, label: '2017/2018' },
  { key: 2018, label: '2018/2019' },
  { key: 2019, label: '2019/2020' },
  { key: 2020, label: '2020/2021' },
];

const CHAMPIONSHIP_OPTIONS = [
  { key: ChampionshipId.Ligue1, label: 'Ligue 1' },
  { key: ChampionshipId.Ligue2, label: 'Ligue 2' },
  { key: ChampionshipId.PremiereLeague, label: 'Premiere league' },
  { key: ChampionshipId.LaLiga, label: 'La liga' },
  { key: ChampionshipId.SerieA, label: 'Serie A' },
];

export const PlayersExplorer: FunctionComponent<NavigationStackScreenProps> = ({ navigation }) => {
  const [season, setSeason] = useState<number>(2019);
  const [championshipId, setchampionshipId] = useState<ChampionshipId>(ChampionshipId.Ligue1);

  const getPlayers = useDispatchCallback(PlayersActions.getPlayers);

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
      <FiltersRow>
        <OptionPicker<ChampionshipId>
          options={CHAMPIONSHIP_OPTIONS}
          selectedKey={championshipId}
          onChange={({ key: selectedChampionship }) => {
            setchampionshipId(selectedChampionship);
          }}
        />
        <OptionPicker<number>
          options={SEASON_OPTIONS}
          selectedKey={season}
          onChange={({ key: selectedSeason }) => {
            setSeason(selectedSeason);
          }}
        />
      </FiltersRow>
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

const FiltersRow = styled(View)`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  ${({ theme }) => css`
    padding: ${theme.spacing.x1}px;
  `}
`;

const PlayersList = React.memo(styled(FlatList as new () => FlatList<Player>)`
  flex: 1;
`);

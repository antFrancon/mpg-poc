import React, { FunctionComponent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FlatList, View, ActivityIndicator } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { useMemoOne } from 'use-memo-one';

import { Page } from '../../components';
import styled, { css } from '../../lib/styledComponents';
import {
  ChampionshipId,
  CHAMPIONSHIP_IDS,
  FieldPosition,
  FIELD_POSITIONS,
  isLoadingSelectorFactory,
  LoaderName,
  Player,
  PlayersActions,
  playersSelectorFactory,
} from '../../modules';
import { I18n, getFormattedNumber, getFormattedPercentage } from '../../lib';
import { useDispatchCallback } from '../../services';
import { Routes } from '../../navigation';

import { PlayersListHeader, PlayersListItem, OptionPicker, TextFilter } from './components';

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
      I18n.t(`PlayersExplorer.fieldPositionLabels.short.${FieldPosition[fieldPosition]}`),
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

const CHAMPIONSHIP_OPTIONS = CHAMPIONSHIP_IDS.map((championshipId) => ({
  key: championshipId,
  label: I18n.t(`PlayersExplorer.championshipLabels.${ChampionshipId[championshipId]}`),
}));

const FIELD_POSITION_OPTIONS = FIELD_POSITIONS.map((fieldPosition) => ({
  key: fieldPosition,
  label: I18n.t(`PlayersExplorer.fieldPositionLabels.full.${FieldPosition[fieldPosition]}`),
}));

export const PlayersExplorer: FunctionComponent<NavigationStackScreenProps> = ({ navigation }) => {
  const [season, setSeason] = useState<number>(2019);
  const [championshipId, setchampionshipId] = useState<ChampionshipId>(ChampionshipId.Ligue1);
  const [fieldPosition, setFieldPosition] = useState<FieldPosition>();
  const [name, setName] = useState<string>();

  const getPlayers = useDispatchCallback(PlayersActions.getPlayers);

  useEffect(() => {
    getPlayers(championshipId, season);
    navigation.addListener('didFocus', () => {
      getPlayers(championshipId, season);
    });
  }, [navigation, getPlayers, championshipId, season]);

  const playersSelector = playersSelectorFactory(championshipId, season, fieldPosition, name);
  const players = useSelector(playersSelector);
  const isLoadingPlayersSelector = isLoadingSelectorFactory(LoaderName.GetPlayers);
  const isLoadingPlayers = useSelector(isLoadingPlayersSelector);

  const renderPlayersListHeader = useMemoOne(
    () => () => (
      <PlayersListHeader
        headerItems={PLAYERS_LIST_COLUMNS_CONFIG.map(({ key, flex }) => ({
          key,
          label: I18n.t(`PlayersExplorer.${key}.short`),
          flex,
        }))}
      />
    ),
    []
  );

  const renderPlayersListItem = useMemoOne(
    () => ({ item }: { item: Player }) => (
      <PlayersListItem
        onPress={() => navigation.navigate(Routes.PlayerCard, { playerId: item.playerId })}
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

  const renderChampionshipFilter = useMemoOne(
    () => () => (
      <OptionPicker<ChampionshipId>
        options={CHAMPIONSHIP_OPTIONS}
        onChange={({ key: selectedChampionship }) => {
          setchampionshipId(selectedChampionship);
        }}
        selectedKey={championshipId}
      />
    ),
    [championshipId, setchampionshipId]
  );

  const renderSeasonFilter = useMemoOne(
    () => () => (
      <OptionPicker<number>
        options={SEASON_OPTIONS}
        onChange={({ key: selectedSeason }) => {
          setSeason(selectedSeason);
        }}
        selectedKey={season}
      />
    ),
    [season, setSeason]
  );

  const renderFieldPositionFilter = useMemoOne(
    () => () => (
      <OptionPicker<FieldPosition>
        options={FIELD_POSITION_OPTIONS}
        onChange={({ key: selectedFieldPosition }) => {
          setFieldPosition(selectedFieldPosition);
        }}
        selectedKey={fieldPosition}
        placeholder={I18n.t(`PlayersExplorer.fieldPosition.full`)}
        onReset={() => setFieldPosition(undefined)}
      />
    ),
    [fieldPosition, setFieldPosition]
  );

  const renderNameFilter = useMemoOne(
    () => () => (
      <TextFilter
        onChange={(inputText: string) => {
          if (inputText.length > 0) {
            setName(inputText);
          } else {
            setName(undefined);
          }
        }}
        currentValue={name}
        placeholder={I18n.t(`PlayersExplorer.playerName.full`)}
      />
    ),
    [fieldPosition, setFieldPosition]
  );

  const renderEmptyPlayersList = useMemoOne(
    () => () =>
      isLoadingPlayers ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        <></>
      ),
    [isLoadingPlayers]
  );

  return (
    <PageContainer>
      <FiltersRow>
        {renderChampionshipFilter()}
        {renderSeasonFilter()}
      </FiltersRow>
      <FiltersRow>
        {renderNameFilter()}
        {renderFieldPositionFilter()}
      </FiltersRow>
      {renderPlayersListHeader()}
      <PlayersList
        data={players}
        renderItem={renderPlayersListItem}
        keyExtractor={playerKeyExtractor}
        ListEmptyComponent={renderEmptyPlayersList}
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

const LoaderContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Loader = styled(ActivityIndicator).attrs(({ theme }) => ({
  color: theme.colors.green,
}))``;

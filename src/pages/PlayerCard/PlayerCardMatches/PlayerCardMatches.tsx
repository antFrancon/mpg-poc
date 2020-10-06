import React, { FunctionComponent } from 'react';
import { FlatList, View } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { useMemoOne } from 'use-memo-one';
import { DateTime } from 'luxon';

import styled, { css } from '../../../lib/styledComponents';
import { Loader, Page, Text, ListHeader, ListItem } from '../../../components';
import { computeSeasonLabel, usePlayerDetails } from '../../../services';
import { PlayerCardHeader } from '../components';
import { MatchStats } from '../../../modules';
import { getFormattedNumber, I18n } from '../../../lib';
import { TextType, ThemeColor } from '../../../theme/properties';

interface MatchesListColumnConfig {
  key: string;
  flex: number;
  renderValue: (match: MatchStats) => JSX.Element;
}

const MATCHES_LIST_COLUMNS_CONFIG: MatchesListColumnConfig[] = [
  {
    key: 'day',
    flex: 1,
    renderValue: ({ day, date }: MatchStats) => (
      <ValueContainer>
        <DayLabel>
          {I18n.t('PlayerCard.matches.dayValue', {
            day,
          })}
        </DayLabel>
        <EmptySpace />
        <DateLabel>{DateTime.fromISO(date).toFormat('dd/MM')}</DateLabel>
      </ValueContainer>
    ),
  },
  {
    key: 'teams',
    flex: 2,
    renderValue: ({ score: { away, home } }: MatchStats) => (
      <ValueContainer>
        <TeamLabel>{`Club with id ${home}`}</TeamLabel>
        <EmptySpace />
        <TeamLabel>{`Club with id ${away}`}</TeamLabel>
      </ValueContainer>
    ),
  },
  {
    key: 'score',
    flex: 0.5,
    renderValue: ({ score: { scoreAway, scoreHome } }: MatchStats) => (
      <ValueContainer>
        <ScoreLabel>{`${scoreHome}`}</ScoreLabel>
        <EmptySpace />
        <ScoreLabel>{`${scoreAway}`}</ScoreLabel>
      </ValueContainer>
    ),
  },
  {
    key: 'rate',
    flex: 0.5,
    renderValue: ({ info: { rate } }: MatchStats) => (
      <ValueContainer>
        <RateContainer>
          <RateLabel>{getFormattedNumber(rate)}</RateLabel>
        </RateContainer>
      </ValueContainer>
    ),
  },
];

export const PlayerCardMatches: FunctionComponent<NavigationStackScreenProps> = ({
  navigation,
}) => {
  const playerId: string = navigation.getParam('playerId');
  const season: number = navigation.getParam('season');

  const { playerDetails, isLoadingPlayerDetails } = usePlayerDetails(playerId, season);

  const matchKeyExtractor = useMemoOne(() => (item: MatchStats) => `match-${item.matchId}`, []);

  const renderMatchesListHeader = useMemoOne(
    () => () => (
      <ListHeader
        headerItems={MATCHES_LIST_COLUMNS_CONFIG.map(({ key, flex }) => ({
          key,
          label: I18n.t(`PlayerCard.matches.${key}`),
          flex,
        }))}
      />
    ),
    []
  );

  const renderMatchesListItem = useMemoOne(
    () => ({ item, index }: { item: MatchStats; index: number }) => (
      <ListItem
        rowItems={MATCHES_LIST_COLUMNS_CONFIG.map(({ key, flex, renderValue }) => ({
          key: `${item.matchId}-${key}`,
          renderValue: () => renderValue(item),
          flex,
        }))}
        backgroundColor={index % 2 === 0 ? ThemeColor.White : ThemeColor.LightGrey}
      />
    ),
    []
  );

  if (!playerDetails) {
    if (isLoadingPlayerDetails) {
      return <Loader />;
    }

    return null;
  }

  const {
    firstname,
    lastname,
    fieldPosition,
    club,
    advancedStats: { matches },
  } = playerDetails;

  return (
    <PageContainer>
      <PlayerCardHeader
        firstname={firstname}
        lastname={lastname}
        fieldPosition={fieldPosition}
        club={club}
      />
      <SeasonTitleContainer>
        <SeasonTitle>{computeSeasonLabel(season)}</SeasonTitle>
      </SeasonTitleContainer>
      {renderMatchesListHeader()}
      <MatchesList
        data={matches}
        renderItem={renderMatchesListItem}
        keyExtractor={matchKeyExtractor}
      />
    </PageContainer>
  );
};

const PageContainer = styled(Page)`
  padding: 0px;
`;

const MatchesList = React.memo(styled(FlatList as new () => FlatList<MatchStats>)`
  flex: 1;
`);

const ValueContainer = styled(View)`
  justify-content: center;
  align-items: center;
`;

const DayLabel = styled(Text).attrs({
  color: ThemeColor.Black,
  type: TextType.TabRow,
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})``;

const DateLabel = styled(Text).attrs({
  color: ThemeColor.DarkGrey,
  type: TextType.TabRow,
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})``;

const TeamLabel = styled(Text).attrs({
  color: ThemeColor.Black,
  type: TextType.TabRow,
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})``;

const ScoreLabel = styled(Text).attrs({
  color: ThemeColor.Blue,
  type: TextType.TabRow,
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})``;

const RateContainer = styled(View)`
  justify-content: center;
  align-items: center;
  ${({ theme }) => css`
    background-color: ${theme.colors.darkGrey};
  `}
  width: 28px;
  height: 28px;
  border-radius: 28px;
`;

const RateLabel = styled(Text).attrs({
  color: ThemeColor.LightGrey,
  type: TextType.Body,
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})``;

const EmptySpace = styled(View)`
  ${({ theme }) => css`
    height: ${theme.spacing.x2}px;
  `}
`;

const SeasonTitleContainer = styled(View)`
  justify-content: center;
  align-items: center;
  ${({ theme }) => css`
    padding-bottom: ${theme.spacing.x3}px;
  `}
`;

const SeasonTitle = styled(Text).attrs({
  color: ThemeColor.Black,
  type: TextType.SubTitle,
})``;

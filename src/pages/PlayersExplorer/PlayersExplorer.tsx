import React, { FunctionComponent } from 'react';
import { FlatList } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { useMemoOne } from 'use-memo-one';

import { Page } from '../../components';
import styled from '../../lib/styledComponents';
import { Player } from '../../modules';

import { PlayersListHeader } from './components';
import { PlayersListItem } from './components/PlayersListItem/PlayersListItem';

const players: Player[] = [
  {
    playerId: 'player_4126',
    firstname: 'Gianluigi',
    lastname: 'Buffon',
    position: 1,
    fieldPosition: 10,
    teamId: 149,
    quotation: 13,
    club: 'Paris',
    stats: { avgRate: 5.6, sumGoals: 0, currentChampionship: 1, percentageStarter: 0.45 },
  },
  {
    playerId: 'player_4127',
    firstname: 'Gianluigi',
    lastname: 'Buffon',
    position: 1,
    fieldPosition: 10,
    teamId: 149,
    quotation: 13,
    club: 'Paris',
    stats: { avgRate: 5.6, sumGoals: 0, currentChampionship: 1, percentageStarter: 0.45 },
  },
];

export const PlayersExplorer: FunctionComponent<NavigationStackScreenProps> = () => {
  const renderPlayersListHeader = useMemoOne(() => () => <PlayersListHeader />, []);
  const renderPlayersListItem = useMemoOne(
    () => ({ item }: { item: Player }) => <PlayersListItem playerData={item} />,
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

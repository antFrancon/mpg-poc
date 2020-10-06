import React, { FunctionComponent } from 'react';
import { NavigationStackScreenProps } from 'react-navigation-stack';

import styled from '../../../lib/styledComponents';
import { Loader, Page } from '../../../components';
import { usePlayerDetails } from '../../../services';
import { PlayerCardHeader } from '../components';
import { StatsSummary } from '../components/StatsSummary';

export const PlayerCardInfo: FunctionComponent<NavigationStackScreenProps> = ({ navigation }) => {
  const playerId: string = navigation.getParam('playerId');
  const season: number = navigation.getParam('season');

  const { playerDetails, isLoadingPlayerDetails } = usePlayerDetails(playerId, season);

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
    quotation,
    advancedStats: {
      avgRate,
      sumGoals,
      sumGoalAssist,
      sumPenalties,
      sumYellowCard,
      sumRedCard,
      appearances: { starter, standIn },
    },
  } = playerDetails;

  return (
    <PageContainer>
      <PlayerCardHeader
        firstname={firstname}
        lastname={lastname}
        fieldPosition={fieldPosition}
        club={club}
      />
      <StatsSummary
        season={season}
        avgRate={avgRate}
        sumGoals={sumGoals}
        sumGoalAssist={sumGoalAssist}
        sumPenalties={sumPenalties}
        sumYellowCard={sumYellowCard}
        sumRedCard={sumRedCard}
        quotation={quotation}
        starter={starter}
        standIn={standIn}
      />
    </PageContainer>
  );
};

const PageContainer = styled(Page)`
  padding: 0px;
`;

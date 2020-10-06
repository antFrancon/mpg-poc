import React, { FunctionComponent } from 'react';
import { NavigationStackScreenProps } from 'react-navigation-stack';

import styled from '../../../lib/styledComponents';
import { Loader, Page } from '../../../components';
import { usePlayerDetails } from '../../../services';
import { PlayerCardHeader } from '../components';

export const PlayerCardMatches: FunctionComponent<NavigationStackScreenProps> = ({
  navigation,
}) => {
  const playerId: string = navigation.getParam('playerId');
  const season: number = navigation.getParam('season');

  const { playerDetails, isLoadingPlayerDetails } = usePlayerDetails(playerId, season);

  if (!playerDetails) {
    if (isLoadingPlayerDetails) {
      return <Loader />;
    }

    return null;
  }

  const { firstname, lastname, fieldPosition, club } = playerDetails;

  return (
    <PageContainer>
      <PlayerCardHeader
        firstname={firstname}
        lastname={lastname}
        fieldPosition={fieldPosition}
        club={club}
      />
    </PageContainer>
  );
};

const PageContainer = styled(Page)`
  padding: 0px;
`;

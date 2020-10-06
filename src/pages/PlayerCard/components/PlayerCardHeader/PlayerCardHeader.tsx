import React, { FunctionComponent } from 'react';
import { Image, View } from 'react-native';

import styled, { css } from '../../../../lib/styledComponents';
import { Text } from '../../../../components';
import { TextType, ThemeColor } from '../../../../theme/properties';
import { FieldPosition } from '../../../../modules';
import { I18n } from '../../../../lib';
import { computeNameFromFirstAndLastName } from '../../../../services';
import { images } from '../../../../theme';

const JERSEY_SIZE = 100;

interface PlayerCardHeaderProps {
  firstname: string | null;
  lastname: string;
  fieldPosition: FieldPosition;
  club: string;
}

export const PlayerCardHeader: FunctionComponent<PlayerCardHeaderProps> = React.memo(
  ({ firstname, lastname, fieldPosition, club }) => {
    return (
      <HeaderContainer>
        <JerseyIcon source={images.JerseyIcon} />
        <TitleContainer>
          <PlayerName>{computeNameFromFirstAndLastName(lastname, firstname)}</PlayerName>
          <PlayerFieldPosition>
            {I18n.t(`PlayersExplorer.fieldPositionLabels.full.${FieldPosition[fieldPosition]}`)}
          </PlayerFieldPosition>
          <PlayerClub>{club}</PlayerClub>
        </TitleContainer>
      </HeaderContainer>
    );
  }
);

const HeaderContainer = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${({ theme }) => css`
    padding: ${theme.spacing.x2}px;
  `}
`;

const TitleContainer = styled(View)`
  justify-content: center;
  align-items: flex-start;
  ${({ theme }) => css`
    padding: ${theme.spacing.x2}px;
  `}
`;

const PlayerName = styled(Text).attrs({
  color: ThemeColor.Black,
  type: TextType.Title,
})`
  ${({ theme }) => css`
    padding-bottom: ${theme.spacing.x1}px;
  `}
`;

const PlayerFieldPosition = styled(Text).attrs({
  color: ThemeColor.Black,
  type: TextType.SubTitle,
})`
  ${({ theme }) => css`
    padding-bottom: ${theme.spacing.x1}px;
  `}
`;

const PlayerClub = styled(Text).attrs({
  color: ThemeColor.Black,
  type: TextType.SubTitle,
})`
  ${({ theme }) => css`
    padding-bottom: ${theme.spacing.x1}px;
  `}
`;

const JerseyIcon = styled(Image)`
  justify-content: center;
  align-items: center;
  height: ${JERSEY_SIZE}px;
  width: ${JERSEY_SIZE}px;
  ${({ theme }) => css`
    margin: ${theme.spacing.x2}px;
  `}
`;

import React, { FunctionComponent } from 'react';
import { View } from 'react-native';

import styled, { css, ThemeProps } from '../../../../lib/styledComponents';
import { Text } from '../../../../components';
import { TextType, ThemeColor } from '../../../../theme/properties';
import { getFormattedNumber, I18n } from '../../../../lib';
import { computeSeasonLabel } from '../../../../services';

interface StatsSummaryProps {
  season: number;
  avgRate: number;
  sumGoals: number;
  sumGoalAssist: number;
  sumPenalties: number;
  sumYellowCard: number;
  sumRedCard: number;
  quotation: number;
  starter: number;
  standIn: number;
}

export const StatsSummary: FunctionComponent<StatsSummaryProps> = React.memo(
  ({
    season,
    avgRate,
    sumGoals,
    sumGoalAssist,
    sumPenalties,
    sumYellowCard,
    sumRedCard,
    quotation,
    starter,
    standIn,
  }) => {
    return (
      <StatsSummaryContainer>
        <SeasonTitleContainer>
          <SeasonTitle>{computeSeasonLabel(season)}</SeasonTitle>
        </SeasonTitleContainer>
        <StatsRow>
          <ValueContainer>
            <StatLabel>{I18n.t(`PlayerCard.statsSummary.avgRate`)}</StatLabel>
            <StatValue>{getFormattedNumber(avgRate)}</StatValue>
          </ValueContainer>
          <ValueContainer>
            <StatLabel>{I18n.t(`PlayerCard.statsSummary.sumGoalsIncludingPenalties`)}</StatLabel>
            <StatValue>{`${sumGoals} (${sumPenalties})`}</StatValue>
          </ValueContainer>
        </StatsRow>
        <StatsRow>
          <ValueContainer>
            <StatLabel>{I18n.t(`PlayerCard.statsSummary.starterAndStandIn`)}</StatLabel>
            <StatValue>{`${starter} (${standIn})`}</StatValue>
          </ValueContainer>
          <ValueContainer>
            <StatLabel>{I18n.t(`PlayerCard.statsSummary.quotation`)}</StatLabel>
            <StatValue>{quotation}</StatValue>
          </ValueContainer>
        </StatsRow>
        <StatsRow>
          <ValueContainer>
            <StatLabel>{I18n.t(`PlayerCard.statsSummary.sumGoalAssist`)}</StatLabel>
            <StatValue>{sumGoalAssist}</StatValue>
          </ValueContainer>
          <ValueContainer>
            <StatLabel>{I18n.t(`PlayerCard.statsSummary.yellowAndRedCards`)}</StatLabel>
            <YellowAndRedCardContainer>
              <CardLabelContainer backgroundColor={ThemeColor.Yellow}>
                <CardLabel>{sumYellowCard}</CardLabel>
              </CardLabelContainer>
              <EmptySpace />
              <CardLabelContainer backgroundColor={ThemeColor.Red}>
                <CardLabel>{sumRedCard}</CardLabel>
              </CardLabelContainer>
            </YellowAndRedCardContainer>
          </ValueContainer>
        </StatsRow>
      </StatsSummaryContainer>
    );
  }
);

const StatsSummaryContainer = styled(View)`
  justify-content: center;
  align-items: center;
  ${({ theme }) => css`
    padding: ${theme.spacing.x2}px;
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

const StatsRow = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => css`
    padding-bottom: ${theme.spacing.x3}px;
  `}
`;

const ValueContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const YellowAndRedCardContainer = styled(View)`
  flex-direction: row;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

interface CardLabelProps extends ThemeProps {
  backgroundColor: ThemeColor;
}

const CardLabelContainer = styled(View).attrs(({ theme, backgroundColor }: CardLabelProps) => ({
  backgroundColor: theme.colors[backgroundColor],
}))<CardLabelProps>`
  justify-content: center;
  align-items: center;
  height: 22px;
  width: 18px;
  border-radius: 4px;
`;

const EmptySpace = styled(View)`
  ${({ theme }) => css`
    width: ${theme.spacing.x1}px;
  `}
`;

const CardLabel = styled(Text).attrs({
  color: ThemeColor.White,
  type: TextType.SubTitle,
})``;

const StatLabel = styled(Text).attrs({
  color: ThemeColor.Black,
  type: TextType.Body,
})`
  ${({ theme }) => css`
    padding-bottom: ${theme.spacing.x1}px;
  `}
`;

const StatValue = styled(Text).attrs({
  color: ThemeColor.Black,
  type: TextType.Title,
})``;

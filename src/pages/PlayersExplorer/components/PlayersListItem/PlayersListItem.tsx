import React, { FunctionComponent } from 'react';
import { View } from 'react-native';

import { I18n, getFormattedNumber, getFormattedPercentage } from '../../../../lib';
import styled, { css } from '../../../../lib/styledComponents';
import { Text } from '../../../../components';
import { FieldPosition, Player } from '../../../../modules';
import { TextType, ThemeColor } from '../../../../theme/properties';

interface Props {
  playerData: Player;
}

export const PlayersListItem: FunctionComponent<Props> = ({
  playerData: { lastname, fieldPosition, club, stats, quotation },
}) => {
  return (
    <ValuesRow>
      <ValueContainer flex={3}>
        <Value type={TextType.TabRowBold}>{lastname}</Value>
      </ValueContainer>
      <ValueContainer flex={1}>
        <Value type={TextType.TabRow}>
          {I18n.t(`PlayersExplorer.fieldPositionLabels.${FieldPosition[fieldPosition]}`)}
        </Value>
      </ValueContainer>
      <ValueContainer flex={1}>
        <Value type={TextType.TabRow}>{club}</Value>
      </ValueContainer>
      <ValueContainer flex={1}>
        <Value type={TextType.TabRow}>{getFormattedNumber(stats.avgRate)}</Value>
      </ValueContainer>
      <ValueContainer flex={1}>
        <Value type={TextType.TabRow}>{stats.sumGoals}</Value>
      </ValueContainer>
      <ValueContainer flex={1}>
        <Value type={TextType.TabRow}>{quotation}</Value>
      </ValueContainer>
      <ValueContainer flex={1.5}>
        <Value type={TextType.TabRowBold}>{getFormattedPercentage(stats.percentageStarter)}</Value>
      </ValueContainer>
    </ValuesRow>
  );
};

const ValuesRow = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => css`
    padding-horizontal: ${theme.spacing.x1}px;
    padding-vertical: ${theme.spacing.x2}px;
    background-color: ${theme.colors.white};
    border-bottom-color: ${theme.colors.lightGrey};
  `}
  border-bottom-width: 2px;
`;

const ValueContainer = styled(View)<{ flex: number }>`
  justify-content: center;
  align-items: center;
  ${({ flex }) => css`
    flex: ${flex};
  `}
`;

const Value = styled(Text).attrs({
  color: ThemeColor.Black,
})``;

import React, { FunctionComponent } from 'react';
import { View } from 'react-native';

import styled, { css } from '../../../../lib/styledComponents';
import { Text } from '../../../../components';
import { TextType, ThemeColor } from '../../../../theme/properties';

interface RowItem {
  key: string;
  value: string;
  flex: number;
  emphasis?: boolean;
}

interface PlayersListItemProps {
  rowItems: RowItem[];
}

export const PlayersListItem: FunctionComponent<PlayersListItemProps> = ({ rowItems }) => {
  return (
    <ValuesRow>
      {rowItems.map(({ key, value, flex, emphasis = false }) => {
        return (
          <ValueContainer key={key} flex={flex}>
            <Value type={emphasis ? TextType.TabRowBold : TextType.TabRow}>{value}</Value>
          </ValueContainer>
        );
      })}
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
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})``;

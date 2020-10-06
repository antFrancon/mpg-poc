import React, { FunctionComponent } from 'react';
import { View } from 'react-native';

import { Text } from '../Text';
import styled, { css } from '../../lib/styledComponents';
import { TextType, ThemeColor } from '../../theme/properties';

interface HeaderItem {
  key: string;
  label: string;
  flex: number;
}

interface ListHeaderProps {
  headerItems: HeaderItem[];
}

export const ListHeader: FunctionComponent<ListHeaderProps> = React.memo(({ headerItems }) => {
  return (
    <LabelsRow>
      {headerItems.map(({ key, label, flex }) => {
        return (
          <LabelContainer key={key} flex={flex}>
            <Label>{label}</Label>
          </LabelContainer>
        );
      })}
    </LabelsRow>
  );
});

const LabelsRow = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => css`
    padding: ${theme.spacing.x1}px;
    background-color: ${theme.colors.lightGrey};
  `}
`;

const LabelContainer = styled(View)<{ flex: number }>`
  justify-content: center;
  align-items: center;
  ${({ flex }) => css`
    flex: ${flex};
  `}
`;

const Label = styled(Text).attrs({
  color: ThemeColor.DarkGrey,
  type: TextType.TabHeader,
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})``;

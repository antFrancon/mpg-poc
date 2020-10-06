import React, { FunctionComponent } from 'react';
import { View } from 'react-native';

import styled, { css } from '../../lib/styledComponents';
import { ThemeColor } from '../../theme/properties';

interface RowItem {
  key: string;
  renderValue: () => JSX.Element;
  flex: number;
}

interface ListItemProps {
  rowItems: RowItem[];
  backgroundColor?: ThemeColor;
}

export const ListItem: FunctionComponent<ListItemProps> = React.memo(
  ({ rowItems, backgroundColor }) => {
    return (
      <ContentContainer backgroundColor={backgroundColor}>
        {rowItems.map(({ key, renderValue, flex }) => {
          return (
            <ValueContainer key={key} flex={flex}>
              {renderValue()}
            </ValueContainer>
          );
        })}
      </ContentContainer>
    );
  }
);

const ContentContainer = styled(View)<{ backgroundColor?: ThemeColor }>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  ${({ theme, backgroundColor }) => css`
    padding-horizontal: ${theme.spacing.x1}px;
    padding-vertical: ${theme.spacing.x2}px;
    background-color: ${theme.colors.white};
    border-bottom-color: ${theme.colors.lightGrey};
    background-color: ${theme.colors[backgroundColor ? backgroundColor : ThemeColor.White]};
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

import React, { FunctionComponent } from 'react';
import { View } from 'react-native';
import {} from 'react-native-gesture-handler';
import { NavigationStackScreenProps } from 'react-navigation-stack';

import styled, { css } from '../../../lib/styledComponents';
import { Text } from '../../../components';
import { TextType, ThemeColor } from '../../../theme/properties';

export const PlayerCardMatches: FunctionComponent<NavigationStackScreenProps> = ({}) => {
  return (
    <Container>
      <Label>{'Hello'}</Label>
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  ${({ theme }) => css`
    padding: ${theme.spacing.x1}px;
  `}
`;

const Label = styled(Text).attrs({
  color: ThemeColor.DarkGrey,
  type: TextType.TabHeader,
})``;

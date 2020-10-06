import React, { FunctionComponent } from 'react';
import { ViewProps, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

import styled, { css } from '../../lib/styledComponents';

export const Page: FunctionComponent<ViewProps> = ({ style, children }) => (
  <>
    <SafeAreaViewContainer forceInset={{ top: 'never', bottom: 'always' }}>
      <ViewContainer style={style}>{children}</ViewContainer>
    </SafeAreaViewContainer>
  </>
);

const ViewContainer = styled(View)`
  flex: 1;
  justify-content: flex-start;
  ${({ theme }) => css`
    padding: ${theme.spacing.x2}px;
    background-color: ${theme.colors.white};
  `}
`;

const SafeAreaViewContainer = styled(SafeAreaView)`
  flex: 1;
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
  `}
`;

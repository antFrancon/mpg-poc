import React, { FunctionComponent } from 'react';
import { ActivityIndicator, View } from 'react-native';

import styled from '../../lib/styledComponents';

export const Loader: FunctionComponent<{}> = ({}) => {
  return (
    <LoaderContainer>
      <LoadingIndicator />
    </LoaderContainer>
  );
};

const LoaderContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LoadingIndicator = styled(ActivityIndicator).attrs(({ theme }) => ({
  color: theme.colors.green,
}))``;

import React, { FunctionComponent } from 'react';
import { Image, View } from 'react-native';
import { StackHeaderLeftButtonProps } from 'react-navigation-stack';

import styled, { css } from '../../lib/styledComponents';
import { images } from '../../theme';

const LOGO_WIDTH = 772;
const LOGO_HEIGHT = 300;

export const HeaderLogo: FunctionComponent<StackHeaderLeftButtonProps> = ({}) => {
  return (
    <MPGLogoContainer>
      <MPGLogo source={images.MPGLogo} />
    </MPGLogoContainer>
  );
};

const MPGLogo = styled(Image)`
  justify-content: center;
  align-items: center;
  height: ${LOGO_HEIGHT / 7}px;
  width: ${LOGO_WIDTH / 7}px;
`;

const MPGLogoContainer = styled(View)`
  ${({ theme }) => css`
    padding-left: ${theme.spacing.x2}px;
    padding-bottom: ${theme.spacing.x2}px;
  `}
`;

import React, { FunctionComponent } from 'react';
import { Image, TouchableOpacity } from 'react-native';

import styled, { css } from '../../lib/styledComponents';
import { images } from '../../theme';

interface BackButtonProps {
  goBack: () => void;
}

const BACK_BUTTON_SLOP = 15;
const BACK_ARROW_WIDTH = 35;
const BACK_ARROW_HEIGHT = 30;

export const BackButton: FunctionComponent<BackButtonProps> = ({ goBack }) => {
  return (
    <BackArrowContainer onPress={goBack}>
      <BackArrowIcon source={images.BackArrowIcon} />
    </BackArrowContainer>
  );
};

const BackArrowContainer = styled(TouchableOpacity).attrs({
  hitSlop: {
    bottom: BACK_BUTTON_SLOP,
    top: BACK_BUTTON_SLOP,
    right: BACK_BUTTON_SLOP,
    left: BACK_BUTTON_SLOP,
  },
})`
  align-items: center;
  justify-content: center;
  ${({ theme }) => css`
    padding: ${theme.spacing.x2}px;
  `}
`;

const BackArrowIcon = styled(Image)`
  justify-content: center;
  align-items: center;
  height: ${BACK_ARROW_HEIGHT}px;
  width: ${BACK_ARROW_WIDTH}px;
`;

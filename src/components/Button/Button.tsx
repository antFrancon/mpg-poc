import React, { FunctionComponent } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { Text } from '../Text';
import styled, { css } from '../../lib/styledComponents';
import { TextType, ThemeColor } from '../../theme/properties';

export interface ButtonProps extends TouchableOpacityProps {
  text?: string;
}

export const Button: FunctionComponent<ButtonProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onPress = () => {},
  text,
  children,
  ...rest
}) => (
  <TouchableContainer onPress={onPress} {...rest}>
    {text && <Label>{text}</Label>}
    {children}
  </TouchableContainer>
);

const TouchableContainer = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  height: 48px;
  width: auto;
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
  ${({ theme }) => css`
    background-color: ${theme.colors.blue};
    border-color: ${theme.colors.green};
  `}
`;

const Label = styled(Text).attrs({
  type: TextType.Button,
  color: ThemeColor.White,
})`
  justify-content: center;
`;

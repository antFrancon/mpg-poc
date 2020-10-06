import { Text as DefaultText } from 'react-native';

import styled, { ThemeProps } from '../../lib/styledComponents';
import { TextType, ThemeColor } from '../../theme/properties';

export interface TextProps extends ThemeProps {
  type: TextType;
  color?: ThemeColor;
}

export const Text = styled(DefaultText)<TextProps>`
  font-family: ${({ type, theme }): string => theme.fonts[type].family};
  font-size: ${({ type, theme }): number => theme.fonts[type].size}px;
  font-weight: ${({ type, theme }): string => theme.fonts[type].weight};
  color: ${({ theme, color }): string => (color && theme.colors[color]) || theme.colors.black};
`;

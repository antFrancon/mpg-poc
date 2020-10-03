import * as styledComponents from 'styled-components/native';
import { ThemeProps as BasicThemeProps } from 'styled-components';

import { theme } from '../theme';

const { default: styled, css, ThemeProvider, withTheme } = styledComponents;

export interface ThemeProps extends BasicThemeProps<typeof theme> {}

export { css, ThemeProvider, withTheme };

export default styled;

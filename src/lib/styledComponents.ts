import * as styledComponents from 'styled-components/native';
import { ThemeProps as BasicThemeProps } from 'styled-components';

import { theme } from '../theme';

export interface ThemeProps extends BasicThemeProps<typeof theme> {}

type Override<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

type StyledComponents<T extends object> = Override<
  styledComponents.ReactNativeThemedStyledComponentsModule<T>,
  { default: styledComponents.ReactNativeStyledInterface<T> }
>;

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const { default: styled, css, ThemeProvider, withTheme } = styledComponents as StyledComponents<
  typeof theme
>;

export { css, ThemeProvider, withTheme };

export default styled;

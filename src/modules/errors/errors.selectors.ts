import { IAppState } from '../types';

import { ErrorName } from './errors.types';

export const isInErrorSelectorFactory = (errorName: ErrorName) => (state: IAppState) =>
  state.errors[errorName];

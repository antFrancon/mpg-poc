import { IAppState } from '../types';

import { LoaderName } from './loaders.types';

export const isLoadingSelectorFactory = (loaderName: LoaderName) => (state: IAppState) =>
  state.loaders[loaderName];

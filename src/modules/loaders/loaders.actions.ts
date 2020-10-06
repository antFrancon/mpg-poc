import { ActionsUnion, createAction } from '@martin_hotell/rex-tils';

import { LoadersActionTypes, LoaderName } from './loaders.types';

export const LoadersActions = {
  showLoader: (loaderName: LoaderName) => createAction(LoadersActionTypes.SHOW_LOADER, loaderName),
  hideLoader: (loaderName: LoaderName) => createAction(LoadersActionTypes.HIDE_LOADER, loaderName),
};

export type LoadersActionObjectTypes = ActionsUnion<typeof LoadersActions>;

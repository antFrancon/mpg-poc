import { ActionsUnion, createAction } from '@martin_hotell/rex-tils';

import { ErrorsActionTypes, ErrorName } from './errors.types';

export const ErrorsActions = {
  showError: (errorName: ErrorName) => createAction(ErrorsActionTypes.SHOW_ERROR, errorName),
  hideError: (errorName: ErrorName) => createAction(ErrorsActionTypes.HIDE_ERROR, errorName),
};

export type ErrorsActionObjectTypes = ActionsUnion<typeof ErrorsActions>;

import { Reducer } from 'redux';

import { LoadersState, LoadersActionTypes } from './loaders.types';
import { LoadersActionObjectTypes } from './loaders.actions';

export const initialLoadersState = {};

export const loadersReducer: Reducer<LoadersState, LoadersActionObjectTypes> = (
  state = initialLoadersState,
  action
) => {
  switch (action.type) {
    case LoadersActionTypes.SHOW_LOADER:
      return {
        ...state,
        [action.payload]: true,
      };
    case LoadersActionTypes.HIDE_LOADER:
      return {
        ...state,
        [action.payload]: false,
      };
    default:
      return state;
  }
};

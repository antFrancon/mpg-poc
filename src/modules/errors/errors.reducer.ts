import { Reducer } from 'redux';

import { ErrorsState, ErrorsActionTypes } from './errors.types';
import { ErrorsActionObjectTypes } from './errors.actions';

export const initialErrorsState = {};

export const errorReducer: Reducer<ErrorsState, ErrorsActionObjectTypes> = (
  state = initialErrorsState,
  action
) => {
  switch (action.type) {
    case ErrorsActionTypes.SHOW_ERROR:
      return {
        ...state,
        [action.payload]: true,
      };
    case ErrorsActionTypes.HIDE_ERROR:
      return {
        ...state,
        [action.payload]: false,
      };
    default:
      return state;
  }
};

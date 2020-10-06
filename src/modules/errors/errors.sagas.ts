import { put, call } from 'redux-saga/effects';

import { ErrorName } from './errors.types';
import { ErrorsActions } from './errors.actions';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleErrors = (saga: (...args: any[]) => any) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function* (...args: any[]): any {
    try {
      const result = yield call(saga, ...args);

      return result;
    } catch (err) {
      console.log('Error in saga', err);
      yield put(ErrorsActions.showError(ErrorName.InternalServerError));
    }
  };

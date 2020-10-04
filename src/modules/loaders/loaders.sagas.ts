import { call, put } from 'redux-saga/effects';

import { LoadersActions } from './loaders.actions';
import { LoaderName } from './loaders.types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addLoader = (saga: (...args: any[]) => any, loaderName: LoaderName) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function* (...args: any[]): any {
    try {
      yield put(LoadersActions.showLoader(loaderName));
      const result = yield call(saga, ...args);

      return result;
    } catch (error) {
      throw error;
    } finally {
      yield put(LoadersActions.hideLoader(loaderName));
    }
  };

import { all } from 'redux-saga/effects';

import { getPlayersWatcher } from './players';

export function* watchAll() {
  yield all([getPlayersWatcher()]);
}

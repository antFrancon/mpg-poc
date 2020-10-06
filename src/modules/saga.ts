import { all } from 'redux-saga/effects';

import { getPlayersWatcher, getPlayerDetailsWatcher } from './players';

export function* watchAll() {
  yield all([getPlayersWatcher(), getPlayerDetailsWatcher()]);
}

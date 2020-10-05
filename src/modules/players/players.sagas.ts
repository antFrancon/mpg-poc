import { call, put, takeEvery } from 'redux-saga/effects';
import { ActionsOfType } from '@martin_hotell/rex-tils';

import { addLoader, LoaderName } from '../loaders';
import { handleErrors } from '../errors';
import { statsApiClient } from '../../lib';
import { ServerPlayer } from '../../API';

import { Player, PlayersActionTypes } from './players.types';
import { PlayersActionObjectTypes, PlayersActions } from './players.actions';
import { normalizePlayers } from './players.service';

export function* getPlayersSaga(
  action: ActionsOfType<PlayersActionObjectTypes, PlayersActionTypes.GET_PLAYERS>
) {
  const { championshipId, season } = action.payload;

  const serverPlayers: ServerPlayer[] = yield call(
    statsApiClient.getPlayers,
    championshipId,
    season
  );

  if (serverPlayers.length > 0) {
    const {
      normalizedPlayers: { players },
    }: {
      normalizedPlayers: {
        players: Record<string, Player>;
      };
    } = yield call(normalizePlayers, serverPlayers);

    yield put(PlayersActions.getPlayersSuccess(championshipId, season, players));
  }
}

export function* getPlayersWatcher() {
  yield takeEvery(
    PlayersActionTypes.GET_PLAYERS,
    addLoader(handleErrors(getPlayersSaga), LoaderName.GetPlayers)
  );
}

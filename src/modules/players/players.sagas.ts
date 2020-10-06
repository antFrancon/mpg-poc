import { call, put, takeEvery } from 'redux-saga/effects';
import { ActionsOfType } from '@martin_hotell/rex-tils';

import { addLoader, LoaderName } from '../loaders';
import { handleErrors } from '../errors';
import { statsApiClient } from '../../lib';
import { ServerPlayer, ServerPlayerDetails } from '../../API';

import { Player, PlayerDetails, PlayersActionTypes } from './players.types';
import { PlayersActionObjectTypes, PlayersActions } from './players.actions';
import { normalizePlayers, fromServerPlayerDetailsToAppPlayerDetailsDto } from './players.service';

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

export function* getPlayerDetailsSaga(
  action: ActionsOfType<PlayersActionObjectTypes, PlayersActionTypes.GET_PLAYER_DETAILS>
) {
  const { playerId, season } = action.payload;

  const serverPlayerDetails: ServerPlayerDetails = yield call(
    statsApiClient.getPlayerDetails,
    playerId,
    season
  );

  const playerDetails: PlayerDetails = yield call(
    fromServerPlayerDetailsToAppPlayerDetailsDto,
    serverPlayerDetails
  );

  yield put(PlayersActions.getPlayerDetailsSuccess(playerId, season, playerDetails));
}

export function* getPlayersWatcher() {
  yield takeEvery(
    PlayersActionTypes.GET_PLAYERS,
    addLoader(handleErrors(getPlayersSaga), LoaderName.GetPlayers)
  );
}

export function* getPlayerDetailsWatcher() {
  yield takeEvery(
    PlayersActionTypes.GET_PLAYER_DETAILS,
    addLoader(handleErrors(getPlayerDetailsSaga), LoaderName.GetPlayerDetails)
  );
}

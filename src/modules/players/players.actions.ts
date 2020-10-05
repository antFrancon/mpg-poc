import { ActionsUnion, createAction } from '@martin_hotell/rex-tils';

import { ChampionshipId, PlayersActionTypes, PlayersById } from './players.types';

export const PlayersActions = {
  getPlayers: (championshipId: ChampionshipId, season: number) =>
    createAction(PlayersActionTypes.GET_PLAYERS, { championshipId, season }),
  getPlayersSuccess: (championshipId: ChampionshipId, season: number, players: PlayersById) =>
    createAction(PlayersActionTypes.GET_PLAYERS_SUCCESS, { championshipId, season, players }),
};

export type PlayersActionObjectTypes = ActionsUnion<typeof PlayersActions>;

import { ActionsUnion, createAction } from '@martin_hotell/rex-tils';

import { ChampionshipCode, PlayersActionTypes, PlayersById } from './players.types';

export const PlayersActions = {
  getPlayers: (championshipCode: ChampionshipCode, season: number) =>
    createAction(PlayersActionTypes.GET_PLAYERS, { championshipCode, season }),
  getPlayersSuccess: (championshipCode: ChampionshipCode, season: number, players: PlayersById) =>
    createAction(PlayersActionTypes.GET_PLAYERS_SUCCESS, { championshipCode, season, players }),
};

export type PlayersActionObjectTypes = ActionsUnion<typeof PlayersActions>;

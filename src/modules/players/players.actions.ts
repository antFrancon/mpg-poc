import { ActionsUnion, createAction } from '@martin_hotell/rex-tils';

import { ChampionshipId, PlayerDetails, PlayersActionTypes, PlayersById } from './players.types';

export const PlayersActions = {
  getPlayers: (championshipId: ChampionshipId, season: number) =>
    createAction(PlayersActionTypes.GET_PLAYERS, { championshipId, season }),
  getPlayersSuccess: (championshipId: ChampionshipId, season: number, players: PlayersById) =>
    createAction(PlayersActionTypes.GET_PLAYERS_SUCCESS, { championshipId, season, players }),
  getPlayerDetails: (playerId: string, season: number) =>
    createAction(PlayersActionTypes.GET_PLAYER_DETAILS, { playerId, season }),
  getPlayerDetailsSuccess: (playerId: string, season: number, playerDetails: PlayerDetails) =>
    createAction(PlayersActionTypes.GET_PLAYER_DETAILS_SUCCESS, {
      playerId,
      season,
      playerDetails,
    }),
};

export type PlayersActionObjectTypes = ActionsUnion<typeof PlayersActions>;

import { Reducer } from 'redux';

import { PlayersState, PlayersActionTypes, ChampionshipId } from './players.types';
import { PlayersActionObjectTypes } from './players.actions';

export const initialPlayersState = {
  playersByChampionship: {
    [ChampionshipId.Ligue1]: {},
    [ChampionshipId.Ligue2]: {},
    [ChampionshipId.PremiereLeague]: {},
    [ChampionshipId.LaLiga]: {},
    [ChampionshipId.SerieA]: {},
  },
  detailedPlayersBySeason: {},
};

export const playersReducer: Reducer<PlayersState, PlayersActionObjectTypes> = (
  state = initialPlayersState,
  action
) => {
  switch (action.type) {
    case PlayersActionTypes.GET_PLAYERS_SUCCESS: {
      const { championshipId, season, players: incomingPlayers } = action.payload;

      const currentChampionshipPlayers = state.playersByChampionship[championshipId]
        ? state.playersByChampionship[championshipId]
        : {};
      const currentSeasonPlayers = currentChampionshipPlayers[season]
        ? currentChampionshipPlayers[season]
        : {};

      return {
        ...state,
        playersByChampionship: {
          ...state.playersByChampionship,
          [championshipId]: {
            ...currentChampionshipPlayers,
            [season]: {
              ...currentSeasonPlayers,
              ...incomingPlayers,
            },
          },
        },
      };
    }

    case PlayersActionTypes.GET_PLAYER_DETAILS_SUCCESS: {
      const { playerId, season, playerDetails: incomingPlayerDetails } = action.payload;

      const currentSeasonDetailedPlayers = state.detailedPlayersBySeason[season]
        ? state.detailedPlayersBySeason[season]
        : {};

      return {
        ...state,
        detailedPlayersBySeason: {
          ...state.detailedPlayersBySeason,
          [season]: {
            ...currentSeasonDetailedPlayers,
            [playerId]: incomingPlayerDetails,
          },
        },
      };
    }

    default:
      return state;
  }
};

import { Reducer } from 'redux';

import { PlayersState, PlayersActionTypes, ChampionshipId } from './players.types';
import { PlayersActionObjectTypes } from './players.actions';

export const initialPlayersState = {
  [ChampionshipId.Ligue1]: {},
  [ChampionshipId.Ligue2]: {},
  [ChampionshipId.PremiereLeague]: {},
  [ChampionshipId.LaLiga]: {},
  [ChampionshipId.SerieA]: {},
};

export const playersReducer: Reducer<PlayersState, PlayersActionObjectTypes> = (
  state = initialPlayersState,
  action
) => {
  switch (action.type) {
    case PlayersActionTypes.GET_PLAYERS_SUCCESS:
      const { championshipId, season, players: incomingPlayers } = action.payload;

      const currentChampionshipPlayers = state[championshipId] ? state[championshipId] : {};
      const currentSeasonPlayers = currentChampionshipPlayers[season]
        ? currentChampionshipPlayers[season]
        : {};

      return {
        ...state,
        [championshipId]: {
          ...currentChampionshipPlayers,
          [season]: {
            ...currentSeasonPlayers,
            ...incomingPlayers,
          },
        },
      };
    default:
      return state;
  }
};

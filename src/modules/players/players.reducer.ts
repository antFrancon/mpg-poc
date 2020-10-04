import { Reducer } from 'redux';

import { PlayersState, PlayersActionTypes, ChampionshipCode } from './players.types';
import { PlayersActionObjectTypes } from './players.actions';

export const initialPlayersState = {
  [ChampionshipCode.Ligue1]: {},
  [ChampionshipCode.Ligue2]: {},
  [ChampionshipCode.PremiereLeague]: {},
  [ChampionshipCode.LaLiga]: {},
  [ChampionshipCode.SerieA]: {},
};

export const playersReducer: Reducer<PlayersState, PlayersActionObjectTypes> = (
  state = initialPlayersState,
  action
) => {
  switch (action.type) {
    case PlayersActionTypes.GET_PLAYERS_SUCCESS:
      const { championshipCode, season, players: incomingPlayers } = action.payload;

      const currentChampionshipPlayers = state[championshipCode] ? state[championshipCode] : {};
      const currentSeasonPlayers = currentChampionshipPlayers[season]
        ? currentChampionshipPlayers[season]
        : {};

      return {
        ...state,
        [championshipCode]: {
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

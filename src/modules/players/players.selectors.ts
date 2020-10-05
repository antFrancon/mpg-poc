import { IAppState } from '../types';

import { ChampionshipId, FieldPosition } from './players.types';

export const playersSelectorFactory = (
  championshipId: ChampionshipId,
  season: number,
  fieldPosition?: FieldPosition
) => (state: IAppState) => {
  if (!(state.players[championshipId] && state.players[championshipId][season])) {
    return [];
  }

  let players = Object.values(state.players[championshipId][season]);

  if (fieldPosition !== undefined) {
    players = players.filter((player) => player.fieldPosition === fieldPosition);
  }

  return players.sort((playerA, playerB) => playerB.quotation - playerA.quotation);
};

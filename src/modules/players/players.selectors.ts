import { IAppState } from '../types';

import { ChampionshipId } from './players.types';

export const playersSelectorFactory = (championshipId: ChampionshipId, season: number) => (
  state: IAppState
) =>
  state.players[championshipId] && state.players[championshipId][season]
    ? Object.values(state.players[championshipId][season])
    : [];

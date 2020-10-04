import { IAppState } from '../types';

import { ChampionshipCode } from './players.types';

export const getPlayersSelectorFactory = (championshipCode: ChampionshipCode, season: number) => (
  state: IAppState
) =>
  state.players[championshipCode] && state.players[championshipCode][season]
    ? Object.values(state.players[championshipCode][season])
    : [];

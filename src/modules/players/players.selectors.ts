import { defaultMemoize } from 'reselect';

import { IAppState } from '../types';
import { createObjectSelector } from '../../services';

import { ChampionshipId, FieldPosition } from './players.types';

const playersSelector = (state: IAppState) => state.players;

export const playersSelectorFactory = defaultMemoize(
  (championshipId: ChampionshipId, season: number, fieldPosition?: FieldPosition) =>
    createObjectSelector([playersSelector], (playersRecord) => {
      if (!(playersRecord[championshipId] && playersRecord[championshipId][season])) {
        return [];
      }

      let players = Object.values(playersRecord[championshipId][season]);

      if (fieldPosition !== undefined) {
        players = players.filter((player) => player.fieldPosition === fieldPosition);
      }

      return players.sort((playerA, playerB) => playerB.quotation - playerA.quotation);
    })
);

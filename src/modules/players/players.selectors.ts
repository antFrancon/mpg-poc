import { defaultMemoize } from 'reselect';

import { IAppState } from '../types';
import { createObjectSelector, areStringsCloseToEachOther } from '../../services';

import { ChampionshipId, FieldPosition } from './players.types';

const playersSelector = (state: IAppState) => state.players;

export const playersSelectorFactory = defaultMemoize(
  (championshipId: ChampionshipId, season: number, fieldPosition?: FieldPosition, name?: string) =>
    createObjectSelector([playersSelector], (playersRecord) => {
      if (!(playersRecord[championshipId] && playersRecord[championshipId][season])) {
        return [];
      }

      let players = Object.values(playersRecord[championshipId][season]);

      if (fieldPosition !== undefined) {
        players = players.filter((player) => player.fieldPosition === fieldPosition);
      }

      if (name !== undefined) {
        players = players.filter(
          ({ firstname, lastname }) =>
            areStringsCloseToEachOther(name, lastname) ||
            (firstname && areStringsCloseToEachOther(name, firstname))
        );
      }

      return players.sort((playerA, playerB) => playerB.quotation - playerA.quotation);
    })
);

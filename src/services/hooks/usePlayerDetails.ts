import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  isLoadingSelectorFactory,
  LoaderName,
  playerDetailsSelectorFactory,
  PlayersActions,
} from '../../modules';

import { useDispatchCallback } from './useDispatchCallback';

export const usePlayerDetails = (playerId: string, season: number) => {
  const getPlayerDetails = useDispatchCallback(PlayersActions.getPlayerDetails);

  useEffect(() => {
    getPlayerDetails(playerId, season);
  }, [getPlayerDetails, playerId, season]);

  const playerDetailsSelector = playerDetailsSelectorFactory(playerId, season);
  const playerDetails = useSelector(playerDetailsSelector);
  const isLoadingPlayerDetailsSelector = isLoadingSelectorFactory(LoaderName.GetPlayerDetails);
  const isLoadingPlayerDetails = useSelector(isLoadingPlayerDetailsSelector);

  return { playerDetails, isLoadingPlayerDetails };
};

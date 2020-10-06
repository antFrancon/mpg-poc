import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { ActionCreator } from 'redux';

export const useDispatchCallback = <T>(actionCreator: ActionCreator<T>) => {
  const dispatch = useDispatch();

  return useCallback(
    (...actionPayload: Parameters<typeof actionCreator>) =>
      dispatch(actionCreator(...actionPayload)),
    [dispatch, actionCreator]
  );
};

import { PersistConfig, persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { ReducersMapObject } from 'redux';

import { IAppState } from './types';
import { loadersReducer } from './loaders';
import { errorsReducer } from './errors';
import { playersReducer } from './players';

const persistConfig: PersistConfig<IAppState> = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['loaders', 'errors'],
};

const reducers: ReducersMapObject = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  //@ts-ignore
  loaders: loadersReducer,
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  //@ts-ignore
  errors: errorsReducer,
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  //@ts-ignore
  players: playersReducer,
};

export const rootReducer = persistCombineReducers<IAppState>(persistConfig, reducers);

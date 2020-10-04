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
  loaders: loadersReducer,
  errors: errorsReducer,
  players: playersReducer,
};

export const rootReducer = persistCombineReducers<IAppState>(persistConfig, reducers);

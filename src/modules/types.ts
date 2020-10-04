import { LoadersState } from './loaders';
import { ErrorsState } from './errors';
import { PlayersState } from './players';

export interface IAppState {
  loaders: LoadersState;
  errors: ErrorsState;
  players: PlayersState;
}

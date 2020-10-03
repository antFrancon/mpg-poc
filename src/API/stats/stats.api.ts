import { BaseApi, ApiParams } from '../api';

import { ServerPlayer } from './stats.types';

export class StatsApi extends BaseApi {
  constructor(apiParams: ApiParams) {
    super(apiParams);
  }

  /**
   * Fetch players information (including basic statistics) for a given championship and season
   *
   * @param {number} championshipId Code associated with a national championship
   * @param {number} seasonStartingYear Year corresponding to the beginning of a season
   */
  getPlayers = (championshipId: number, seasonStartingYear: number): Promise<ServerPlayer[]> =>
    this.unauthenticatedClient
      .url(`stats/championship/${championshipId}/${seasonStartingYear}`)
      .get()
      .res();
}

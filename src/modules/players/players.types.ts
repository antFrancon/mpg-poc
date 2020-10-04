export enum PlayersActionTypes {
  GET_PLAYERS = 'GET_PLAYERS',
  GET_PLAYERS_SUCCESS = 'GET_PLAYERS_SUCCESS',
}

export enum FieldPosition {
  GK = 10,
  CD = 20,
  LD = 21,
  DM = 31,
  OM = 32,
  S = 40,
}

export enum ChampionshipCode {
  Ligue1 = 1,
  Ligue2 = 4,
  PremiereLeague = 2,
  LaLiga = 3,
  SerieA = 5,
}

export interface BasicStats {
  avgRate: number;
  sumGoals: number;
  currentChampionship: number;
  percentageStarter: number;
}

export interface Player {
  playerId: string;
  firstname: string;
  lastname: string;
  position: number;
  fieldPosition: FieldPosition;
  teamId: number;
  quotation: number;
  club: string;
  basicStats: BasicStats;
}

export type PlayersById = Record<string, Player>;
export type PlayersBySeason = Record<number, PlayersById>;
export type PlayersByChampionship = Record<ChampionshipCode, PlayersBySeason>;

export interface PlayersState extends PlayersByChampionship {}

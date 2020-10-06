export enum PlayersActionTypes {
  GET_PLAYERS = 'GET_PLAYERS',
  GET_PLAYERS_SUCCESS = 'GET_PLAYERS_SUCCESS',
  GET_PLAYER_DETAILS = 'GET_PLAYER_DETAILS',
  GET_PLAYER_DETAILS_SUCCESS = 'GET_PLAYER_DETAILS_SUCCESS ',
}

export enum FieldPosition {
  GK = 10,
  CD = 20,
  LD = 21,
  DM = 31,
  OM = 32,
  S = 40,
}

export const FIELD_POSITIONS = [
  FieldPosition.GK,
  FieldPosition.CD,
  FieldPosition.LD,
  FieldPosition.DM,
  FieldPosition.OM,
  FieldPosition.S,
];

export enum ChampionshipId {
  Ligue1 = 1,
  Ligue2 = 4,
  PremiereLeague = 2,
  LaLiga = 3,
  SerieA = 5,
}

export const CHAMPIONSHIP_IDS = [
  ChampionshipId.Ligue1,
  ChampionshipId.Ligue2,
  ChampionshipId.PremiereLeague,
  ChampionshipId.LaLiga,
  ChampionshipId.SerieA,
];

export interface PlayerBasicStats {
  avgRate: number | '-';
  sumGoals: number;
  currentChampionship: number;
  percentageStarter: number;
}

export interface AppearancesStats {
  standBy: number;
  standIn: number;
  starter: number;
  total: number;
}

export interface MatchRate {
  day: number;
  matchId: string;
}

export interface MatchStats {
  matchId: string;
  date: Date;
  day: number;
  info: {
    goals: number;
    minsPlayed: number;
    rate: number;
    sub: number;
  };
  score: {
    away: number;
    home: number;
    scoreAway: number;
    scoreHome: number;
  };
  stats: {
    clean_sheet: number;
    dive_save: number;
    error_lead_to_goal: number;
    goals_conceded: number;
    penalty_faced: number;
    penalty_save: number;
    red_card: number;
    saves: number;
    stand_save: number;
    yellow_card: number;
  };
}

export interface PlayerAdvancedStats {
  playerStatsId: string;
  currentChampionship: ChampionshipId;
  appearances: AppearancesStats;
  avgRate: number;
  lastFiveRate: Record<string, MatchRate>;
  matches: MatchStats[];
  goalsConcededByMatch: number;
  percentageSaveShot: number;
  percentageStarter: number;
  sumCleanSheet: number;
  sumDeflect: number;
  sumGoals: number;
  sumPenaltyFaced: number;
  sumPenaltySave: number;
  sumRedCard: number;
  sumSaves: number;
  sumYellowCard: number;
}

export interface ChampionshipStats {
  active: boolean;
  availableSince: Date;
  championship: ChampionshipId;
  teamId: string;
  club: string;
  joinDate: Date;
  quotation: number;
}

export interface PlayerDetails {
  playerId: string;
  firstname: string | null;
  lastname: string;
  position: number;
  fieldPosition: FieldPosition;
  teamId: number;
  club: string;
  quotation: number;
  calendar: string;
  championship: ChampionshipId;
  championships: Record<string, ChampionshipStats>;
  availableSeasons: number[];
  type: string;
  active: boolean;
  birthDate: Date;
  jerseyNum: string;
  joinDate: Date;
  twitter: string;
  updatedAt: Date;
  advancedStats: PlayerAdvancedStats;
}

export interface Player {
  playerId: string;
  firstname: string | null;
  lastname: string;
  position: number;
  fieldPosition: FieldPosition;
  teamId: number;
  club: string;
  quotation: number;
  basicStats: PlayerBasicStats;
}

export type PlayersById = Record<string, Player>;
export type PlayersBySeason = Record<number, PlayersById>;
export type PlayersByChampionship = Record<ChampionshipId, PlayersBySeason>;

export type DetailedPlayersById = Record<string, PlayerDetails>;
export type DetailedPlayersBySeason = Record<number, DetailedPlayersById>;

export interface PlayersState {
  playersByChampionship: PlayersByChampionship;
  detailedPlayersBySeason: DetailedPlayersBySeason;
}

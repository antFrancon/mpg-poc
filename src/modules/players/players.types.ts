export enum FieldPosition {
  GK = 10,
  CD = 20,
  LD = 21,
  DM = 31,
  OM = 32,
  S = 40,
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
  stats: BasicStats;
}

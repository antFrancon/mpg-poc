export interface ServerBasicStats {
  avgRate: number | '-';
  sumGoals: number;
  currentChampionship: number;
  percentageStarter: number;
}

export interface ServerPlayer {
  id: string;
  firstname: string;
  lastname: string;
  position: number;
  ultraPosition: number;
  teamId: number;
  quotation: number;
  club: string;
  stats: ServerBasicStats;
}

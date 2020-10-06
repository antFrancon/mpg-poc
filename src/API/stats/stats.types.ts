export interface ServerBasicStats {
  avgRate: number | '-';
  sumGoals: number;
  currentChampionship: number;
  percentageStarter: number;
}

export interface ServerPlayer {
  id: string;
  firstname: string | null;
  lastname: string;
  position: number;
  ultraPosition: number;
  teamId: number;
  quotation: number;
  club: string;
  stats: ServerBasicStats;
}

export interface ServerChampionshipStats {
  active: number;
  availableSince: string;
  championship: number;
  club: string;
  joinDate: string;
  quotation: number;
  teamId: string;
}

export interface ServerMatchRate {
  day: number;
  matchId: string;
}

export interface ServerMatchStats {
  date: string;
  day: number;
  id: string;
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

export interface ServerAdvancedStats {
  appearances: {
    standBy: number;
    standIn: number;
    starter: number;
    total: number;
  };
  avgRate: number;
  lastFiveRate: Record<string, ServerMatchRate>;
  matches: ServerMatchStats[];
  currentChampionship: number;
  goalsConcededByMatch: number;
  id: string;
  percentageSaveShot: number;
  percentageStarter: number;
  sumCleanSheet: number;
  sumGoalAssist: number;
  sumPenalties: number;
  sumGoals: number;
  sumPenaltyFaced: number;
  sumPenaltySave: number;
  sumRedCard: number;
  sumSaves: number;
  sumYellowCard: number;
}

export interface ServerPlayerDetails {
  id: string;
  calendar: string;
  championships: Record<string, ServerChampionshipStats>;
  club: string;
  firstname: string;
  lastname: string;
  position: number;
  quotation: number;
  teamId: number;
  type: string;
  ultraPosition: number;
  updatedAt: string;
  active: number;
  birthDate: string;
  championship: number;
  jerseyNum: string;
  joinDate: string;
  twitter: string;
  stats: ServerAdvancedStats;
  availableSeasons: string[];
}

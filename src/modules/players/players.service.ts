import { schema, normalize } from 'normalizr';

import { ServerPlayer, ServerPlayerDetails } from '../../API';

import {
  AppearancesStats,
  ChampionshipId,
  ChampionshipStats,
  FieldPosition,
  MatchRate,
  MatchStats,
  Player,
  PlayerDetails,
} from './players.types';

const fromServerPlayerToAppPlayerDto = ({
  id: playerId,
  firstname,
  lastname,
  position,
  ultraPosition,
  teamId,
  quotation,
  club,
  stats: basicStats,
}: ServerPlayer): Player => ({
  playerId,
  firstname,
  lastname,
  position,
  fieldPosition: ultraPosition as FieldPosition,
  teamId,
  quotation,
  club,
  basicStats,
});

export const normalizePlayers = (serverPlayers: ServerPlayer[]) => {
  const players = serverPlayers.map(fromServerPlayerToAppPlayerDto);

  const playerEntity = new schema.Entity<Player>('players', {}, { idAttribute: 'playerId' });
  const normalizerSchema = [playerEntity];

  const { entities: normalizedPlayers, result: normalizedPlayerIds } = normalize<
    Player,
    { players: Record<string, Player> },
    string[]
  >(players, normalizerSchema);

  return { normalizedPlayers, normalizedPlayerIds };
};

export const fromServerPlayerDetailsToAppPlayerDetailsDto = ({
  id: playerId,
  calendar,
  championships,
  club,
  firstname,
  lastname,
  position,
  quotation,
  teamId,
  type,
  ultraPosition,
  updatedAt,
  active,
  birthDate,
  championship: championshipId,
  jerseyNum,
  joinDate,
  twitter,
  stats: {
    id: playerStatsId,
    currentChampionship,
    appearances,
    avgRate,
    lastFiveRate,
    matches,
    goalsConcededByMatch,
    percentageSaveShot,
    percentageStarter,
    sumCleanSheet,
    sumDeflect,
    sumGoals,
    sumPenaltyFaced,
    sumPenaltySave,
    sumRedCard,
    sumSaves,
    sumYellowCard,
  },
  availableSeasons,
}: ServerPlayerDetails): PlayerDetails => ({
  playerId,
  firstname,
  lastname,
  position,
  fieldPosition: ultraPosition as FieldPosition,
  teamId,
  quotation,
  club,
  calendar,
  championship: championshipId as ChampionshipId,
  availableSeasons: availableSeasons.map((season) => parseInt(season, 10)),
  type,
  active: Boolean(active),
  birthDate: new Date(birthDate),
  jerseyNum,
  joinDate: new Date(joinDate),
  twitter,
  updatedAt: new Date(updatedAt),
  championships: Object.keys(championships).reduce((acc, curr) => {
    const {
      active: championshipActive,
      availableSince: championshipAvailableSince,
      championship: championshipChampionshipId,
      teamId: championshipTeamId,
      club: championshipClub,
      joinDate: championshipJoinDate,
      quotation: championshipQuotation,
    } = championships[curr];

    return {
      ...acc,
      [parseInt(curr, 10) as ChampionshipId]: {
        active: Boolean(championshipActive),
        availableSince: new Date(championshipAvailableSince),
        championship: championshipChampionshipId as ChampionshipId,
        teamId: championshipTeamId,
        club: championshipClub,
        joinDate: new Date(championshipJoinDate),
        quotation: championshipQuotation,
      } as ChampionshipStats,
    };
  }, {}),
  advancedStats: {
    playerStatsId,
    currentChampionship,
    appearances: appearances as AppearancesStats,
    avgRate,
    lastFiveRate: lastFiveRate as Record<string, MatchRate>,
    matches: matches.map(
      ({
        id: matchId,
        date: matchDate,
        day: matchDay,
        info: matchInfo,
        score: matchScore,
        stats: matchStats,
      }) =>
        ({
          matchId,
          date: new Date(matchDate),
          day: matchDay,
          info: matchInfo,
          score: matchScore,
          stats: matchStats,
        } as MatchStats)
    ),
    goalsConcededByMatch,
    percentageSaveShot,
    percentageStarter,
    sumCleanSheet,
    sumDeflect,
    sumGoals,
    sumPenaltyFaced,
    sumPenaltySave,
    sumRedCard,
    sumSaves,
    sumYellowCard,
  },
});

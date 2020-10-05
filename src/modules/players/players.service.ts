import { schema, normalize } from 'normalizr';

import { ServerPlayer } from '../../API';

import { FieldPosition, Player } from './players.types';

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

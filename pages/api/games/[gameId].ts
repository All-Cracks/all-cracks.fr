import { NextApiRequest, NextApiResponse } from 'next';
import database from 'lib/database';

export async function fetchGame(id: string) {
  const game = await database.findById(id).clone();
  if (!game) return null;
  return game;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(404);
  const { gameId } = req.query;
  const game = await fetchGame(gameId as string);
  if (!game) return res.send({ success: false, message: 'unknown game' });
  return res.send({ success: true, game });
}

import { NextApiRequest, NextApiResponse } from 'next';
import database from 'lib/database';

export async function fetchGames() {
  return await database.find({}).clone().exec();
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(404);
  const games = await fetchGames();
  return res.send({ success: true, games });
}

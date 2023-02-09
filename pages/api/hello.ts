import type { NextApiRequest, NextApiResponse } from 'next';
import type { Data } from 'lib/types';

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ name: 'John Doe' });
}

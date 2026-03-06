import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { MongoClient } from 'mongodb';

interface AuthedRequest extends NextApiRequest {
  user?: {
    email: string;
  };
}

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export default async function handler(req: AuthedRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getSession({ req });
    if (!session?.user?.email) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = { email: session.user.email };
    
    await client.connect();
    const database = client.db('devstreamline');
    const allocationsCollection = database.collection('resource_allocations');

    const allocations = await allocationsCollection.find({ email: req.user.email }).toArray();

    return res.status(200).json(allocations);
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  } finally {
    await client.close();
  }
}
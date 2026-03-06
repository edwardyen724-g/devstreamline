import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { getSession } from 'next-auth/react';

interface AuthedRequest extends NextApiRequest {
  user?: {
    email: string;
    name: string;
  };
}

const allocationMap = new Map<string, number>();

const handler = async (req: AuthedRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const rateLimitKey = req.headers['x-real-ip'] || req.connection.remoteAddress;
  
  if (allocationMap.has(rateLimitKey as string)) {
    const requestCount = allocationMap.get(rateLimitKey as string)!;
    if (requestCount >= 5) {
      return res.status(429).json({ message: "Too many requests" });
    }
    allocationMap.set(rateLimitKey as string, requestCount + 1);
  } else {
    allocationMap.set(rateLimitKey as string, 1);
  }

  try {
    const session = await getSession({ req });
    
    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = { email: session.user?.email || '', name: session.user?.name || '' };
    
    const db = await connectToDatabase();
    const allocations = await db.collection('allocations').find({}).toArray();

    return res.status(200).json(allocations);
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
};

export default handler;

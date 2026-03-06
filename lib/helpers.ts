import { MongoClient } from "mongodb";
import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

const mongoUri = process.env.MONGODB_URI as string;
const client = new MongoClient(mongoUri);

export interface AuthedRequest extends NextApiRequest {
  user?: { email: string; name: string; image: string };
}

export const connectToDatabase = async () => {
  try {
    if (!client.isConnected()) await client.connect();
    return client.db();
  } catch (err) {
    throw new Error(`Failed to connect to the database: ${err instanceof Error ? err.message : String(err)}`);
  }
};

export const getUserSession = async (req: AuthedRequest) => {
  try {
    const session = await getSession({ req });
    if (!session) {
      throw new Error("Not authenticated");
    }
    return session.user;
  } catch (err) {
    throw new Error(`Error retrieving session: ${err instanceof Error ? err.message : String(err)}`);
  }
};

export const rateLimit = (() => {
  const requests = new Map<string, { count: number; lastTime: number }>();

  return (key: string) => {
    const limit = 100; // set limit here
    const timeFrame = 15 * 60 * 1000; // 15 minutes

    const now = Date.now();
    const requestData = requests.get(key) || { count: 0, lastTime: now };

    // Reset count if time frame has passed
    if (now - requestData.lastTime > timeFrame) {
      requestData.count = 0;
      requestData.lastTime = now;
    }

    requestData.count += 1;
    requests.set(key, requestData);

    return requestData.count > limit;
  };
})();
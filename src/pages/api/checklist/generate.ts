import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { MongoClient } from 'mongodb';

interface AuthedRequest extends NextApiRequest {
  user?: { email: string; name: string };
}

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);
const dbName = process.env.DB_NAME as string;

const generateChecklist = async (teamName: string) => {
  return [
    `Welcome to ${teamName}'s onboarding!`,
    "1. Set up your development environment.",
    "2. Review coding standards and best practices.",
    "3. Familiarize yourself with the version control system.",
    "4. Integrate with our IDE for automated task reminders.",
    "5. Allocate relevant resources per project.",
    "6. Set up customizable keyboard shortcuts.",
    "7. Schedule a one-on-one with your team lead."
  ];
};

export default async function handler(req: AuthedRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req });
    if (!session || !session.user?.email) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const { teamName } = req.body;
    if (!teamName) {
      res.status(400).json({ message: 'Team name is required' });
      return;
    }

    const checklist = await generateChecklist(teamName);

    await client.connect();
    const db = client.db(dbName);
    await db.collection('checklists').insertOne({ teamName, checklist, createdBy: session.user.email });

    res.status(200).json({ checklist });
  } catch (err) {
    res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  } finally {
    await client.close();
  }
}
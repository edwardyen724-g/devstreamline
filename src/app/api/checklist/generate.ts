import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

interface AuthedRequest extends NextApiRequest {
  user?: {
    email: string;
  };
}

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);

async function generateChecklist(req: AuthedRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  try {
    if (!req.user?.email) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const db = client.db('your_database_name');
    const checklistItems = [
      "Set up IDE integration for automated task reminders",
      "Integrate version control insights within your IDE",
      "Create onboarding checklist for new team members",
      "Visualize resource allocation to manage workloads",
      "Customize keyboard shortcuts for repetitive tasks",
    ];

    const checklist = {
      userEmail: req.user.email,
      items: checklistItems,
      createdAt: new Date(),
    };

    await db.collection('checklists').insertOne(checklist);

    return res.status(200).json(checklist);
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  } finally {
    await client.close();
  }
}

export default generateChecklist;
import { MongoClient } from 'mongodb';
import { NextApiRequest } from 'next';
import { User } from 'next-auth';
import { connectToDatabase } from '../lib/mongodb';

export interface AuthedRequest extends NextApiRequest {
  user?: User;
}

export const getCurrentUser = async (req: AuthedRequest): Promise<User | null> => {
  if (!req.user) return null;
  return req.user;
};

export const fetchProjectData = async (projectId: string) => {
  const client = await connectToDatabase();
  const db = client.db();
  try {
    const projectData = await db.collection('projects').findOne({ _id: projectId });
    return projectData;
  } catch (err) {
    throw new Error(`Error fetching project data: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    await client.close();
  }
};

export const generateOnboardingChecklist = (newMembers: string[]) => {
  return newMembers.map(member => ({
    name: member,
    tasks: [
      'Set up development environment',
      'Familiarize with project documentation',
      'Complete code style guide review',
      'Install necessary tooling and libraries',
    ]
  }));
};

export const visualizeResourceAllocation = (resources: Record<string, number>) => {
  const total = Object.values(resources).reduce((acc, curr) => acc + curr, 0);
  return Object.entries(resources).map(([name, allocation]) => ({
    name,
    percentage: ((allocation / total) * 100).toFixed(2) + '%',
  }));
};
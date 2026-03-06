import { NextApiRequest, NextApiResponse } from 'next';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { z } from 'zod';
import admin from 'firebase-admin';

if (!admin.apps.length) {
  initializeApp({
    credential: applicationDefault(),
  });
}

interface AuthedRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
  };
}

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default async function handler(req: AuthedRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = signupSchema.parse(req.body);
  
    const userRecord = await getAuth().createUser({
      email,
      password,
    });

    return res.status(201).json({ uid: userRecord.uid });
  } catch (err) {
    return res.status(400).json({ message: err instanceof Error ? err.message : String(err) });
  }
}
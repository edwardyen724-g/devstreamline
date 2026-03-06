import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { verifyJWT } from '@/lib/auth';
import { NextApiRequest } from 'next/types';

interface AuthedRequest extends NextApiRequest {
  user?: { id: string; email: string };
}

export async function GET(req: AuthedRequest) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = verifyJWT(token);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = await connectToDatabase();
    const reminders = await db.collection('reminders').find({ userId: user.id }).toArray();

    return NextResponse.json(reminders);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}

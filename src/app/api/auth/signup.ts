import { NextResponse } from 'next/server';
import { NextApiRequest } from 'next';
import { initAuth0 } from '@auth0/nextjs-auth0';

const auth0 = initAuth0({
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  scope: 'openid profile email',
  session: {
    cookieLifetime: 60 * 60 * 8,
  },
});

interface AuthedRequest extends NextApiRequest {
  user?: any;
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
    }

    const { user } = await auth0.handleLogin({ email, password });

    return NextResponse.json({ message: 'User created successfully.', user }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}


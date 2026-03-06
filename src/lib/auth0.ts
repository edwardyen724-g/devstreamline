import { NextApiRequest } from 'next';
import { initAuth0 } from '@auth0/nextjs-auth0';

interface AuthedRequest extends NextApiRequest {
  user?: {
    email: string;
    name: string;
    picture: string;
    sub: string;
  };
}

const auth0 = initAuth0({
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  secret: process.env.AUTH0_SECRET,
  routes: {
    login: '/api/auth/login',
    callback: '/api/auth/callback',
    logout: '/api/auth/logout',
    postLogoutRedirect: process.env.NEXT_PUBLIC_BASE_URL,
  },
  session: {
    cookieSecret: process.env.AUTH0_COOKIE_SECRET,
    cookieLifetime: 60 * 60 * 8, // 8 hours
    storeIdToken: true,
  },
});

export { auth0, AuthedRequest };
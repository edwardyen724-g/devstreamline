import { initAuth0 } from '@auth0/nextjs-auth0';
import { SessionConfig } from 'next-auth';

export const auth0 = initAuth0({
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  scope: 'openid profile email',
  session: {
    cookieSecret: process.env.COOKIE_SECRET,
    cookieLifetime: 60 * 60 * 8,
    storeIDToken: true,
  },
});

export interface CustomSessionConfig extends SessionConfig {
  callback?: (user: { email: string; }) => void;
} // Adjust as per your requirements

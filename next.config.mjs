import { defineConfig } from 'next';
import { NextAuthOptions } from 'next-auth';
import dotenv from 'dotenv';

dotenv.config();

const nextAuthOptions: NextAuthOptions = {
  providers: [
    {
      id: 'auth0',
      name: 'Auth0',
      authorization: {
        url: `https://${process.env.AUTH0_DOMAIN}/authorize`,
        params: {
          scope: 'openid profile email',
        },
      },
      token: {
        url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
      },
      userinfo: {
        url: `https://${process.env.AUTH0_DOMAIN}/userinfo`,
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
        };
      },
    },
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

export default defineConfig({
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  publicRuntimeConfig: {
    stripePublicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
    auth0Domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
  },
  serverRuntimeConfig: {
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    mongodbUri: process.env.MONGODB_URI,
  },
});
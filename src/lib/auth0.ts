import { SessionConfig } from 'next-auth';

interface CustomSessionConfig extends SessionConfig {
  postLogoutRedirect?: string;
  login?: string;
  unauthorized?: string;
}

const auth0Options: Partial<CustomSessionConfig> = {
  postLogoutRedirect: '/',
  callback: '/api/auth/callback',
  login: '/api/auth/login',
  unauthorized: '/api/auth/unauthorized',
};

export default auth0Options;

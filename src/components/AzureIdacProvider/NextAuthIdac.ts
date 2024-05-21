import NextAuth from 'next-auth';

import AzureB2cProvider from './AzureB2cProvider';
import fetchWellKnown from './fetchWellKnown';
import isTokenValid from './getExpirationTime';
import { session } from './session';

type Options = {
  clientId: string;
  wellKnown: string;
};

type tokenWithAccount = {
  account: {
    refresh_token: string;
  };
  user: object;
  signOutUrl: string;
  email: string;
  sub: string;
  error?: string;
};

export default function NextAuthIdac(options: Options) {
  async function refreshAccessToken(token: tokenWithAccount) {
    try {
      const { token_endpoint } = await fetchWellKnown(options.wellKnown);

      const queryParams = new URLSearchParams({
        client_id: options.clientId,
        resource: options.clientId,
        grant_type: 'refresh_token',
        refresh_token: token?.account?.refresh_token,
      });
      const url = `${token_endpoint}?${queryParams}`;

      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
      });

      if (!response.ok) {
        // noinspection ExceptionCaughtLocallyJS
        throw response;
      }

      return await response.json();
    } catch (error) {
      return {
        ...token.account,
        error: 'RefreshAccessTokenError',
      };
    }
  }

  async function jwt({ token, account, user }) {
    if (account) {
      const { end_session_endpoint } = await fetchWellKnown(options.wellKnown);
      token.account = account;
      token.user = user;
      token.signOutUrl = `${end_session_endpoint}?token=${account.id_token}`;
    }

    if (isTokenValid(token)) return token;

    const refreshAccount = await refreshAccessToken(token);
    return {
      ...token,
      account: {
        ...token.account,
        ...refreshAccount,
      },
      error: refreshAccount.error,
    };
  }

  async function redirect({ url, baseUrl }) {
    // Allows relative callback URLs
    if (url.startsWith('/')) return `${baseUrl}${url}`;
    // Allows callback URLs on the same origin
    else if (new URL(url).origin === baseUrl) return url;

    // Allows callback URLs for IDP SignOut
    const { end_session_endpoint } = await fetchWellKnown(options.wellKnown);
    if (new URL(url).origin === new URL(end_session_endpoint).origin) return url;

    return baseUrl;
  }

  return NextAuth({
    providers: [AzureB2cProvider(options)],
    callbacks: {
      jwt,
      session,
      redirect,
    },
  });
}

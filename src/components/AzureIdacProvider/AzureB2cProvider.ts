import { OAuthConfig } from 'next-auth/providers';

interface AuthProfile {
  sub: string;
  username: string;
}

type IDACOptions = {
  clientId: string;
  wellKnown: string;
};

export interface RevxProfile extends AuthProfile {
  id: string;
  email: string;
  consumerResourceId: string;
}

type OAuthConfigIDAC<P> = OAuthConfig<P> & {
  primaryUserFlow: string;
};

export default function AzureB2cProvider<P extends RevxProfile>(
  options: IDACOptions
): OAuthConfigIDAC<P> {
  const { clientId, wellKnown } = options;

  return {
    id: 'revx',
    name: 'RevX',
    type: 'oauth',
    wellKnown,
    clientId,
    client: {
      token_endpoint_auth_method: 'none',
    },
    idToken: true,
    checks: ['pkce', 'state'],
    primaryUserFlow: 'b2c_1_revx_sign_in',
    profile(profile: RevxProfile) {
      return {
        id: profile.sub,
        email: profile.username,
        username: profile.username,
        consumerResourceId: profile.consumerResourceId,
      };
    },
  };
}

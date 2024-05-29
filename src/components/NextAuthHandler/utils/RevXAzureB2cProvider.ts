import { OAuthConfig } from 'next-auth/providers';

// interface AuthProfile {
//   sub: string;
//   // username: string;
// }

type IDACOptions = {
  clientId: string;
  wellKnown: string;
};

// export interface RevXProfile extends AuthProfile {
export interface RevXProfile {
  aud: string;
  auth_time: number;
  emails: string[];
  exp: number;
  iat: number; // issued at time
  idp: string;
  iss: string;
  name: string;
  nbf: number; // not before
  oid: string;
  sub: string;
  tfp: string;
  ver: string;
}
// 1716616089 - 1716608889;
type OAuthConfigIDAC<P> = OAuthConfig<P> & {
  primaryUserFlow: string;
};

export default function RevXAzureB2cProvider<P extends RevXProfile>(
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
    profile(profile: RevXProfile) {
      // console.log('test', { profile });

      return {
        name: profile.name,
        id: profile.sub,
      };
    },
  };
}

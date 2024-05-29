import RevXAzureB2cProvider from '../RevXAzureB2cProvider';

describe('RevXAzureB2cConfig', () => {
  it('should return expected config', () => {
    // arrange
    const clientId = 'clientId-value';
    const wellKnown = 'wellKnown-value';

    const options = { clientId, wellKnown };

    const expected = {
      checks: ['pkce', 'state'],
      client: { token_endpoint_auth_method: 'none' },
      clientId,
      id: 'revx',
      name: 'RevX',
      idToken: true,
      primaryUserFlow: 'b2c_1_revx_sign_in',
      profile: expect.any(Function),
      type: 'oauth',
      wellKnown,
    };

    // act
    const results = RevXAzureB2cProvider(options);

    // assert
    expect(results).toEqual(expected);
  });

  it('should return expected user profile when profile is called', () => {
    // arrange
    const clientId = 'clientId-value';
    const wellKnown = 'wellKnown-value';

    const options = { clientId, wellKnown };

    const revXProfile = {
      ver: '1.0',
      iss: 'https://revxdevtenancy.b2clogin.com/3fa4a540-34ec-4695-9e8c-1a8eca0454df/v2.0/',
      sub: 'a7b142c4-2557-42af-8fc8-2efe02202cfd',
      aud: '639a138b-3870-41d1-80ad-f500c26f5096',
      exp: 1716842540,
      iat: 1716835340,
      auth_time: 1716835338,
      idp: 'https://login.microsoftonline.com/b7601176-71f7-444c-9511-d8e473a09e60/v2.0',
      name: 'First Last',
      oid: 'a7b142c4-2557-42af-8fc8-2efe02202cfd',
      emails: ['award@rsimail.com'],
      tfp: 'B2C_1_revx_sign_in',
      nbf: 1716835340,
    };

    const expectedUser = {
      name: revXProfile.name,
      id: revXProfile.sub,
    };

    const tokens = null;

    // act
    const { profile } = RevXAzureB2cProvider(options);
    const results = profile(revXProfile, tokens);

    // assert
    expect(results).toEqual(expectedUser);
  });
});

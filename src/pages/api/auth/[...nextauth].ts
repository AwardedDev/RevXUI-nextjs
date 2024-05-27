/* istanbul ignore file */ // TODO: determine a way to test

// Documentation resources:
// https://next-auth.js.org/providers/azure-ad
// https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-auth-code-flow
// https://revxdevtenancy.b2clogin.com/revxdevtenancy.onmicrosoft.com/b2c_1_revx_sign_in/v2.0/.well-known/openid-configuration
import NextAuthHandler from '../../../components/NextAuthHandler';

const idacConfig = {
  clientId: '639a138b-3870-41d1-80ad-f500c26f5096',
  wellKnown:
    'https://revxdevtenancy.b2clogin.com/revxdevtenancy.onmicrosoft.com/b2c_1_revx_sign_in/v2.0/.well-known/openid-configuration',
};
export default NextAuthHandler(idacConfig);

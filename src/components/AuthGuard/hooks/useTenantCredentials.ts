import { gql } from 'graphql-request';
import { useQuery } from 'react-query';

const query = gql`
  query ($domain: String!) {
    TenantCredentials(domain: $domain) {
      clientId
      signUpSignInAuthority
      authorityDomain
      scope
      modules {
        id
        name
      }
      tenantName
      environmentName
    }
  }
`;

export default function useTenantCredentials() {
  return useQuery(['tenantCredentials'], async () => {
    const domain = 'uidev.nxg.revenuepremier.com';

    const res = await fetch('https://graphapi.nxg.revenuepremier.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { domain },
      }),
    });

    const json = await res.json();
    if (json.errors) {
      throw json.errors;
    }

    return json.data;
  });
}

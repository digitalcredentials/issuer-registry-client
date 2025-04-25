export const doubleLegacyResult = {
  matchingIssuers: [
    {
      issuer: {
        federation_entity: {
          organization_name: '(Example) My University',
          homepage_uri: 'https://digitalcredentials.mit.edu',
          location: 'Cambridge, MA, USA'
        }
      },
      registry: {
        type: 'dcc-legacy',
        name: 'DCC Sandbox Registry',
        url: 'https://digitalcredentials.github.io/sandbox-registry/registry.json'
      }
    },
    {
      issuer: {
        federation_entity: {
          organization_name: 'My University',
          location: 'Cambridge, MA, USA',
          homepage_uri: 'https://digitalcredentials.mit.edu'
        }
      },
      registry: {
        type: 'dcc-legacy',
        name: 'DCC Community Registry',
        url: 'https://digitalcredentials.github.io/community-registry/registry.json'
      }
    }
  ],
  uncheckedRegistries: []
}

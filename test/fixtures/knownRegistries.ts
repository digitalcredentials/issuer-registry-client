export const knownRegistries = [
  {
    type: 'oidf',
    fetchEndpoint: 'https://test.registry.dcconsortium.org/fetch?sub=',
    name: 'DCC Member Registry'
  },
  {
    type: 'dcc-legacy',
    name: 'DCC Sandbox Registry',
    url: 'https://digitalcredentials.github.io/sandbox-registry/registry.json'
  },
  {
    type: 'dcc-legacy',
    name: 'DCC Community Registry',
    url: 'https://digitalcredentials.github.io/community-registry/registry.json'
  }
]

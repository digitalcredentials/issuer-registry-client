export const knownRegistries = [
  {
    type: 'oidf',
    trustAnchorEC: 'https://test.registry.dcconsortium.org/.well-known/openid-federation',
    fetchEndpoint: 'https://test.registry.dcconsortium.org/fetch?sub=',
    name: 'DCC Member Registry'
  },
  {
    type: 'oidf',
    trustAnchorEC: 'https://registry.dcconsortium.org/.well-known/openid-federation',
    fetchEndpoint: 'https://registry.dcconsortium.org/fetch?sub=',
    name: 'DCC Member Registry 2'
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

import { expect } from 'chai'
import { RegistryClient } from '../src'

const knownIssuers = [
  {
    name: 'DCC Sandbox Registry',
    url: 'https://digitalcredentials.github.io/sandbox-registry/registry.json'
  },
  {
    name: 'DCC Community Registry',
    url: 'https://digitalcredentials.github.io/community-registry/registry.json'
  }
]

describe('registry client', () => {
  it('loads registries', async () => {
    const client = new RegistryClient()

    await client.load({ config: knownIssuers })

    const entry = client
      .didEntry('did:key:z6MkpLDL3RoAoMRTwTgo3rs39ZwssfaPKtGdZw7AGRN7CK4W')
    expect(entry?.inRegistries?.size).to.equal(2)

    expect(client.didEntry('did:example:invalid')).to.equal(undefined)
  })
})

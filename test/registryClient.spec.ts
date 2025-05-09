import { expect } from 'chai'
import { RegistryClient } from '../src/index.js'

const expectedSuccessfulResult = [
  {
    name: 'DCC Sandbox Registry',
    url: 'https://digitalcredentials.github.io/sandbox-registry/registry.json',
    loaded: true
  },
  {
    name: 'DCC Community Registry',
    url: 'https://digitalcredentials.github.io/community-registry/registry.json',
    loaded: true
  }
]

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

const badIssuer = [
  {
    name: 'DCC Sandbox Registry',
    url: 'https://digitalcredentials.github.io/sandbox-registry/registry.json'
  },
  {
    name: 'DCC Community Registry',
    url: 'https://digitalcredentials.github.io/community-registry/reggggistry.json'
  }
]

describe('registry client', () => {
  it('loads registries', async () => {
    const client = new RegistryClient()

    const result = await client.load({ config: knownIssuers })
    expect(result).to.deep.equal(expectedSuccessfulResult)

    const entry = client
      .didEntry('did:key:z6MkpLDL3RoAoMRTwTgo3rs39ZwssfaPKtGdZw7AGRN7CK4W')
    expect(entry?.inRegistries?.size).to.equal(2)

    expect(client.didEntry('did:example:invalid')).to.equal(undefined)
  })

  it('returns error response for bad registries', async () => {
    const client = new RegistryClient()

    const result = await client.load({ config: badIssuer })
    expect(result.length).to.equal(2)

    const successfulLoad = result.find(entry => entry.url === 'https://digitalcredentials.github.io/sandbox-registry/registry.json')
    expect(successfulLoad?.loaded).to.equal(true)

    const failedLoad = result.find(entry => entry.url === 'https://digitalcredentials.github.io/community-registry/reggggistry.json')
    expect(failedLoad?.loaded).to.equal(false)

    const entry = client
      .didEntry('did:key:z6MkpLDL3RoAoMRTwTgo3rs39ZwssfaPKtGdZw7AGRN7CK4W')
    expect(entry?.inRegistries?.size).to.equal(1)

    expect(client.didEntry('did:example:invalid')).to.equal(undefined)
  })
})

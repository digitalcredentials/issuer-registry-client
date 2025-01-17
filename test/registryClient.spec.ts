import { expect } from 'chai'
import { RegistryClient } from '../src'

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

  it.only('returns error response for bad registries', async () => {
    const client = new RegistryClient()

    const result = await client.load({ config: badIssuer })
    console.log(result)
    expect (result.length).to.equal(2)
    expect (result.find(entry=>entry.url === 'https://digitalcredentials.github.io/sandbox-registry/registry.json')?.loaded).to.be.true
    expect (result.find(entry=>entry.url === 'https://digitalcredentials.github.io/community-registry/reggggistry.json')?.loaded).to.be.false
    
    const entry = client
      .didEntry('did:key:z6MkpLDL3RoAoMRTwTgo3rs39ZwssfaPKtGdZw7AGRN7CK4W')
    expect(entry?.inRegistries?.size).to.equal(1)

    expect(client.didEntry('did:example:invalid')).to.equal(undefined)
  })

})

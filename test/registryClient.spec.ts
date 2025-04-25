import { expect } from 'chai'
import { RegistryClient } from '../src/index.js'
import { dccOidfNockA, dccOidfNockB, dccOidf404Nock } from './fixtures/nocks/oidfFetchNock.js'
import { sandboxRegistryNock, communityRegistryNock } from './fixtures/nocks/legacyRegistryNocks.js'
import { knownRegistries } from './fixtures/knownRegistries.js'
import { singleOIDFResult } from './fixtures/didLookupResults/oidfResultB.js'
import { doubleLegacyResult } from './fixtures/didLookupResults/doubleLegacyResult.js'
import { mixedResult } from './fixtures/didLookupResults/mixedResult.js'

describe('registry client', () => {
  it('returns matching oidf result', async () => {
    dccOidfNockB()
    const client = new RegistryClient()
    client.use({ registries: knownRegistries })
    const result = await client.lookupIssuersFor('did:web:twotr.testschool.edu')
    expect(result).to.deep.equal(singleOIDFResult)
  })

  it('returns two matching legacy results', async () => {
    sandboxRegistryNock()
    communityRegistryNock()
    dccOidf404Nock()
    const client = new RegistryClient()
    client.use({ registries: knownRegistries })
    const result = await client.lookupIssuersFor('did:key:z6MkpLDL3RoAoMRTwTgo3rs39ZwssfaPKtGdZw7AGRN7CK4W')
    expect(result).to.deep.equal(doubleLegacyResult)
  })

  it('returns both legacy and oidf result', async () => {
    sandboxRegistryNock()
    communityRegistryNock()
    dccOidfNockA()
    const client = new RegistryClient()
    client.use({ registries: knownRegistries })
    const result = await client.lookupIssuersFor('did:web:oneuni.testuni.edu')
    expect(result).to.deep.equal(mixedResult)
  })
})

/*
tests to add:
- 'use' fails on bad knownRegistries file.
-
*/

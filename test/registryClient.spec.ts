import { expect } from 'chai'
import { RegistryClient } from '../src/index.js'
import { dccOidfNockA, dccOidfNockB, dccOidf404Nock, dcc2OidfNockB, dcc2Oidf404Nock, dcc2oidf404ForAllNock } from './fixtures/nocks/oidfFetchNock.js'
import { sandboxRegistryNock, communityRegistryNock } from './fixtures/nocks/legacyRegistryNocks.js'
import { knownRegistries } from './fixtures/knownRegistries.js'
import { doubleOIDFResult, singleOIDFResult } from './fixtures/didLookupResults/oidfResultB.js'
import { doubleLegacyResult } from './fixtures/didLookupResults/doubleLegacyResult.js'
import { mixedResult } from './fixtures/didLookupResults/mixedResult.js'

describe('registry client', () => {
  it('returns one matching oidf result', async () => {
    dccOidfNockB()
    dcc2oidf404ForAllNock()
    const client = new RegistryClient()
    client.use({ registries: knownRegistries })
    const result = await client.lookupIssuersFor('did:web:twotr.testschool.edu')
    expect(result).to.deep.equal(singleOIDFResult)
  })

  it('returns two matching legacy results', async () => {
    sandboxRegistryNock()
    communityRegistryNock()
    dccOidf404Nock()
    dcc2Oidf404Nock()
    const client = new RegistryClient()
    client.use({ registries: knownRegistries })
    const result = await client.lookupIssuersFor('did:key:z6MkpLDL3RoAoMRTwTgo3rs39ZwssfaPKtGdZw7AGRN7CK4W')
    expect(result).to.deep.equal(doubleLegacyResult)
  })

  it('returns a legacy and 1 oidf results', async () => {
    sandboxRegistryNock()
    communityRegistryNock()
    dccOidfNockA()
    dcc2oidf404ForAllNock()
    const client = new RegistryClient()
    client.use({ registries: knownRegistries })
    const result = await client.lookupIssuersFor('did:web:oneuni.testuni.edu')
    expect(result).to.deep.equal(mixedResult)
  })

  it('returns two matching oidf results', async () => {
    sandboxRegistryNock()
    communityRegistryNock()
    dccOidfNockB()
    dcc2OidfNockB()
    // need to:
    // - add another oidf endpoint to the registry file.
    // - set up a nock for it that matches the same did as nockB.
    const client = new RegistryClient()
    client.use({ registries: knownRegistries })
    const result = await client.lookupIssuersFor('did:web:twotr.testschool.edu')
    console.log(JSON.stringify(result,null,2))
    expect(result).to.deep.equal(doubleOIDFResult)
  })
})

/*
tests to add:
- 'use' fails on bad knownRegistries file.
-
*/

import { expect } from 'chai'
import { RegistryClient } from '../src/index.js'
import nock from 'nock'
import { singleOIDFNock, doubleLegacyNock } from './fixtures/nocks/oidfFetchNock.js'
import { knownRegistries } from './fixtures/knownRegistries.js'
import { singleOIDFResult } from './fixtures/didLookupResults/singleOIDFResult.js'
import { doubleLegacyResult } from './fixtures/didLookupResults/doubleLegacyResult.js'

describe('registry client', () => {

  it('returns matching oidf result', async () => {
    singleOIDFNock()
    const client = new RegistryClient()
    client.use({ registries: knownRegistries })
    const result = await client.lookupIssuersFor('did:web:twotr.testschool.edu')
    expect(result).to.deep.equal(singleOIDFResult)
  })

  it('returns double matching legacy result', async () => {
    doubleLegacyNock()
    const client = new RegistryClient()
    client.use({ registries: knownRegistries })
    const result = await client.lookupIssuersFor('did:key:z6MkpLDL3RoAoMRTwTgo3rs39ZwssfaPKtGdZw7AGRN7CK4W')
    expect(result).to.deep.equal(doubleLegacyResult)
  })

  it('returns legacy and oidf result', async () => {

    /// TODO make some nocks for the legacy stuff so it does return a match for the twotr did.
    doubleLegacyNock()
    const client = new RegistryClient()
    client.use({ registries: knownRegistries })
    const result = await client.lookupIssuersFor('did:key:z6MkpLDL3RoAoMRTwTgo3rs39ZwssfaPKtGdZw7AGRN7CK4W')
    expect(result).to.deep.equal(doubleLegacyResult)
  })


})

/*
tests to add:
- 'use' fails on bad knownRegistries file.
-
*/

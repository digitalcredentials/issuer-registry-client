import { expect } from 'chai'
import { RegistryClient } from '../src/index.js'
import nock from 'nock'
import { singleOIDFNock, doubleLegacyNock } from './fixtures/nocks/oidfFetchNock.js'
import { knownRegistries } from './fixtures/knownRegistries.js'
import { singleOIDFResult } from './fixtures/lookupResults/singleOIDFResult.js'
import { doubleLegacyResult } from './fixtures/lookupResults/doubleLegacyResult.js'

describe('registry client', () => {

  
  beforeEach(async () => {
    if (!nock.isActive()) nock.activate()
  })

  afterEach(async () => {
    nock.restore()
  }) 

  it('returns matching oidf result', async () => {
    singleOIDFNock()
    const client = new RegistryClient()
    client.use({ registries: knownRegistries })
    const result = await client.lookupIssuersFor('did:web:twotr.testschool.edu')
    expect(result).to.deep.equal(singleOIDFResult)
    
  })

  it('returns matching legacy result', async () => {
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

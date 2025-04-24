import { expect } from 'chai'
import { RegistryClient } from '../src/index.js'
import nock from 'nock'
import oidfFetchNock from './fixtures/nocks/oidfFetchNock.js'
import { knownRegistries } from './fixtures/knownRegistries.js'
import { singleOIDFResult } from './fixtures/lookupResults/singleOIDFResult.js'

describe('registry client', () => {
  beforeEach(async () => {
    if (!nock.isActive()) nock.activate()
  })

  afterEach(async () => {
    nock.restore()
  })

  it('returns matching oidf result', async () => {
    oidfFetchNock()
    const client = new RegistryClient()
    client.use({ registries: knownRegistries })
    const result = await client.lookupIssuersFor('did:web:oneuni.testuni.edu')
    console.log(JSON.stringify(result,null,2))
    expect(result).to.deep.equal(singleOIDFResult)
    // expect(entry?.inRegistries?.size).to.equal(2)
  })
})

/*
tests to add:
- 'use' fails on bad knownRegistries file.
-
*/

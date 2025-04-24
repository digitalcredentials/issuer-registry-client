import { expect } from 'chai'
import { RegistryClient } from '../src/index.js'
import nock from 'nock'
import oidfFetchNock from './fixtures/nocks/oidfFetchNock.js'
import { knownRegistries } from './fixtures/knownRegistries.js'
import { oidfFetchResponse } from './fixtures/oidfFetchResponse.js'

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
    const result = client.lookupIssuersFor('did:web:oneuni.testuni.edu')
    expect(result).to.deep.equal(oidfFetchResponse)
    // expect(entry?.inRegistries?.size).to.equal(2)
  })
})

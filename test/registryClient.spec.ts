import { expect } from 'chai'
import { RegistryClient } from '../src/index.js'
import nock from 'nock'
import oidfFetchNock from './nocks/oidfFetchNock.ts'
import { knownRegistries } from './fixtures.ts'

describe('registry client', () => {

  beforeEach(async () => {
    if (!nock.isActive()) nock.activate()
  })

  afterEach(async () => {
    nock.restore()
  })

  it('returns oidf result', async () => {
    oidfFetchNock();
    const client = new RegistryClient()
    client.use({registries: knownRegistries})
    const result = client.lookupIssuersFor('did:key:z6MkpLDL3RoAoMRTwTgo3rs39ZwssfaPKtGdZw7AGRN7CK4W')
    expect(result).to.deep.equal({'oidfResult': 'result'})
    //expect(entry?.inRegistries?.size).to.equal(2)
  })


})

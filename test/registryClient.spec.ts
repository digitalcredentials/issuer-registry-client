import { expect } from 'chai'
import { RegistryClient } from '../src/index.js'
import { dccOidfNockA, dccOidfNockB, dccOidf404Nock, dcc2OidfNockB, dcc2Oidf404Nock, dcc2oidf404ForAllNock, badDccOidf404Nock } from './fixtures/nocks/oidfFetchNock.js'
import { sandboxRegistryNock, communityRegistryNock, communityRegistry404Nock as badCommunityRegistry404Nock } from './fixtures/nocks/legacyRegistryNocks.js'
import { knownRegistries } from './fixtures/knownRegistries.js'
import { doubleOIDFResult, singleOIDFResult } from './fixtures/didLookupResults/oidfResultB.js'
import { doubleLegacyResult } from './fixtures/didLookupResults/doubleLegacyResult.js'
import { mixedResult } from './fixtures/didLookupResults/mixedResult.js'
import { mixedResultWithUncheckedRegistry } from './fixtures/didLookupResults/mixedResultWithUncheckedRegistry.js'
import { uncheckedOIDFRegistry } from './fixtures/didLookupResults/mixedWithUncheckedOIDFRegistry.js'

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

  it('lists a legacy registry as unchecked when unavailable', async () => {
    sandboxRegistryNock()
    communityRegistryNock()
    dccOidfNockA()
    dcc2oidf404ForAllNock()
    badCommunityRegistry404Nock()
    const client = new RegistryClient()
    // make a copy of our registry list
    const registriesWithUnavaibleRegistry = JSON.parse(JSON.stringify(knownRegistries))
    // and add a registry whose url doesn't resolve:
    registriesWithUnavaibleRegistry.push({
      type: 'dcc-legacy',
      name: 'DCC Community Registry',
      url: 'https://digitalcredentials.github.io/community-registry/registryyyyyy.json'
    })
    client.use({ registries: registriesWithUnavaibleRegistry })
    const result = await client.lookupIssuersFor('did:web:oneuni.testuni.edu')
    console.log(JSON.stringify(result,null,2))
    expect(result).to.deep.equal(mixedResultWithUncheckedRegistry)
  })

  it('lists an oidf registry as unchecked when unavailable', async () => {
    sandboxRegistryNock()
    communityRegistryNock()
    dccOidfNockA()
    dcc2oidf404ForAllNock()
    badDccOidf404Nock()
    const client = new RegistryClient()
    // make a copy of our registry list
    const registriesWithUnavaibleRegistry = JSON.parse(JSON.stringify(knownRegistries))
    // and add a registry whose fetch endpoint doesn't resolve:
    registriesWithUnavaibleRegistry.push({
      type: 'oidf',
      fetchEndpoint: 'https://registryyyyy.dcconsortium.org/fetch?sub=',
      name: 'DCC Member Registry Not Real'
    })
    client.use({ registries: registriesWithUnavaibleRegistry })
    const result = await client.lookupIssuersFor('did:web:oneuni.testuni.edu')
    console.log(JSON.stringify(result,null,2))
    expect(result).to.deep.equal(uncheckedOIDFRegistry)
  })

})

/*
tests to add:
- 'use' fails on bad knownRegistries file.
-
*/

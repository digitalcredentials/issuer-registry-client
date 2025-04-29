import { expect } from 'chai'
import { RegistryClient } from '../src/index.js'
import { dccOidfNockTestA, dccOidfNockTestB, dccOidf404TestCNock, dccOidfNockProdB, dccOidf404ProdCNock, dccOidf404ForAllProdNock, badDccOidf404Nock } from './fixtures/nocks/oidfFetchNock.js'
import { sandboxRegistryNock, communityRegistryNock, communityRegistry404Nock as badCommunityRegistry404Nock } from './fixtures/nocks/legacyRegistryNocks.js'
import { knownRegistries } from './fixtures/knownRegistries.js'
import { doubleOIDFResult, singleOIDFResult } from './fixtures/didLookupResults/oidfResultB.js'
import { doubleLegacyResult } from './fixtures/didLookupResults/doubleLegacyResult.js'
import { mixedResult } from './fixtures/didLookupResults/mixedResult.js'
import { mixedResultWithUncheckedRegistry } from './fixtures/didLookupResults/mixedResultWithUncheckedRegistry.js'
import { uncheckedOIDFRegistry } from './fixtures/didLookupResults/mixedWithUncheckedOIDFRegistry.js'
import { oidfECResponseDCCNock as oidfECResponseDCCProdNock, oidfECResponseDCCTestNock } from './fixtures/nocks/oidfECNocks.js'
import { doubleOIDFResultB } from './fixtures/didLookupResults/doubleOidfResultB.js'

describe('registry client', () => {

  it('returns two matching oidf results', async () => {
    // nocks for the two entity configuration calls,
    // one to each dcc oidf registry, test and prod
    oidfECResponseDCCProdNock()
    oidfECResponseDCCTestNock()
    // nocks for the calls to oidf fetch endpoint
    // on the test and prod dcc oidf registries,
    // both searching for the 'B' did:web
    dccOidfNockProdB()
    dccOidfNockTestB()
    const client = new RegistryClient()
    client.use({ registries: knownRegistries })
    const result = await client.lookupIssuersFor('did:web:twotr.testschool.edu')
    expect(result).to.deep.equal(doubleOIDFResultB)
  })

  it('returns one matching oidf result', async () => {
        // nocks for the two entity configuration calls:
        oidfECResponseDCCProdNock()
        oidfECResponseDCCTestNock()
    dccOidfNockTestB()
    dccOidf404ForAllProdNock()
    const client = new RegistryClient()
    client.use({ registries: knownRegistries })
    const result = await client.lookupIssuersFor('did:web:twotr.testschool.edu')
    console.log(JSON.stringify(result,null,2))
    expect(result).to.deep.equal(singleOIDFResult)
  })

  it('returns two matching legacy results', async () => {
            // nocks for the two entity configuration calls:
            oidfECResponseDCCProdNock()
            oidfECResponseDCCTestNock()
    sandboxRegistryNock()
    communityRegistryNock()
    dccOidf404TestCNock()
    dccOidf404ProdCNock()
    const client = new RegistryClient()
    client.use({ registries: knownRegistries })
    const result = await client.lookupIssuersFor('did:key:z6MkpLDL3RoAoMRTwTgo3rs39ZwssfaPKtGdZw7AGRN7CK4W')
    expect(result).to.deep.equal(doubleLegacyResult)
  })

  it('returns a legacy and 1 oidf results', async () => {
            // nocks for the two entity configuration calls:
            oidfECResponseDCCProdNock()
            oidfECResponseDCCTestNock()
    sandboxRegistryNock()
    communityRegistryNock()
    dccOidfNockTestA()
    dccOidf404ForAllProdNock()
    const client = new RegistryClient()
    client.use({ registries: knownRegistries })
    const result = await client.lookupIssuersFor('did:web:oneuni.testuni.edu')
    expect(result).to.deep.equal(mixedResult)
  })

  it('returns two matching oidf results', async () => {
         // nocks for the two entity configuration calls:
         oidfECResponseDCCProdNock()
         oidfECResponseDCCTestNock()
    sandboxRegistryNock()
    communityRegistryNock()
    dccOidfNockTestB()
    dccOidfNockProdB()
    // need to:
    // - add another oidf endpoint to the registry file.
    // - set up a nock for it that matches the same did as nockB.
    const client = new RegistryClient()
    client.use({ registries: knownRegistries })
    const result = await client.lookupIssuersFor('did:web:twotr.testschool.edu')
    expect(result).to.deep.equal(doubleOIDFResult)
  })

  it('lists a legacy registry as unchecked when unavailable', async () => {
         // nocks for the two entity configuration calls:
         oidfECResponseDCCProdNock()
         oidfECResponseDCCTestNock()
    sandboxRegistryNock()
    communityRegistryNock()
    dccOidfNockTestA()
    dccOidf404ForAllProdNock()
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
    expect(result).to.deep.equal(mixedResultWithUncheckedRegistry)
  })

  it('lists an oidf registry as unchecked when unavailable', async () => {
         // nocks for the two entity configuration calls:
         oidfECResponseDCCProdNock()
         oidfECResponseDCCTestNock()
    sandboxRegistryNock()
    communityRegistryNock()
    dccOidfNockTestA()
    dccOidf404ForAllProdNock()
    badDccOidf404Nock()
    const client = new RegistryClient()
    // make a copy of our registry list
    const registriesWithUnavaibleRegistry = JSON.parse(JSON.stringify(knownRegistries))
    // and add a registry whose fetch endpoint doesn't resolve:
    registriesWithUnavaibleRegistry.push({
      "type": "oidf",
      "fetchEndpoint": "https://registryyyyy.dcconsortium.org/fetch?sub=",
      "trustAnchorEC": "https://registryyyyy.dcconsortium.org/.well-known/openid-federation",
      "name": "DCC Member Registry Not Real"
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

import { expect } from 'chai'
import { loadRegistryCollections, registryCollections } from '../src'
import registryCollectionsConfig from '../src/config/registryCollections.json';

describe('registryCollections', () => {
  it('contains issuerDid collection', () => {
    expect(registryCollections.issuerDid).to.be.a('object');
  })
})

describe('loadRegistryCollections()', () => {
  it('loads all issuerDid registries', async () => {
    await loadRegistryCollections();
    const collectionRegistryCount = registryCollections.issuerDid.registries.length
    const collectionConfigRegistryCount = registryCollectionsConfig.issuerDid.length;

    expect(collectionRegistryCount).to.equal(collectionConfigRegistryCount)
  })
})

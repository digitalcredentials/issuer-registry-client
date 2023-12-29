import { expect } from 'chai'
import { loadRegistryCollections, registryCollections } from '../src'

import { loadRegistries } from '../src'

const knownIssuers = [
  {
    "name": "DCC Sandbox Registry",
    "url": "https://digitalcredentials.github.io/sandbox-registry/registry.json"
  }
]

describe('registry client', () => {
  it('loads registries', async () => {
    const registries = await loadRegistries(knownIssuers)

    console.log(registries)
  })
})


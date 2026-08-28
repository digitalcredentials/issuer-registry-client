import { describe, it, expect, afterEach } from 'vitest'
import nock from 'nock'
import { RegistryClient, type RegistryFetch } from '../../src/index.js'
import { oidfECResponseDCC } from './fixtures/httpResponses/oidfResponses/oidfECResponseDCC.js'
import { oidfFetchResponseB } from './fixtures/httpResponses/oidfResponses/oidfFetchResponseB.js'
import sandboxRegistryResponse from './fixtures/httpResponses/legacyResponses/dcc-sandbox-response.js'
import { singleOIDFResult } from './fixtures/didLookupResults/oidfResultB.js'
import { oidfECResponseDCCTestNock } from './fixtures/nocks/oidfECNocks.js'
import { dccOidfNockTestB } from './fixtures/nocks/oidfFetchNock.js'

const PROXY_ORIGIN = 'https://proxy.example'
const PROXY_PATH = '/api/cors'

const oidfRegistry = {
  type: 'oidf',
  trustAnchorEC:
    'https://test.registry.dcconsortium.org/.well-known/openid-federation',
  name: 'DCC Member Registry'
}

const legacyRegistry = {
  type: 'dcc-legacy',
  name: 'DCC Sandbox Registry',
  url: 'https://digitalcredentials.github.io/sandbox-registry/registry.json'
}

/**
 * Stands in for a caller that cannot reach the registries directly (a browser,
 * where the trust anchors send no CORS headers) and relays every request
 * through a proxy of its own. The registries themselves are never nocked in
 * these cases, so a request escaping the seam fails the test.
 */
const proxyingFetch: RegistryFetch = async url =>
  await globalThis.fetch(
    `${PROXY_ORIGIN}${PROXY_PATH}?url=${encodeURIComponent(url)}`
  )

function nockProxiedGet(target: string, status: number, body?: unknown): void {
  nock(PROXY_ORIGIN)
    .get(PROXY_PATH)
    .query({ url: target })
    .reply(status, body as never)
}

describe('injected fetch', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('routes both oidf hops through the injected fetch', async () => {
    nockProxiedGet(oidfRegistry.trustAnchorEC, 200, oidfECResponseDCC)
    nockProxiedGet(
      'https://test.registry.dcconsortium.org/fetch?sub=did:web:twotr.testschool.edu',
      200,
      oidfFetchResponseB
    )

    const client = new RegistryClient({ fetch: proxyingFetch })
    client.use({ registries: [oidfRegistry] })
    const result = await client.lookupIssuersFor('did:web:twotr.testschool.edu')

    expect(result).toEqual(singleOIDFResult)
  })

  it('routes a dcc-legacy registry through the injected fetch', async () => {
    nockProxiedGet(legacyRegistry.url, 200, sandboxRegistryResponse)

    const client = new RegistryClient({ fetch: proxyingFetch })
    client.use({ registries: [legacyRegistry] })
    const result = await client.lookupIssuersFor(
      'did:key:z6MkpLDL3RoAoMRTwTgo3rs39ZwssfaPKtGdZw7AGRN7CK4W'
    )

    expect(result.uncheckedRegistries).toEqual([])
    expect(result.matchingIssuers).toHaveLength(1)
    expect(result.matchingIssuers[0].issuer).toEqual({
      federation_entity: {
        organization_name: '(Example) My University',
        homepage_uri: 'https://digitalcredentials.mit.edu',
        location: 'Cambridge, MA, USA'
      }
    })
  })

  it('reports a registry as unchecked when the injected fetch fails', async () => {
    const failingFetch: RegistryFetch = async () => {
      throw new Error('proxy unreachable')
    }

    const client = new RegistryClient({ fetch: failingFetch })
    client.use({ registries: [oidfRegistry, legacyRegistry] })
    const result = await client.lookupIssuersFor('did:web:twotr.testschool.edu')

    expect(result.matchingIssuers).toEqual([])
    expect(result.uncheckedRegistries).toEqual([oidfRegistry, legacyRegistry])
  })

  it('defaults to globalThis.fetch when none is injected', async () => {
    oidfECResponseDCCTestNock()
    dccOidfNockTestB()

    const client = new RegistryClient()
    client.use({ registries: [oidfRegistry] })
    const result = await client.lookupIssuersFor('did:web:twotr.testschool.edu')

    expect(result).toEqual(singleOIDFResult)
  })
})

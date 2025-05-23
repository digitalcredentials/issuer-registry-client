import nock from 'nock'
import communityRegistryResponse from '../httpResponses/legacyResponses/dcc-community-response.js'
import sandboxRegistryResponse from '../httpResponses/legacyResponses/dcc-sandbox-response.js'

export const sandboxRegistryNock = (): void => {
  nock('https://digitalcredentials.github.io')
    .get('/sandbox-registry/registry.json')
    .reply(200, sandboxRegistryResponse)
}

export const communityRegistryNock = (): void => {
  nock('https://digitalcredentials.github.io')
    .get('/community-registry/registry.json')
    .reply(200, communityRegistryResponse)
}

export const communityRegistry404Nock = (): void => {
  nock('https://digitalcredentials.github.io')
    .get('/community-registry/registryyyyyy.json')
    .reply(404)
}

import nock from 'nock'
import { oidfECResponseDCC } from '../httpResponses/oidfResponses/oidfECResponseDCC.js'
import { oidfECResponseDCC2 } from '../httpResponses/oidfResponses/oidfECResponseDCC2.js'

export const oidfECResponseDCCNock = (): void => {
  nock('https://registry.dcconsortium.org')
    .get('/.well-known/openid-federation')
    .reply(200, oidfECResponseDCC2)
}

export const oidfECResponseDCCTestNock = (): void => {
  nock('https://test.registry.dcconsortium.org')
    .get('/.well-known/openid-federation')
    .reply(200, oidfECResponseDCC)
}

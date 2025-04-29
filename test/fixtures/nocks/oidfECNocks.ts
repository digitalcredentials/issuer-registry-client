import nock from "nock"
import { oidfECResponseDCC } from "../httpResponses/oidfResponses/oidfECResponseDCC"

export const dcc2OidfNockB = (): void => {
  nock('https://registry.dcconsortium.org')
    .get('/.well-known/openid-federation')
    .reply(200, oidfECResponseDCC)
}

export const dcc2OidfNockB = (): void => {
    nock('https://test.registry.dcconsortium.org')
      .get('/.well-known/openid-federation')
      .reply(200, oidfECResponseDCC)
  }
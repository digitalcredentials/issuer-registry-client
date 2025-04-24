import nock from 'nock'
import { oidfFetchResponse } from '../oidfResponses/oidfFetchResponse.js'
// import { oidfEmptyFetchResponse } from '../oidfResponses/oidfEmptyFetchResponse.js'

// a missing did for this next one:  ?????
// https://test.registry.dcconsortium.org/fetch?sub=did:web:twotr.testschool.edu

export const singleOIDFNock = () => {
  nock('https://registry.dcconsortium.org')
    .get('/fetch?sub=did:web:oneuni.testuni.edu')
    .reply(200, oidfFetchResponse)
}

export const doubleLegacyNock = () => {
  // this nock returns a result listing two legacy registries
  nock('https://registry.dcconsortium.org')
    .get('/fetch?sub=did:web:oneuni.testuni.edu')
    .reply(200, oidfFetchResponse)

  // this nock returns a 404 (no DID found) result from the oidf registry
  nock('https://registry.dcconsortium.org')
    .get('/fetch?sub=did:key:z6MkpLDL3RoAoMRTwTgo3rs39ZwssfaPKtGdZw7AGRN7CK4W')
    .reply(404, {})
}

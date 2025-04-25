import nock from 'nock'
import { oidfFetchResponseA } from '../httpResponses/oidfResponses/oidfFetchResponseA.js'
import { oidfFetchResponseB } from '../httpResponses/oidfResponses/oidfFetchResponseB.js'

export const dccOidfNockA = () => {
  nock('https://test.registry.dcconsortium.org')
    .get('/fetch?sub=did:web:oneuni.testuni.edu')
    .reply(200, oidfFetchResponseA)
}

export const dccOidfNockB = () => {
  nock('https://test.registry.dcconsortium.org')
    .get('/fetch?sub=did:web:twotr.testschool.edu')
    .reply(200, oidfFetchResponseB)
}

export const dccOidf404Nock = () => {
  // this nock returns a 404 (no DID found) result from the oidf registry
  nock('https://test.registry.dcconsortium.org')
    .get('/fetch?sub=did:key:z6MkpLDL3RoAoMRTwTgo3rs39ZwssfaPKtGdZw7AGRN7CK4W')
    .reply(404)
}

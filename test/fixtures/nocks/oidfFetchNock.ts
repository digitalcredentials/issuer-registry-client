import nock from 'nock'
import { oidfFetchResponseA } from '../httpResponses/oidfResponses/oidfFetchResponseA.js'
import { oidfFetchResponseB } from '../httpResponses/oidfResponses/oidfFetchResponseB.js'

export const dccOidfNockTestA = (): void => {
  nock('https://test.registry.dcconsortium.org')
    .get('/fetch?sub=did:web:oneuni.testuni.edu')
    .reply(200, oidfFetchResponseA)
}

export const dccOidfNockTestB = (): void => {
  nock('https://test.registry.dcconsortium.org')
    .get('/fetch?sub=did:web:twotr.testschool.edu')
    .reply(200, oidfFetchResponseB)
}

export const dccOidfNockProdB = (): void => {
  nock('https://registry.dcconsortium.org')
    .get('/fetch?sub=did:web:twotr.testschool.edu')
    .reply(200, oidfFetchResponseB)
}

export const dccOidf404TestCNock = (): void => {
  // this nock returns a 404 (no DID found) result from the oidf registry
  nock('https://test.registry.dcconsortium.org')
    .get('/fetch?sub=did:key:z6MkpLDL3RoAoMRTwTgo3rs39ZwssfaPKtGdZw7AGRN7CK4W')
    .reply(404)
}

export const dccOidf404ForAllProdNock = (): void => {
  // this nock returns a 404 (no DID found) result from the oidf registry
  nock('https://registry.dcconsortium.org')
    .get(uri => uri.includes('fetch'))
    .reply(404)
}

export const dccOidf404ProdCNock = (): void => {
  // this nock returns a 404 (no DID found) result from the oidf registry
  nock('https://registry.dcconsortium.org')
    .get('/fetch?sub=did:key:z6MkpLDL3RoAoMRTwTgo3rs39ZwssfaPKtGdZw7AGRN7CK4W')
    .reply(404)
}

export const badDccOidf404Nock = (): void => {
  // this nock returns a 404 (no DID found) result from the oidf registry
  nock('https://registryyyyy.dcconsortium.org')
    .get('/fetch?sub=did:web:oneuni.testuni.edu')
    .reply(400)
}

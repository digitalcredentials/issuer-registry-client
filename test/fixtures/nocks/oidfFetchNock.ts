import nock from 'nock'
import { oidfFetchResponse } from '../oidfFetchResponse.js'

export default () => {
  nock('https://registry.dcconsortium.org')
    .get('/fetch?sub=did:web:oneuni.testuni.edu')
    .reply(200, oidfFetchResponse)
}

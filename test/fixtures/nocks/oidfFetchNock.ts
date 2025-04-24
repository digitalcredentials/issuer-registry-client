import nock from 'nock'

const response = `{
  
}`

export default () => {
  nock('http://localhost:4009/fetch?sub=did:key:234234')
    .get('/fetch')
    .reply(200, response)
}
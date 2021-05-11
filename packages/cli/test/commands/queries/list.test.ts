import {testAuthorizationHeaderFlag} from '../../authorization-tests'

const emptyQueryCollectionResponse = {
  count: 0,
  page: 1,
  page_size: 1,
  results: [],
}

describe('command queries:list ', () => {
  testAuthorizationHeaderFlag(['queries:list'], '/api/queries', emptyQueryCollectionResponse)
})

import * as qs from 'utils/queryString'

describe('utils/queryString', () => {
  describe('.merge', () => {
    it('should merge params', () => {
      const params1 = '?query=abc'
      const params2 = { filter: 'active' }
      expect(qs.merge(params1, params2)).toEqual('?filter=active&query=abc')
    })
  })
})

import * as filter from 'utils/filterIntros'

describe('utils/filterIntros', () => {
  describe('.searchFilter', () => {
    const intros = [
      {
        id: 1,
        to: 'John',
        from: 'Jake',
        to_email: 'nhoj@gmail.com',
        from_email: 'ekaj@gmail.com',
        status: 'initialized',
        updated_at: new Date(),
      },
      {
        id: 2,
        to: 'Maliq',
        from: 'Akai',
        to_email: 'qilam@gmail.com',
        from_email: 'iaka@gmail.com',
        status: 'initialized',
        updated_at: new Date(),
      },
    ]

    it('not found', () => {
      expect(
        filter.searchFilter(intros, { status: 'active', query: 'jackson' })
      ).toHaveLength(0)
    })

    it('found by query', () => {
      const keywords = ['Joh', 'jak', 'nho', 'eka', 'JOHN']
      keywords.forEach(key => {
        const result = filter.searchFilter(intros, {
          status: 'active',
          query: key,
        })

        expect(result).toHaveLength(1)
      })
    })

    it('found all intros', () => {
      expect(
        filter.searchFilter(intros, { status: 'active', query: '' })
      ).toHaveLength(2)
    })
  })
})

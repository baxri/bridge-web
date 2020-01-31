import computeContactsFromIntros from 'components/shared/computeContactsFromIntros'

describe('computeContacts', () => {
  describe('search', () => {
    const contacts = [
      {
        id: 1,
        name: 'booth',
        email: 'poll@moll.com',
      },
      {
        id: 2,
        name: 'bakeriwala',
        email: 'bakers@master.com',
      },
      {
        id: 3,
        name: 'ec',
        email: 'poll@results.com',
      },
    ]

    const intros = [
      {
        id: 1,
        to: 'poll',
        from: 'ec',
        to_email: 'bakers@master.com',
        from_email: 'poll@moll.com',
      },
      {
        id: 2,
        to: 'poll',
        from: 'ec',
        to_email: 'bakers@master.com',
        from_email: 'poll@moll.com',
      },
      {
        id: 3,
        to: 'poll',
        from: 'ec',
        to_email: 'poll@moll.com',
        from_email: 'bakers@master.com',
      },
      {
        id: 4,
        to: 'poll',
        from: 'ec',
        to_email: 'poll@results.com',
        from_email: 'poll@moll.com',
      },
    ]

    it('not found', () => {
      expect(
        computeContactsFromIntros(contacts, intros, {
          page: '1',
          query: 'johnson',
        })
      ).toHaveLength(0)
    })

    it('searched by keywords', () => {
      const keywords = ['poll', 'b']
      keywords.forEach(key => {
        const results = computeContactsFromIntros(contacts, intros, {
          page: '1',
          query: key,
        })
        expect(results).toHaveLength(2)
      })
    })

    it('counts no of times contact is involved in intros', () => {
      const results = computeContactsFromIntros(contacts, intros, {
        page: '1',
        query: '',
      })

      results.forEach(result => {
        if (result.email === 'poll@moll.com') {
          expect(result.introsCount).toEqual(4)
        }
      })
      results.forEach(result => {
        if (result.email === 'bakers@master.com') {
          expect(result.introsCount).toEqual(3)
        }
      })
      results.forEach(result => {
        if (result.email === 'poll@results.com') {
          expect(result.introsCount).toEqual(1)
        }
      })
    })

    it('found all contacts', () => {
      expect(
        computeContactsFromIntros(contacts, intros, { page: '1', query: '' })
      ).toHaveLength(3)
    })
  })
})

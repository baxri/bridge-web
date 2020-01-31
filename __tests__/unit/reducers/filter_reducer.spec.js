import {
  SET_INTRODUCTION_FILTER,
  RESET_INTRODUCTION_FILTER,
  SET_CONTACT_FILTER,
  RESET_CONTACT_FILTER,
} from 'actions/types'
import reducer from 'reducers/filter_reducer'

describe('filter reducer', () => {
  describe('introduction filter', () => {
    it('should return initial state', () => {
      expect(reducer(undefined, {}).introduction).toEqual({
        query: '',
        status: 'active',
        page: 1,
        perPage: 10,
      })
    })

    it('should update introduction filter', () => {
      const initial = reducer(undefined, {})
      const updatedState = {
        query: 'john',
        page: 2,
        filter: 'archived',
      }
      const data = reducer(initial, {
        type: SET_INTRODUCTION_FILTER,
        payload: updatedState,
      })

      expect(data.introduction).toMatchObject(updatedState)
    })

    it('reset state', () => {
      const initial = reducer(undefined, {})
      const data = reducer(initial, {
        type: SET_INTRODUCTION_FILTER,
        payload: { query: 'john', filter: 'archived' },
      })
      const reset = reducer(data, { type: RESET_INTRODUCTION_FILTER })
      expect(reset).toEqual(initial)
    })
  })

  describe('contact filter reducer', () => {
    it('should return initial state', () => {
      expect(reducer(undefined, {}).contact).toEqual({
        query: '',
        status: 'active',
        page: 1,
        perPage: 10,
      })
    })

    it('should update contact filter', () => {
      const initial = reducer(undefined, {})
      const updatedState = {
        query: 'test',
        page: 2,
        filter: 'name',
      }
      const data = reducer(initial, {
        type: SET_CONTACT_FILTER,
        payload: updatedState,
      })
      expect(data.contact).toMatchObject(updatedState)
    })

    it('reset state', () => {
      const initial = reducer(undefined, {})
      const data = reducer(initial, {
        type: SET_CONTACT_FILTER,
        payload: { query: 'test', filter: 'name' },
      })
      const reset = reducer(data, { type: RESET_CONTACT_FILTER })
      expect(reset).toEqual(initial)
    })
  })
})

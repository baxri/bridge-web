import * as types from 'actions/types'

const INITIAL_STATE = {
  introduction: {
    query: '',
    status: 'active',
    page: 1,
    perPage: 10,
  },
  contact: {
    query: '',
    status: 'active',
    page: 1,
    perPage: 10,
  },
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SET_INTRODUCTION_FILTER:
      return {
        ...state,
        introduction: {
          ...state.introduction,
          ...action.payload,
        },
      }
    case types.RESET_INTRODUCTION_FILTER:
      return {
        ...state,
        introduction: { ...INITIAL_STATE.introduction },
      }

    case types.SET_CONTACT_FILTER:
      return {
        ...state,
        contact: {
          ...state.contact,
          ...action.payload,
        },
      }
    case types.RESET_CONTACT_FILTER:
      return {
        ...state,
        contact: { ...INITIAL_STATE.contact },
      }
    default:
      return state
  }
}

import * as types from '../actions/types'

const INITIAL_STATE = {
  loadingAccept: true,
  message: '',
  error: '',
  share: null,
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SHARE_SUCCESS:
      return { ...state, error: '' }
    case types.SHARE_GET_SUCCESS:
      return {
        ...state,
        loadingAccept: false,
        error: '',
        share: action.payload.share,
      }
    case types.SHARE_ACCEPT_SUCCESS:
      return {
        ...state,
        loadingAccept: false,
        error: '',
        share: action.payload.share,
      }
    case types.SHARE_RESET_MESSAGE:
      return { ...state, message: '' }
    case types.SHARE_RESET_ERROR:
      return { ...state, error: '' }
    case types.SHARE_ERROR:
      return { ...state, error: action.payload.error, message: '' }
    default:
      return state
  }
}

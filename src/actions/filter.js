import * as types from './types'

export function setIntroductionFilter(payload) {
  return dispatch =>
    dispatch({
      type: types.SET_INTRODUCTION_FILTER,
      payload,
    })
}

export function resetIntroductionFilter() {
  return dispatch => dispatch({ type: types.RESET_INTRODUCTION_FILTER })
}

export function setContactFilter(payload) {
  return dispatch =>
    dispatch({
      type: types.SET_CONTACT_FILTER,
      payload,
    })
}

export function resetContactFilter() {
  return dispatch => dispatch({ type: types.RESET_CONTACT_FILTER })
}

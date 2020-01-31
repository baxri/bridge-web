import {
  errorHandler,
  stdSuccess,
  stdError,
} from 'intropath-core/actions/fetch/util'
import api from 'intropath-core/actions/fetch/api'
import * as types from '../actions/types'
import { updateContacts } from 'intropath-core/actions/update'

export function share(values) {
  return dispatch =>
    api()
      .post(`/shares`, values)
      .then(stdSuccess(dispatch, types.SHARE_SUCCESS))
      .then(({ data }) => {
        if (data.data.contact) dispatch(updateContacts())
      })
      .catch(stdError(dispatch, types.SHARE_ERROR, false))
}

export function findShareByEmail(email) {
  return dispatch =>
    api()
      .get(`/shares/find_by_email?email=${email}`)
      .then(response => {
        return response
      })
      .catch(error => {
        if (error && error.response && error.response.status === 404) {
          return { status: 404, statusText: 'Not Found' }
        } else {
          errorHandler(dispatch, error.response, types.SHARE_ERROR)
        }
      })
}

export function getShare(shareId, token) {
  return dispatch =>
    api({ auth: false })
      .get(`/shares/${shareId}?token=${token}`)
      .then(stdSuccess(dispatch, types.SHARE_GET_SUCCESS))
      .catch(stdError(dispatch, types.SHARE_ERROR, false))
}

export function accept(shareId, token) {
  return dispatch =>
    api()
      .post(`/shares/${shareId}/accept?token=${token}`)
      .then(stdSuccess(dispatch, types.SHARE_ACCEPT_SUCCESS))
      .catch(stdError(dispatch, types.SHARE_ERROR, false))
}

export function resetMessage() {
  return dispatch => dispatch({ type: types.SHARE_RESET_MESSAGE })
}

export function resetErrorMessage() {
  return dispatch => dispatch({ type: types.SHARE_RESET_ERROR })
}

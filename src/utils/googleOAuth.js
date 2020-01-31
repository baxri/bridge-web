import axios from 'axios'
import { getItem } from './storage'

const { gapi } = window

const LOCAL_CLIENT_ID =
  '1013514164209-rvj4shgfa2pmol57brs5r5eboqqlujt1.apps.googleusercontent.com'

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || LOCAL_CLIENT_ID

const SCOPE =
  'email profile https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/contacts.readonly'

const CALLBACK_URL =
  process.env.NODE_ENV === 'development' || process.env.REACT_APP_BUILD === 'CI'
    ? 'http://localhost:3000/auth/google_oauth2/callback'
    : `${process.env.REACT_APP_API_BASE_URL}/auth/google_oauth2/callback`

function loadClient() {
  return new Promise((resolve, reject) => {
    gapi.load('auth2', {
      callback: () => resolve(),
      onerror: () => reject('Google API failed to load'),
    })
  })
}

function initClient() {
  return new Promise((resolve, reject) => {
    gapi.auth2
      .init({ client_id: CLIENT_ID, scope: SCOPE })
      .then(() => resolve(), error => reject(error))
  })
}

function grantAccess() {
  return new Promise((resolve, reject) => {
    const auth = gapi.auth2.getAuthInstance()
    auth
      .grantOfflineAccess()
      .then(data => resolve(data), error => reject(error))
  })
}

function getToken(code) {
  const url = `${CALLBACK_URL}?code=${encodeURIComponent(code)}`
  const headers = {
    'X-Requested-With': 'XMLHttpRequest',
    Authorization: `Bearer ${getItem('token')}`,
  }

  return axios.get(url, { headers })
}

export default function googleOAuth() {
  return loadClient()
    .then(() => initClient())
    .then(() => grantAccess())
    .then(({ code }) => getToken(code))
    .then(({ data }) => {
      const auth = gapi.auth2.getAuthInstance()
      const currentUser = auth.currentUser.get()
      const profile_pic_url = currentUser.getBasicProfile()
        ? currentUser.getBasicProfile().getImageUrl()
        : null
      return { token: data.token, profile_pic_url }
    })
}

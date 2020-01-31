import { AppAdapter } from 'intropath-core'
import { getItem, setItem, removeItem, Storage } from 'utils/storage'
import history from './utils/history'
import queryString from 'query-string'
import UpdateStorageBase from 'intropath-core/utils/updateStorageBase'

const Raven = window.Raven

const FullStory = window.FS
const Intercom = window.Intercom

export default class WebAppAdapter extends AppAdapter {
  getApiUrl() {
    if (!this.apiUrl) {
      if (
        process.env.NODE_ENV === 'development' ||
        process.env.REACT_APP_BUILD === 'CI'
      ) {
        this.apiUrl = process.env.REACT_APP_API_BASE_URL
          ? `${process.env.REACT_APP_API_BASE_URL}/api/v1`
          : 'http://localhost:3000/api/v1'
      } else {
        this.apiUrl = `${process.env.REACT_APP_API_BASE_URL}/api/v1`
      }
    }

    return this.apiUrl
  }

  async getAuthToken() {
    return getItem('token')
  }

  async setUserSessionHandler(user, token) {
    Raven.setUserContext({ id: user.id, email: user.email })
    if (FullStory) {
      FullStory.identify(user.id, {
        displayName: user.first_name + ' ' + user.last_name,
        email: user.email,
      })
    }
    if (Intercom) {
      let createdAtUnixTimestampInSeconds = user.created_at
        ? Math.floor(Date.parse(user.created_at) / 1000)
        : null
      Intercom('boot', {
        app_id: 'fd86jixg',
        name: user.first_name + ' ' + user.last_name,
        email: user.email,
        created_at: createdAtUnixTimestampInSeconds,
      })
    }
    setItem('token', token)
    setItem('user', user)
  }

  async onAfterSuccessLogin(options) {
    if (options && options.modal) {
      options.modalClose()
    } else {
      const { return_to } = queryString.parse(history.location.search)
      history.push(return_to || '/')
    }
  }

  async onAfterSuccessRegister(options) {
    if (options && options.modal) {
      options.modalClose()
    } else {
      history.push('/')
    }
  }

  async onAfterSuccessEmailConfirmation(authenticated) {
    if (authenticated) {
      const user = getItem('user')
      user.confirmed = true
      setItem('user', user)
    }

    history.push('/')
  }

  async onAfterLogout() {
    Raven.setUserContext({ id: null, email: null })
    removeItem('token')
    removeItem('user')
    this.getUpdateStorage('/introductions').cleanup()
    this.getUpdateStorage('/contacts').cleanup()
    history.push('/login')
  }

  async onPasswordReset() {
    history.push('/login')
  }

  async onAfterRecoverAccount(user) {
    setItem('user', user)
  }

  async onAfterSoftDeleteAccount(user) {
    setItem('user', user)
  }

  async onAfterUserUpdate(user) {
    setItem('user', user)
  }

  async onAddGAuthToken(token) {
    const user = getItem('user')

    if (user) {
      user.tokens.push(token)
      setItem('user', user)
    }
  }

  async onRemoveGAuthToken(tokenId) {
    const user = getItem('user')

    if (user) {
      user.tokens = user.tokens.filter(t => t.id !== tokenId)
      setItem('user', user)
    }
  }

  getUpdateStorage(name) {
    return new UpdateStorageBase(name, new Storage())
  }
}

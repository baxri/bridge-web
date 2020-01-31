import 'es6-shim'
import 'es7-shim'
import 'utils/polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import Cookies from 'js-cookie'
import ReactGA from 'react-ga'
import { SnackbarProvider } from 'notistack'

import { getItem, setItem } from './utils/storage'
import routes from './routes'
import { AUTH_USER } from 'intropath-core/actions/types'
import history from './utils/history'
import createStore from './store'
import GlobalStyle from 'components/layout/GlobalStyle'
import { Provider as FocusProvider } from 'context/FocusContext'

import { setAppAdapter } from 'intropath-core'
import WebAppAdapter from './webAppAdapter'
// Import stylesheets
import './index.css'

setAppAdapter(new WebAppAdapter())

const FullStory = window.FS
const Intercom = window.Intercom

const Raven = window.Raven

// Initialize Google Analytics
ReactGA.initialize('UA-118574813-1')

function onPageView() {
  ReactGA.pageview(window.location.pathname)
  if (Intercom) {
    Intercom('update') // So people receive the most recent messages in Intercom
  }
}

const store = createStore({})
const token = getItem('token')
const user = getItem('user')

// normalize user tokens
if (user && !user.tokens) {
  user.tokens = []
  setItem('user', user)
}

if (user && token) {
  Raven.setUserContext({ id: user.id, email: user.email })
  store.dispatch({ type: AUTH_USER, payload: user })
  Cookies.set('token', token, { expires: 30 })
  if (FullStory) {
    FullStory.identify(user.id, {
      displayName: user.first_name + ' ' + user.last_name,
      email: user.email,
    })
  }
  if (Intercom) {
    var createdAtUnixTimestampInSeconds = user.created_at
      ? Math.floor(Date.parse(user.created_at) / 1000)
      : null
    Intercom('boot', {
      app_id: 'fd86jixg',
      name: user.first_name + ' ' + user.last_name,
      email: user.email,
      created_at: createdAtUnixTimestampInSeconds,
    })
  }
} else {
  Cookies.remove('token')
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} onUpdate={onPageView}>
      <SnackbarProvider
        dense
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        classes={{ root: 'full-snackbar', base: 'full-snackbar-base' }}
        maxSnack={1}
      >
        <FocusProvider>
          <React.Fragment>
            {routes}
            <GlobalStyle history={history} />
          </React.Fragment>
        </FocusProvider>
      </SnackbarProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
)

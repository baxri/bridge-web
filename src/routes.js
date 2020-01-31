import React from 'react'
import { Switch, Route } from 'react-router-dom'
import mixpanel from 'mixpanel-browser'

//new design
import App from 'components/app'
import OverviewPage from 'components/overview'
import Profile from 'components/Profile/Profile'
import Introductions from 'components/introductions/list'
import ConnectLinkedIn from 'components/connect/linkedin'
import ConfirmNoAuthContainer from 'components/confirm/ConfirmNoAuthContainer'
import NewConfirmNoAuthContainer from 'components/confirm/NewConfirmNoAuthContainer'
import ConfirmationSuccess from 'components/introductions/Confirm/ConfirmationSuccess'
import RecoverAccount from 'components/auth/RecoverAccount'

import ShareContainer from 'components/share/new/Container'
import ShareAcceptContainer from 'components/share/accept/Container'
import PrivacyPolicyPage from 'components/pages/privacy-policy-page'
import TermsPage from 'components/pages/terms-page'
import CookiePolicyPage from 'components/pages/cookie-policy-page'
import NotFoundPage from 'components/pages/not-found-page'

import CancelContainer from 'components/introductions/cancel/CancelContainer'
import RejectContainer from 'components/introductions/reject/RejectContainer'
import IntroductionRating, {
  IntroductionRatingMessage,
} from 'components/introductions/rate'
import NewIntro from 'components/introductions/new'

import NewIntro2 from 'components/introductions/new-v2'

// unlogged pages
import Register from 'components/auth/register'
import Login from 'components/auth/login'
import ForgotPassword from 'components/auth/forgot_password'
import ResetPassword from 'components/auth/reset_password'
import Confirmation from 'components/auth/confirmation'
import Logout from 'components/auth/logout'
import Contacts, { Contact } from 'components/contacts'
import AcceptContainer from 'components/accept/AcceptContainer'
import CancelByOwner from 'components/introductions/CancelByOwner/CancelByOwner'
import { MixpanelContext } from 'utils/mixpanelContext'
// import IntrosRoute from 'components/routes/IntrosRoute'

import RequireAuth from 'components/auth/require_auth'
import AuthLayout from 'components/layout/Auth'
import GoogleSync from './components/google-sync'

mixpanel.init(
  process.env.REACT_APP_MIXPANEL_TOKEN || '7f5f80abfd0a7835b81090a29e7cba19'
)

const BACKEND_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000'

export default (
  <MixpanelContext.Provider value={{ mixpanel: mixpanel }}>
    <App>
      <Switch>
        <Route path="/" exact component={RequireAuth(OverviewPage)} />
        <Route path="/privacy" component={PrivacyPolicyPage} />
        <Route path="/terms" component={TermsPage} />
        <Route path="/cookie" component={CookiePolicyPage} />
        <Route path="/register" component={AuthLayout(Register)} />
        <Route path="/login" component={AuthLayout(Login)} />
        <Route path="/logout" component={Logout} />
        <Route path="/forgot-password" component={AuthLayout(ForgotPassword)} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/confirmation" component={Confirmation} />
        <Route
          path="/introductions/new-by-share"
          component={NewConfirmNoAuthContainer}
        />
        <Route
          path="/introductions/:introId/confirm"
          component={ConfirmNoAuthContainer}
        />
        <Route
          path="/introductions/:introId/accept"
          component={AcceptContainer}
        />
        <Route
          path="/introductions/:introId/cancel"
          component={CancelContainer}
        />
        <Route
          path="/introductions/:introId/cancel_by_owner"
          component={CancelByOwner}
        />
        <Route
          path="/introductions/:introId/reject"
          component={RejectContainer}
        />
        <Route
          path="/introductions/:introId/rate"
          component={IntroductionRating}
        />
        <Route
          path="/introductions/:introId/rating-message"
          component={IntroductionRatingMessage}
        />
        <Route path="/import-contacts" component={RequireAuth(GoogleSync)} />
        <Route path="/introductions/new" component={RequireAuth(NewIntro2)} />
        <Route
          path="/introductions/new-old"
          component={RequireAuth(NewIntro)}
        />
        <Route path="/introductions" component={RequireAuth(Introductions)} />
        <Route path="/contacts" exact component={RequireAuth(Contacts)} />
        <Route
          path="/contacts/by_name_and_email"
          component={RequireAuth(Contact)}
        />
        <Route
          path="/contacts/:contactId"
          exact
          component={RequireAuth(Contact)}
        />
        <Route path="/confirmation-success" component={ConfirmationSuccess} />
        <Route path="/profile" component={RequireAuth(Profile)} />
        <Route
          path="/connect/linkedin"
          component={RequireAuth(ConnectLinkedIn)}
        />
        <Route path="/share" component={RequireAuth(ShareContainer)} />
        <Route
          path="/shares/:shareId/accept"
          component={ShareAcceptContainer}
        />
        <Route path="/recover" component={RecoverAccount} />
        <Route
          path="/s/:id"
          component={props => {
            window.location.href = `${BACKEND_URL}/s/${props.match.params.id}`
            return null
          }}
        />
        <Route component={NotFoundPage} /> */}
      </Switch>
    </App>
  </MixpanelContext.Provider>
)

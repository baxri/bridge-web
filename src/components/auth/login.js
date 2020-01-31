import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  loginUser,
  resetMessage,
  resetErrorMessage,
} from 'intropath-core/actions/auth'
import { Flash } from 'components/shared'
import LoginForm from 'components/auth/LoginForm'
import { MixpanelContext } from 'utils/mixpanelContext'

class Login extends Component {
  static propTypes = {
    loginUser: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  }

  static contextType = MixpanelContext

  componentWillMount() {
    if (this.props.authenticated) {
      this.props.history.push('/')
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.authenticated) {
      this.update_event(this.props)
    } else {
      this.context.mixpanel.track('AUTHENTICATION_FAILED')
    }
  }

  update_event(props, prevProps) {
    const { user } = this.props
    const user_id = user ? user.id : ''
    this.context.mixpanel.identify(user_id)
    this.context.mixpanel.track('AUTHENTICATION_SUCCEEDED')
  }

  render() {
    return (
      <div>
        {this.props.message && (
          <Flash
            type="success"
            message={this.props.message}
            clearMessage={this.props.resetMessage}
          />
        )}
        {this.props.errorMessage && (
          <Flash
            type="error"
            message={this.props.errorMessage}
            clearMessage={this.props.resetErrorMessage}
          />
        )}
        <LoginForm
          loginUser={this.props.loginUser}
          mixpanel={this.context.mixpanel}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message,
    authenticated: state.auth.authenticated,
    user: state.auth.user,
  }
}

export default connect(
  mapStateToProps,
  { loginUser, resetMessage, resetErrorMessage }
)(Login)

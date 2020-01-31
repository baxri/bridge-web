import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  registerUser,
  resetMessage,
  resetErrorMessage,
} from 'intropath-core/actions/auth'
import { Flash } from 'components/shared'
import RegisterForm from 'components/auth/RegisterForm'
import { MixpanelContext } from 'utils/mixpanelContext'
import { parse } from 'utils/queryString'

class Register extends Component {
  static contextType = MixpanelContext

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      hasInvite: false,
    }
  }

  componentWillMount() {
    const { invite } = parse(this.props.location.search)

    // TODO Should check backend if invite is valid
    const hasInvite = invite && invite.length > 0

    this.setState({ loading: false, hasInvite })
  }

  componentDidUpdate(prevProps) {
    if (this.props.authenticated) {
      this.account_created(this.props)
    } else {
      this.context.mixpanel.track('ACCOUNT_CREATION_FAILED')
    }
  }

  account_created(props, prevProps) {
    const { user } = this.props
    const user_id = user ? user.id : ''
    this.context.mixpanel.identify(user_id)
    this.context.mixpanel.track('ACCOUNT_CREATED')
  }

  render() {
    const { loading, hasInvite } = this.state
    if (loading) {
      return null
    }
    if (!hasInvite) {
      return (
        <div>
          <h5>
            Please <a href="mailto:invite@brdg.app?subject=Invite">email us</a>{' '}
            to get an invite
          </h5>
        </div>
      )
    }
    if (hasInvite) {
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
          <RegisterForm registerUser={this.props.registerUser} />
        </div>
      )
    }
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
  { registerUser, resetMessage, resetErrorMessage }
)(Register)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { Col } from 'reactstrap'

import { getShare, accept, resetErrorMessage } from 'actions/share'
import {
  loginUser,
  registerUser,
  resetErrorMessage as resetAuthErrorMessage,
} from 'intropath-core/actions/auth'

import { Flash } from 'components/shared'
import LoginForm from 'components/auth/LoginForm'
import RegisterForm from 'components/auth/RegisterForm'

const propTypes = {
  getShare: PropTypes.func.isRequired,
  accept: PropTypes.func.isRequired,
}

const getFirstName = name => {
  return name ? name.split(' ')[0] : ''
}

const getLastName = name => {
  const fullName = name ? name.split(' ') : null
  return fullName && fullName.length > 1 ? fullName[fullName.length - 1] : ''
}

class Container extends Component {
  static propTypes = {
    match: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.query = queryString.parse(props.location.search)
    this.state = { showLogin: false, showSignUp: false }
  }

  componentWillMount() {
    const shareId = this.props.match.params.shareId
    const { token } = this.query
    if (this.props.user) {
      // Accept share if already logged in
      this.props
        .accept(shareId, token)
        .catch(e => window.Raven.captureException(e))
    } else {
      this.props
        .getShare(shareId, token)
        .catch(e => window.Raven.captureException(e))
    }
  }

  authDone = () => {
    const shareId = this.props.match.params.shareId
    const { token } = this.query
    if (this.props.user) {
      // Accept now that user is logged in
      this.props
        .accept(shareId, token)
        .catch(e => window.Raven.captureException(e))
    }
  }

  handleShowLogin = () => {
    this.setState({ showLogin: true, showSignUp: false })
  }

  handleShowSignUp = () => {
    this.setState({ showLogin: false, showSignUp: true })
  }

  render() {
    const {
      user,
      loading,
      share,
      errorMessage,
      resetErrorMessage,
      loginUser,
      registerUser,
      authErrorMessage,
      resetAuthErrorMessage,
      extensionURL,
    } = this.props

    if (loading) {
      return <div>Accepting ...</div>
    }

    return (
      <div className="page contact contact-2 success-message">
        <div className="container">
          {errorMessage && errorMessage !== 'Already accepted' && (
            <Flash
              type="error"
              message={errorMessage}
              clearMessage={resetErrorMessage}
            />
          )}
          {errorMessage && errorMessage === 'Already accepted' && (
            <header>
              <h1 className="heading">Network access already accepted!</h1>
              <p className="sub-heading">
                <br />
                Install the{' '}
                <a style={{ textDecoration: 'underline' }} href={extensionURL}>
                  Bridge Chrome extension
                </a>{' '}
                to start unlocking incredible intros
              </p>
            </header>
          )}
          {authErrorMessage && (
            <Flash
              type="error"
              message={authErrorMessage}
              clearMessage={resetAuthErrorMessage}
            />
          )}

          {share && (
            <header>
              {share.status === 'accepted' && user && (
                <div>
                  <h1 className="heading">
                    You now have access
                    <br />
                    to {share.user.first_name}'s network!
                  </h1>
                  <p className="sub-heading">
                    <br />
                    Install the{' '}
                    <a
                      style={{ textDecoration: 'underline' }}
                      href={extensionURL}
                    >
                      Bridge Chrome extension
                    </a>{' '}
                    to start unlocking incredible intros
                  </p>
                </div>
              )}

              {share.status === 'accepted' && !user && (
                <header>
                  <h1 className="heading">Network access already accepted!</h1>
                  <p className="sub-heading">
                    <br />
                    Install the{' '}
                    <a
                      style={{ textDecoration: 'underline' }}
                      href={extensionURL}
                    >
                      Bridge Chrome extension
                    </a>{' '}
                    to start unlocking incredible intros
                  </p>
                </header>
              )}

              {share.status !== 'accepted' &&
                !this.state.showSignUp &&
                (share.email_has_account || this.state.showLogin) && (
                  <div>
                    <p className="sub-heading">
                      Please login to get access
                      <br />
                      to {share.user.first_name}'s network!
                    </p>
                    <div style={{ textAlign: 'left', margin: '40px auto' }}>
                      <LoginForm
                        initialValues={{ email: share.email }}
                        loginUser={loginUser}
                        modal={true}
                        modalClose={this.authDone}
                        hideForgotPassword={true}
                      />
                    </div>

                    <div style={{ textAlign: 'left', margin: '40px auto' }}>
                      <Col lg={9}>
                        <a
                          href={false}
                          className="signup-link"
                          onClick={this.handleShowSignUp}
                        >
                          Sign up instead?
                        </a>
                      </Col>
                    </div>
                  </div>
                )}

              {share.status !== 'accepted' &&
                !this.state.showLogin &&
                (!share.email_has_account || this.state.showSignUp) && (
                  <div>
                    <p className="sub-heading">
                      Please sign up to get access
                      <br />
                      to {share.user.first_name}'s network!
                    </p>
                    <div style={{ textAlign: 'left', margin: '40px auto' }}>
                      <RegisterForm
                        initialValues={{
                          email: share.email,
                          firstName: getFirstName(share.contact_name),
                          lastName: getLastName(share.contact_name),
                        }}
                        registerUser={registerUser}
                        modal={true}
                        modalClose={this.authDone}
                      />
                    </div>
                    <div style={{ textAlign: 'left', margin: '40px auto' }}>
                      <Col
                        lg={9}
                        className="col-centered"
                        style={{ padding: '0px' }}
                      >
                        <a
                          className="login-link"
                          onClick={this.handleShowLogin}
                          href={false}
                        >
                          Already got an account?
                        </a>
                      </Col>
                    </div>
                  </div>
                )}
            </header>
          )}
        </div>
      </div>
    )
  }
}

Container.propTypes = propTypes

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    loading: state.share.loading,
    share: state.share.share,
    errorMessage: state.share.error,
    authErrorMessage: state.auth.error,
    extensionURL:
      'https://chrome.google.com/webstore/detail/intropath/ohjlfnhjabflkiocjhchhogighnpbelg',
  }
}

export default connect(
  mapStateToProps,
  {
    getShare,
    accept,
    resetErrorMessage,
    loginUser,
    registerUser,
    resetAuthErrorMessage,
  }
)(Container)

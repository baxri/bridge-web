import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { isMobile } from 'react-device-detect'

import {
  getForgotPasswordToken,
  resetMessage,
  resetErrorMessage,
} from 'intropath-core/actions/auth'
import { Flash } from 'components/shared'
import {
  StyledInput,
  Button,
  AuthBodyPanel,
  Header,
} from 'components/shared/index'

const form = reduxForm({
  form: 'forgotPassword',
})

const renderField = field => <StyledInput {...field} />

class ForgotPassword extends Component {
  static propsTypes = {
    history: PropTypes.object,
  }

  componentWillMount() {
    if (this.props.authenticated) {
      this.props.history.push('/')
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.authenticated) {
      this.props.history.push('/')
    }
    if (nextProps.message) {
      this.props.reset()
      this.props.resetErrorMessage()
      setTimeout(() => {
        this.props.resetMessage()
      }, 3000)
    }
  }

  handleFormSubmit = formProps => this.props.getForgotPasswordToken(formProps)

  render() {
    const { handleSubmit } = this.props

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
        <form
          className="default-form"
          onSubmit={handleSubmit(this.handleFormSubmit)}
        >
          <Header>MAKE INTROS MATTER</Header>
          <AuthBodyPanel>
            <div className="col-lg-12 col-xs-12">
              <div className="form-group introduce-input">
                <label>Email</label>
                <Field
                  name="email"
                  className="form-control"
                  component={renderField}
                  type={isMobile ? 'email' : 'text'}
                />
              </div>
              <Button style={{ width: '100%' }} type="submit">
                Reset Password
              </Button>
            </div>
          </AuthBodyPanel>
          <br />
          <div className="text-center">
            Got an account? Sign in <Link to="/login">here</Link>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message,
    authenticated: state.auth.authenticated,
  }
}

export default connect(
  mapStateToProps,
  { getForgotPasswordToken, resetMessage, resetErrorMessage }
)(form(ForgotPassword))

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { isMobile } from 'react-device-detect'

import { StyledInput, Button, AuthBodyPanel, Header } from 'components/shared'

const form = reduxForm({
  form: 'login',
  validate,
  touchOnBlur: false, // Do not validate on blur, sometimes breaks clicking on other elements as input error labels pushes form down so click 'misses'
})

const renderField = field => <StyledInput {...field} />

function validate(formProps) {
  const errors = {}

  if (!formProps.email) {
    errors.email = 'Please enter an email'
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password'
  }

  return errors
}

class LoginForm extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  handleFormSubmit = formProps => {
    const { modal, modalClose } = this.props
    this.props.loginUser(formProps, { modal, modalClose })
    this.credentials_submit()
  }

  credentials_submit() {
    this.props.mixpanel.track('AUTHENTICATION_SUBMITTED')
  }

  render() {
    const { handleSubmit, hideForgotPassword } = this.props
    return (
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
                autoFocus={true}
                name="email"
                className="form-control"
                component={renderField}
                type={isMobile ? 'email' : 'text'}
              />
            </div>
            <div className="form-group introduce-email-input">
              <label>Password</label>
              <Field
                name="password"
                className="form-control"
                component={renderField}
                type="password"
              />
            </div>
            <Button full type="submit">
              Log in
            </Button>
          </div>
        </AuthBodyPanel>
        <br />
        {!hideForgotPassword && (
          <div className="text-center">
            <Link to="/forgot-password">Forgot Password?</Link>
            <br />
            No account? Register <Link to="/register">here</Link>
          </div>
        )}
      </form>
    )
  }
}

export default form(LoginForm)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { isMobile } from 'react-device-detect'

import {
  StyledInput,
  Button,
  AuthBodyPanel,
  Header,
} from 'components/shared/index'

const form = reduxForm({
  form: 'register',
  validate,
  touchOnBlur: false, // Do not validate on blur, sometimes breaks clicking on other elements as input error labels pushes form down so click 'misses'
})

const renderField = field => <StyledInput {...field} />

function validate(formProps) {
  const errors = {}

  if (!formProps.firstName) {
    errors.firstName = 'Please enter a first name'
  }

  if (!formProps.lastName) {
    errors.lastName = 'Please enter a last name'
  }

  if (!formProps.email) {
    errors.email = 'Please enter an email'
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password'
  }

  return errors
}

class RegisterForm extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  handleFormSubmit = formProps => {
    const { modal, modalClose } = this.props
    this.props.registerUser(formProps, { modal, modalClose })
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <form
        className="default-form"
        onSubmit={handleSubmit(this.handleFormSubmit)}
      >
        <Header>MAKE INTROS MATTER</Header>
        <AuthBodyPanel>
          <div className="col-lg-12 col-xs-12">
            <div className="form-group introduce-input">
              <label>First Name</label>
              <Field
                autoFocus={true}
                name="firstName"
                className="form-control"
                component={renderField}
                type="text"
              />
            </div>
            <div className="form-group introduce-input">
              <label>Last Name</label>
              <Field
                name="lastName"
                className="form-control"
                component={renderField}
                type="text"
              />
            </div>
            <div className="form-group introduce-input">
              <label>Email</label>
              <Field
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
            <Button style={{ width: '100%' }} type="submit">
              Sign up
            </Button>
          </div>
        </AuthBodyPanel>
        <br />
        <div className="text-center">
          Got an account? Sign in <Link to="/login">here</Link>
        </div>
      </form>
    )
  }
}

export default form(RegisterForm)

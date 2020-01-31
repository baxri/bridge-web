import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import queryString from 'query-string'
import { Link } from 'react-router-dom'

import {
  resetPassword,
  resetMessage,
  resetErrorMessage,
  validatePasswordToken,
} from 'intropath-core/actions/auth'
import { Flash, LoadingData as Spinner, Button } from 'components/shared'

const form = reduxForm({
  form: 'resetPassword',
  validate,
})

function validate(formProps) {
  const errors = {}
  if (!formProps.password) {
    errors.password = 'Please enter a new password'
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please confirm new password'
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match'
  }
  return errors
}

const renderField = field => (
  <div>
    <input
      className={`form-control ${field.meta.touched &&
        field.meta.error &&
        'is-invalid'}`}
      {...field.input}
      type={field.type}
    />
    {field.meta.touched && field.meta.error && (
      <div className="invalid-feedback">{field.meta.error}</div>
    )}
  </div>
)

class ResetPassword extends Component {
  static propTypes = {
    history: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.query = queryString.parse(props.location.search)

    this.state = {
      isValid: false,
      isLoading: true,
    }
  }

  componentDidMount() {
    if (this.props.authenticated) {
      this.props.history.push('/')
    } else {
      this.validateToken()
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.authenticated) {
      this.props.history.push('/')
    }
    if (nextProps.message) {
      this.props.reset()
      setTimeout(() => {
        this.props.resetMessage()
      }, 3000)
    }
  }

  handleFormSubmit(formProps) {
    const { token } = this.query
    this.props.resetPassword(token, formProps)
  }

  async validateToken() {
    const { token } = this.query

    try {
      await validatePasswordToken(token)
      this.setState({ isLoading: false, isValid: true })
    } catch {
      this.setState({ isLoading: false, isValid: false })
    }
  }

  renderError() {
    const { errorMessage, resetErrorMessage } = this.props

    if (errorMessage) {
      const message = (
        <p>
          {errorMessage} <Link to="/forgot-password">here</Link>
        </p>
      )

      return (
        errorMessage && (
          <Flash
            message={message}
            type="error"
            clearMessage={resetErrorMessage}
          />
        )
      )
    }
  }

  render() {
    const { handleSubmit } = this.props
    const { isLoading, isValid } = this.state

    if (isLoading) {
      return <Spinner loading={true} />
    }

    if (!isValid) {
      return (
        <div className="mt-4 mt-md-5 text-center px-4">
          The reset password link has expired or is no longer valid, to reset it
          again please click <Link to="/forgot-password">here</Link>.
        </div>
      )
    }

    return (
      <form
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        className="col-md-4 offset-md-4"
      >
        {this.props.message && (
          <Flash
            message={this.props.message}
            type={'success'}
            clearMessage={this.props.resetMessage}
          />
        )}
        <fieldset className="form-group">
          <label>New Password:</label>
          <Field name="password" component={renderField} type="password" />
        </fieldset>

        <fieldset className="form-group">
          <label>Confirm New Password:</label>
          <Field
            name="passwordConfirm"
            component={renderField}
            type="password"
          />
        </fieldset>

        {this.renderError()}
        <Button type="submit">Change Password</Button>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message,
  }
}

export default connect(
  mapStateToProps,
  { resetPassword, resetMessage, resetErrorMessage }
)(form(ResetPassword))

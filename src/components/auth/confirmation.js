// get token from params
// send to backend
// redirect to login
// error or success message
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import queryString from 'query-string'

import {
  confirmUser,
  resetMessage,
  resetErrorMessage,
} from 'intropath-core/actions/auth'
import { Flash } from 'components/shared'
import { withSnackbar } from 'notistack/build/index'
import history from 'utils/history'

class Confirmation extends Component {
  static propTypes = {
    match: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.query = queryString.parse(this.props.location.search)
    this.state = { message: '' }
  }

  componentWillMount() {
    const { token } = this.query

    this.props
      .confirmUser(token)
      .then(({ data }) => {
        if (this.props.authenticated) {
          this.props.enqueueSnackbar('Email Confirmed')
          history.push('/')
        } else {
          this.setState({ message: data.message })
          history.push('/login')
        }
      })
      .catch(_error => {
        if (!this.props.authenticated) {
          history.push('/login')
        }
      })
  }

  render() {
    const successMessage = this.props.authenticated
      ? this.props.message
      : this.state.message

    return (
      <div>
        {this.props.message && (
          <Flash
            type="success"
            message={successMessage}
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
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    errorMessage: state.auth.error,
    message: state.auth.message,
  }
}

export default connect(
  mapStateToProps,
  { confirmUser, resetMessage, resetErrorMessage }
)(withSnackbar(Confirmation))

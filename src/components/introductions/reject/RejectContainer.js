import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import queryString from 'query-string'

import extractFirstName from 'utils/extractFirstName'
import {
  rejectIntroduction,
  fetchIntroductionByToken,
} from 'intropath-core/actions/introduction'
import CancelRejectForm from '../CancelRejectForm/CancelRejectForm'

const propTypes = {
  rejectIntroduction: PropTypes.func.isRequired,
}

class RejectContainer extends Component {
  componentDidMount() {
    const query = queryString.parse(this.props.location.search)
    this.props.fetchIntroductionByToken(
      this.props.match.params.introId,
      query.token
    )
  }

  render() {
    const { intro } = this.props
    const brokerFirstName = intro ? extractFirstName(intro.broker) : ''

    return (
      <CancelRejectForm
        intro={intro}
        brokerFirstName={brokerFirstName}
        location={this.props.location}
        formType="reject"
        match={this.props.match}
        sendRequest={this.props.rejectIntroduction}
        message={this.props.message}
        loading={this.props.loading}
        errorMessage={this.props.errorMessage}
      />
    )
  }
}

RejectContainer.propTypes = propTypes

function mapStateToProps(state) {
  return {
    errorMessage: state.introduction.error,
    loading: state.introduction.loading,
    message: state.introduction.message,
    intro: state.introduction.intro,
  }
}

export default connect(
  mapStateToProps,
  { rejectIntroduction, fetchIntroductionByToken }
)(RejectContainer)

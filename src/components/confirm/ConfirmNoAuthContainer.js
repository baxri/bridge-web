import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { If, Then, Else, When } from 'react-if'

import {
  fetchIntroductionByInitializeToken,
  confirmIntroductionNoAuth,
  resetErrorMessage,
} from 'intropath-core/actions/introduction'
import { MixpanelContext } from 'utils/mixpanelContext'
import { Heading, Flash } from 'components/shared'
import ConfirmFormNoAuth from './ConfirmFormNoAuth'
import ScrollUpOnMount from 'components/shared/components/ScrollUpOnMount'
import introlinkContactIdValue from './introlinkContactIdValue'
import history from '../../utils/history'

class ConfirmNoAuthContainer extends Component {
  static contextType = MixpanelContext

  static propTypes = {
    location: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.query = queryString.parse(props.location.search)
  }

  componentWillMount() {
    this.props.fetchIntroductionByInitializeToken(this.query.token)
  }

  mixpanelAccept = () => {
    const { intro } = this.props
    this.context.mixpanel.track('FIRST_OPT_IN_ACCEPTED', {
      IntroId: intro.id,
    })
  }

  submit = (id, values, token) => {
    return this.props
      .confirmIntroductionNoAuth(id, values, token, true)
      .then(r => {
        introlinkContactIdValue(r.data.from_contact_id)
        history.push('/confirmation-success')
      })
  }

  renderForm = () => {
    const { token, email } = this.query
    const introId = this.props.match.params.introId
    const intro = this.props.intro

    return (
      intro && (
        <ConfirmFormNoAuth
          intro={intro}
          token={token}
          email={email}
          introId={introId}
          initialValues={intro}
          confirmIntroductionNoAuth={this.submit}
          mixpanelAccept={this.mixpanelAccept}
          error={this.props.errorMessage}
          resetError={this.props.resetErrorMessage}
        />
      )
    )
  }

  render() {
    return (
      <div>
        <When condition={!!this.props.errorMessage && !this.props.intro}>
          <ScrollUpOnMount />
          <Flash
            message={this.props.errorMessage}
            type="error"
            clearMessage={this.props.resetErrorMessage}
          />
        </When>
        <If condition={this.props.loading}>
          <Then>
            <div className="page">
              <div className="container">
                <header>
                  <Heading.CenterHeading>Loading...</Heading.CenterHeading>
                </header>
              </div>
            </div>
          </Then>
          <Else>{this.renderForm()}</Else>
        </If>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.introduction.error,
    message: state.introduction.message,
    intro: state.introduction.intro,
    loading: state.introduction.loading,
  }
}

export default connect(
  mapStateToProps,
  {
    confirmIntroductionNoAuth,
    resetErrorMessage,
    fetchIntroductionByInitializeToken,
  }
)(ConfirmNoAuthContainer)

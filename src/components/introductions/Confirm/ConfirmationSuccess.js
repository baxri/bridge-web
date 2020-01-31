import React, { Component } from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'

import FeatureFlags from 'utils/featureFlags'

import { Heading, Thankyou } from 'components/shared'

import { fetchIntroduction } from 'intropath-core/actions/introduction'
import extractFirstName from 'utils/extractFirstName'
import { MixpanelContext } from 'utils/mixpanelContext'

class ConfirmationSucces extends Component {
  static contextType = MixpanelContext

  constructor(props) {
    super(props)
    this.query = queryString.parse(props.location.search)
  }

  sendUpdateTOMixpanel(intro) {
    const tracking_type = ''
    if (intro) {
      this.mixpanelRequest(tracking_type, intro.id)
    }
  }

  mixpanelRequest = (request_type, intro_id) => {
    this.context.mixpanel.track(request_type, {
      IntroId: intro_id,
    })
  }

  shouldShowCountMeIn = () => {
    if (!FeatureFlags.COUNT_ME_IN) {
      return false
    }

    let { intro } = this.props

    if (intro && intro.from_user_exists === false) {
      this.mixpanelRequest('COUNT_ME_IN_SHOWN', intro.id)
      return true
    } else {
      return false
    }
  }

  countMeIn = intro => {
    let url = ''
    this.mixpanelRequest('COUNT_ME_IN_CLICKED', intro.id)

    if (intro.status === 'confirmed') {
      url = `https://brdg.typeform.com/to/pXxXGr?intro_id=${intro.id}&n_email=${intro.from_email}&source=n1_approve`
      window.location = url
    }
  }

  render() {
    const { intro, next_intro } = this.props
    const show_count_me_in = this.shouldShowCountMeIn()

    const message = intro
      ? `Your Introduction to ${
          intro.to
        } will be reviewed by ${extractFirstName(intro.broker)} shortly.`
      : 'Whoops, something has gone wrong.'

    if (intro) {
      this.sendUpdateTOMixpanel(intro)
    }

    if (intro) {
      return (
        <Thankyou
          type="n1Success"
          onClick={() => this.countMeIn(intro)}
          intro={intro}
          next_intro={next_intro}
          show_count_me_in={show_count_me_in}
          back_to={this.query.back_to}
        />
      )
    }

    return (
      <div className="page contact contact-2">
        <div className="container">
          <header>
            <Heading.CenterHeading>{message}</Heading.CenterHeading>
            <p className="sub-heading">Thank You</p>
          </header>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.introduction.error,
    message: state.introduction.message,
    intro: state.introduction.intro,
    next_intro: state.introduction.next_intro,
    loading: state.introduction.loading,
  }
}

export default connect(
  mapStateToProps,
  { fetchIntroduction }
)(ConfirmationSucces)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import queryString from 'query-string'
import styled from 'styled-components'

import FeatureFlags from 'utils/featureFlags'

import { MixpanelContext } from 'utils/mixpanelContext'
import {
  acceptIntroduction,
  fetchIntroductionByToken,
} from 'intropath-core/actions/introduction'

import { Heading, Thankyou } from 'components/shared'

const Wrapper = styled.div`
  text-align: center;
  margin-bottom: 40px;
  margin-top: 10px;
  padding-top: 25px;
`

class AcceptContainer extends Component {
  static contextType = MixpanelContext

  constructor(props) {
    super(props)
    this.query = queryString.parse(props.location.search)
  }

  componentWillMount() {
    const introId = this.props.match.params.introId
    const { token } = queryString.parse(this.props.location.search)
    this.props.fetchIntroductionByToken(introId, token).then(() => {
      this.props
        .acceptIntroduction(introId, token, false, true)
        .catch(e => window.Raven.captureException(e))
      this.mixpanel_accept()
    })
  }

  mixpanel_accept() {
    const introId = this.props.match.params.introId
    const tracking_type = ''
    this.context.mixpanel.track('INTRO_ACCEPTED', {
      IntroId: introId,
    })
    this.mixpanelRequest(tracking_type, introId)
  }

  mixpanelRequest = (request_type, intro_id) => {
    this.context.mixpanel.track(request_type, {
      IntroId: intro_id,
    })
  }

  countMeIn = intro => {
    let url = ''
    this.mixpanelRequest('COUNT_ME_IN_CLICKED', intro.id)

    if (intro.status === 'accepted') {
      url = `https://brdg.typeform.com/to/pXxXGr?intro_id=${intro.id}&n_email=${intro.to_email}&source=n2_accept`
      window.location = url
    }
  }

  shouldShowCountMeIn = () => {
    if (!FeatureFlags.COUNT_ME_IN) {
      return false
    }

    let { intro } = this.props

    if (
      intro &&
      (this.props.message === 'Successfully accepted Introduction!' &&
        intro.to_user_exists === false)
    ) {
      this.mixpanelRequest('COUNT_ME_IN_SHOWN', intro.id)
      return true
    } else {
      return false
    }
  }

  render() {
    const { intro } = this.props
    const show_count_me_in = this.shouldShowCountMeIn()

    if (this.props.errorMessage !== null) {
      return (
        <Thankyou
          errorMessage={this.props.errorMessage}
          type="n2AcceptedError"
          onClick={() => this.countMeIn(intro)}
          intro={intro}
          show_count_me_in={show_count_me_in}
          back_to={this.query.back_to}
        />
      )
    }

    if (intro) {
      return (
        <Thankyou
          type="n2Success"
          onClick={() => this.countMeIn(intro)}
          intro={intro}
          show_count_me_in={show_count_me_in}
          back_to={this.query.back_to}
        />
      )
    }

    return (
      <Wrapper>
        <div className="container">
          <header>
            <Heading.CenterHeading>Accepting...</Heading.CenterHeading>
          </header>
        </div>
      </Wrapper>
    )
  }
}

AcceptContainer.propTypes = {
  acceptIntroduction: PropTypes.func.isRequired,
}

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
  { acceptIntroduction, fetchIntroductionByToken }
)(AcceptContainer)

import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter, Redirect } from 'react-router-dom'
import queryString from 'query-string'
import { Row, Col } from 'reactstrap'

import { Heading, Thankyou } from 'components/shared'

import {
  rateIntroduction,
  fetchIntroductionByToken,
} from 'intropath-core/actions/introduction'
import { MixpanelContext } from 'utils/mixpanelContext'

class IntroductionRating extends React.Component {
  constructor(props) {
    super(props)

    this.query = queryString.parse(props.location.search)
    this.confirming = false
    this.state = {
      errors: null,
      confirmation: null,
    }
  }

  static contextType = MixpanelContext

  rateIntro() {
    const { introId, rating, token } = this.props
    this.props.rateIntroduction(introId, { rating, token })
  }

  componentWillMount() {
    const { introId, token } = this.props
    this.props.fetchIntroductionByToken(introId, token)
  }

  getIntroRating = intro => {
    const { token } = this.query

    if (intro.initialized_token === token) {
      return intro.rating
    }
    if (intro.published_token === token) {
      return intro.to_rating
    }
    return ''
  }

  componentWillUpdate(nextProps) {
    const {
      data: { intro },
    } = nextProps
    if (!this.confirming && this.state.confirmation == null && intro) {
      this.confirming = true
      const rating = this.getIntroRating(intro)
      if (rating && this.query.rating) {
        const message =
          this.query.rating === rating
            ? `You have previously rated this intro as ${this.getIntroRating(
                intro
              ).replace(/_/g, ' ')}. Are you sure you want to rate again?`
            : `You have previously rated this intro as ${this.getIntroRating(
                intro
              ).replace(/_/g, ' ')}. Do you want to change your feedback?`
        if (!window.confirm(message)) {
          this.setState({ confirmation: false })
        } else {
          this.setState({ confirmation: true })
          this.rateIntro()
          this.mixpanel_rate(intro)
        }
      } else {
        this.setState({ confirmation: true })
        this.rateIntro()
        this.mixpanel_rate(intro)
      }
    }
  }

  mixpanelRequest = (request_type, intro_id) => {
    this.context.mixpanel.track(request_type, {
      IntroId: intro_id,
    })
  }

  mixpanel_rate(intro) {
    const { token } = this.query

    const event =
      intro.initialized_token === token
        ? 'INTRO_RATED_BY_FROM_CONTACT'
        : 'INTRO_RATED_BY_TO_CONTACT'

    const { rating } = this.props
    this.context.mixpanel.track(event, {
      IntroId: intro.id,
      Rating: rating,
    })
  }

  renderMessage(message) {
    return (
      <div className="page intro">
        <div className="container">
          <Row>
            <Col lg={9} className="col-centered">
              <header style={{ textAlign: 'center', marginBottom: 20 }}>
                <Heading.CenterHeading>{message}</Heading.CenterHeading>
              </header>
            </Col>
          </Row>
        </div>
      </div>
    )
  }

  shouldShowCountMeIn = intro => {
    const { token } = this.query

    if (
      intro &&
      (intro.from_user_exists === false && token === intro.initialized_token)
    ) {
      return true
    } else if (
      intro &&
      (intro.to_user_exists === false && token === intro.published_token)
    ) {
      return true
    }
    return false
  }

  countMeIn = intro => {
    let url = ''
    this.mixpanelRequest('COUNT_ME_IN_CLICKED', intro.id)
    const { token } = this.query

    if (token === intro.initialized_token) {
      url = `https://brdg.typeform.com/to/pXxXGr?intro_id=${intro.id}&n_email=${intro.from_email}&source=n1_rate`
    } else if (token === intro.published_token) {
      url = `https://brdg.typeform.com/to/pXxXGr?intro_id=${intro.id}&n_email=${intro.to_email}&source=n2_rate`
    }
    window.location = url
  }

  render() {
    const {
      token,
      rating,
      introId,
      data: { intro, loading, message, error },
    } = this.props
    const { confirmation } = this.state
    const show_count_me_in = intro ? this.shouldShowCountMeIn(intro) : ''

    if (confirmation) {
      if (error) return <div className="error-message">{error}</div>

      if (loading || !message) {
        this.renderMessage('Rating...')
      }

      if (rating === 'no_feedback')
        return intro ? (
          <Thankyou
            type="noFeedback"
            intro={intro}
            onClick={() => this.countMeIn(intro)}
            show_count_me_in={show_count_me_in}
            back_to={this.query.back_to}
          />
        ) : null

      return (
        <Redirect
          to={`/introductions/${introId}/rating-message?token=${token}${
            this.query.back_to ? '&back_to=' + this.query.back_to : ''
          }`}
        />
      )
    } else if (confirmation === false) {
      return this.renderMessage('Thank You!')
    } else {
      return this.renderMessage('Loading...')
    }
  }
}

const mapStateToProps = ({ introduction }, { match, location }) => {
  const { introId } = match.params
  const { token, rating } = queryString.parse(location.search)

  return {
    data: {
      ...introduction,
    },
    rating,
    introId,
    token,
  }
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    { rateIntroduction, fetchIntroductionByToken }
  )
)(IntroductionRating)

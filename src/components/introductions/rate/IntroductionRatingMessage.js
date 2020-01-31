import React from 'react'
import { reduxForm } from 'redux-form'
import { SubmissionError } from 'redux-form'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { Row, Col } from 'reactstrap'
import { isEmpty } from 'lodash'

import FeatureFlags from 'utils/featureFlags'
import { Field, Thankyou } from 'components/shared'
import {
  fetchIntroductionByToken,
  updateRateMessageIntroduction,
} from 'intropath-core/actions/introduction'
import { MixpanelContext } from 'utils/mixpanelContext'
import { FeedbackContainer, StyledButton } from './styled'
import ConnectorMessage from '../../shared/components/ConnectorMessage'

const required = value => {
  return value && value.trim() ? undefined : "Can't be blank"
}

class IntroductionRatingMessage extends React.Component {
  constructor(props) {
    super(props)

    this.query = queryString.parse(props.location.search)
    this.state = {
      errors: null,
      rating_message: null,
      counted_me_in: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  static contextType = MixpanelContext

  componentDidMount() {
    return this.props.fetchIntroductionByToken(
      this.props.match.params.introId,
      this.query.token
    )
  }

  componentWillReceiveProps() {
    const { intro } = this.props.data
    const { counted_me_in } = this.state
    if (!counted_me_in && this.shouldShowCountMeIn(intro)) {
      this.mixpanelRequest('COUNT_ME_IN_SHOWN', intro.id)
      this.setState({ counted_me_in: true })
    }
  }

  getIntroRatingMessage = () => {
    const { intro } = this.props.data
    const { token } = this.query

    if (intro.initialized_token === token) {
      return intro.rating_message
    }
    if (intro.published_token === token) {
      return intro.to_rating_message
    }

    return ''
  }

  onChange = event => {
    this.setState({ rating_message: event.target.value })
  }

  handleSubmit = async values => {
    const { rating_message } = this.state
    const old_rating_message = this.getIntroRatingMessage()

    if (
      !old_rating_message &&
      (!values.rating_message || values.rating_message.length < 1)
    ) {
      this.throwError()
    } else if (
      !!old_rating_message &&
      rating_message != null &&
      (!values.rating_message || values.rating_message.length < 1)
    ) {
      this.throwError()
    }

    if (!isEmpty(values)) {
      await this.props.updateRateMessageIntroduction(
        this.props.match.params.introId,
        {
          token: this.query.token,
          ...values,
        },
        true
      )
    }
  }

  mixpanelRequest = (request_type, intro_id) => {
    this.context.mixpanel.track(request_type, {
      IntroId: intro_id,
    })
  }

  shouldShowCountMeIn = intro => {
    if (!FeatureFlags.COUNT_ME_IN) {
      return false
    }

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

  throwError() {
    throw new SubmissionError({
      rating_message: "Feedback message can't be blank",
      _error: 'Please enter a message',
    })
  }

  render() {
    const {
      handleSubmit,
      submitSucceeded,
      data: { loading, intro },
      invalid,
      submitting,
    } = this.props
    const { token } = this.query
    const messageType =
      intro && intro.initialized_token === token ? 'n1Feedback' : 'n2Feedback'
    const show_count_me_in = intro ? this.shouldShowCountMeIn(intro) : ''
    const calloutMessageType = intro
      ? messageType +
        '_' +
        intro[intro.initialized_token === token ? 'rating' : 'to_rating']
      : ''

    if (loading) return <div>Loading ...</div>

    if (submitSucceeded) {
      return (
        <Thankyou
          type={messageType}
          onClick={() => this.countMeIn(intro)}
          intro={intro}
          show_count_me_in={show_count_me_in}
          back_to={this.query.back_to}
        />
      )
    }

    return (
      <div>
        {!submitSucceeded && (
          <FeedbackContainer id="success-page">
            <Row>
              <Col lg={12} className="col-centered">
                <ConnectorMessage type={calloutMessageType} intro={intro} />
                <form onSubmit={handleSubmit(this.handleSubmit)}>
                  <Field
                    type="textarea"
                    name="rating_message"
                    className="form-control"
                    onChange={this.onChange}
                    label={'Give feedback on the intro below:'}
                    defaultValue={this.getIntroRatingMessage()}
                    validate={[required]}
                    autosize
                    rows={10}
                  />

                  <StyledButton type="submit" disabled={submitting || invalid}>
                    Send Message
                  </StyledButton>
                </form>
              </Col>
            </Row>
          </FeedbackContainer>
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ introduction }) => ({
  data: {
    ...introduction,
    loading: introduction.loading || !introduction.intro,
  },
})

const enhance = compose(
  reduxForm({
    form: 'introductionRatingForm',
  }),
  withRouter,
  connect(
    mapStateToProps,
    { fetchIntroductionByToken, updateRateMessageIntroduction }
  )
)

export default enhance(IntroductionRatingMessage)

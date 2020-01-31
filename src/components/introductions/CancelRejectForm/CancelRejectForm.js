import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import queryString from 'query-string'
import { Row, Col } from 'reactstrap'
import { MixpanelContext } from 'utils/mixpanelContext'
import extractFirstName from 'utils/extractFirstName'
import TextareaAutosize from 'react-textarea-autosize'
import styled from 'styled-components'
import media from 'utils/styledMediaQueryFix'

import FeatureFlags from 'utils/featureFlags'

import { Button, Heading, Thankyou } from 'components/shared'
import {
  CancelRejectContainer,
  Header,
  ErrorMsg,
  Reasons,
  OptionOne,
  OptionTwo,
  OptionThree,
  OptionFour,
  ErrorMsgBlock,
  InfoBox,
} from './styled'
import ConnectorMessage from '../../shared/components/ConnectorMessage'

const StyledButton = styled(Button)`
  ${media.lessThan('large')`
    width: 100%;
  `};
`

const RenderMessage = ({ message }) => (
  <div className="page">
    <div className="container">
      <header>
        <Heading.CenterHeading id="message">{message}</Heading.CenterHeading>
      </header>
    </div>
  </div>
)

class CancelRejectForm extends Component {
  constructor(props) {
    super(props)

    this.query = queryString.parse(props.location.search)
    this.state = {
      errors: {
        cancelation_reason: '',
        cancelation_message: '',
      },
      cancelation_reason: null,
      cancelation_message: null,
      confirmation: null,
    }
  }

  static contextType = MixpanelContext

  sendUpdateTOMixpanel(intro) {
    if (intro) {
      const tracking_type =
        this.props.formType === 'cancel'
          ? 'FIRST_OPT_IN_REJECTED'
          : 'INTRO_REJECTED'
      this.mixpanelRequest(tracking_type, intro.id)
    }
  }

  userConfirmation = e => {
    if (e === true) {
      this.setState({ confirmation: true })
    } else {
      this.setState({ confirmation: false })
    }
  }

  handleSubmit = e => {
    e.preventDefault()

    const { cancelation_reason } = this.state
    let valid = this.validateReason()
    if (cancelation_reason === 'other') {
      valid = this.validateMessage() && valid
    }

    if (valid) {
      this.sendCancelRequest()
    }
  }

  sendCancelRequest = () => {
    const { cancelation_reason, cancelation_message } = this.state
    const { intro } = this.props
    const introId = this.props.match.params.introId
    const { token } = queryString.parse(this.props.location.search)
    const params = {
      cancelation_reason: cancelation_reason,
      cancelation_message: cancelation_message,
    }

    this.props
      .sendRequest(introId, token, params, false, true)
      .catch(e => window.Raven.captureException(e))
    this.sendUpdateTOMixpanel(intro)
  }

  mixpanelRequest = (request_type, intro_id) => {
    this.context.mixpanel.track(request_type, {
      IntroId: intro_id,
    })
  }

  doChange = event => {
    event.preventDefault()
    this.setState({ [event.target.id]: event.target.value }, () => {
      this.setState({ isActive: true })

      if (this.state.cancelation_reason !== null) {
        this.validateReason()
        if (this.state.cancelation_reason !== 'other') this.validateMessage()
      }
      if (this.state.cancelation_message !== null) this.validateMessage()
    })
  }

  validateReason = () => {
    const { cancelation_reason } = this.state
    const { errors } = this.state
    errors.cancelation_reason = ''

    if (cancelation_reason === '' || cancelation_reason === null) {
      errors.cancelation_reason =
        'Please select a reason for not wanting this intro'
    }
    this.setState({ errors })
    return errors.cancelation_reason === ''
  }

  validateMessage = () => {
    const { cancelation_message, cancelation_reason } = this.state
    const { errors } = this.state
    errors.cancelation_message = ''

    if (
      cancelation_reason === 'other' &&
      (cancelation_message === '' || cancelation_message === null)
    ) {
      errors.cancelation_message = 'Please enter a message'
    }

    this.setState({ errors })
    return errors.cancelation_message === ''
  }

  countMeIn = intro => {
    let url = ''
    this.mixpanelRequest('COUNT_ME_IN_CLICKED', intro.id)

    if (intro.status === 'canceled') {
      url = `https://brdg.typeform.com/to/pXxXGr?intro_id=${intro.id}&n_email=${intro.from_email}&source=n1_notaccept`
    } else {
      url = `https://brdg.typeform.com/to/pXxXGr?intro_id=${intro.id}&n_email=${intro.to_email}&source=n2_notaccept`
    }
    window.location = url
  }

  shouldShowCountMeIn = () => {
    if (!FeatureFlags.COUNT_ME_IN) {
      return false
    }

    let { intro, formType } = this.props

    if (
      intro &&
      intro.cancelation_reason != null &&
      intro.from_user_exists === false &&
      formType === 'cancel'
    ) {
      this.mixpanelRequest('COUNT_ME_IN_SHOWN', intro.id)
      return true
    } else if (
      intro &&
      intro.cancelation_reason != null &&
      intro.to_user_exists === false &&
      formType === 'reject'
    ) {
      this.mixpanelRequest('COUNT_ME_IN_SHOWN', intro.id)
      return true
    } else {
      return false
    }
  }

  isActiveOption = option => {
    const { cancelation_reason } = this.state
    return option === cancelation_reason
  }

  render() {
    const { brokerFirstName, intro, errorMessage, formType } = this.props
    const { errors, confirmation } = this.state
    const n1_name = intro ? extractFirstName(intro.from) : ''
    const n2_name = intro ? extractFirstName(intro.to) : ''
    const messageType = formType === 'cancel' ? 'n1Cancel' : 'n2Cancel'
    const show_count_me_in = this.shouldShowCountMeIn()

    if (confirmation && this.props.loading) {
      return <RenderMessage message="Loading..." />
    }

    if (confirmation && errorMessage) {
      return (
        <Thankyou
          errorMessage={errorMessage}
          onClick={() => this.countMeIn(intro)}
          broker_name={brokerFirstName}
          user_profile_pic={intro.broker_profile_pic_url}
          from_user_exists={intro.from_user_exists}
          to_user_exists={intro.to_user_exists}
          back_to={this.query.back_to}
        />
      )
    }

    if (
      confirmation &&
      intro.cancelation_reason != null &&
      (intro.status === 'rejected' || intro.status === 'canceled') &&
      !errorMessage
    ) {
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
      <CancelRejectContainer>
        {confirmation === null && (
          <div className="container">
            <InfoBox>
              <ConnectorMessage
                intro={intro}
                customText={`Are you sure you don't want this intro to ${' '}
                ${formType === 'cancel' ? n2_name : n1_name}?`}
              />
            </InfoBox>
            <InfoBox style={{ textAlign: 'center' }}>
              <Button
                onClick={event => {
                  this.userConfirmation(true)
                }}
              >
                Yes, I'm sure
              </Button>
              <Button
                style={{ marginLeft: '8px' }}
                secondary
                onClick={event => {
                  this.userConfirmation(false)
                }}
              >
                No
              </Button>
            </InfoBox>
          </div>
        )}

        {confirmation === false && (
          <div className="container">
            {formType === 'cancel' ? (
              <Redirect
                to={`/introductions/${intro.id}/confirm?token=${intro.initialized_token}&email=${intro.from_email}`}
              />
            ) : (
              <Header>Thank You</Header>
            )}
          </div>
        )}

        <ErrorMsgBlock
          className={`${this.state.errors.cancelation_reason && 'is-invalid'}`}
        >
          {errors.cancelation_reason !== '' ? (
            <ErrorMsg
              className="invalid-feedback"
              id="error-message"
              style={{
                display: errors.cancelation_reason === '' ? 'none' : 'block',
                color: '#ffffff',
                textAlign: 'left',
                paddingLeft: 15,
                paddingTop: 8,
              }}
            >
              {errors.cancelation_reason}
            </ErrorMsg>
          ) : (
            <ErrorMsg
              className="invalid-feedback"
              id="error-message"
              style={{
                display: errors.cancelation_message === '' ? 'none' : 'block',
                color: '#ffffff',
                textAlign: 'left',
                paddingLeft: 15,
                paddingTop: 8,
              }}
            >
              {errors.cancelation_message}
            </ErrorMsg>
          )}
        </ErrorMsgBlock>

        {confirmation && (
          <div className="container" id="CancelRejectForm">
            <header>
              <div>
                <Row>
                  <Col lg={9} className="col-centered">
                    <Header>
                      Let {brokerFirstName} know why you didn't accept this
                      intro:{' '}
                    </Header>
                    <form>
                      <Reasons className="form-group">
                        <div>
                          <OptionOne
                            active={this.isActiveOption('not_relevant')}
                            value="not_relevant"
                            id="cancelation_reason"
                            onClick={event => {
                              this.doChange(event)
                            }}
                          >
                            Not a Fit
                          </OptionOne>
                          <OptionTwo
                            active={this.isActiveOption('i_do_not_have_time')}
                            value="i_do_not_have_time"
                            id="cancelation_reason"
                            onClick={event => {
                              this.doChange(event)
                            }}
                          >
                            Busy Right Now
                          </OptionTwo>
                          <OptionThree
                            active={this.isActiveOption(
                              'we_are_already_connected'
                            )}
                            value="we_are_already_connected"
                            id="cancelation_reason"
                            onClick={event => {
                              this.doChange(event)
                            }}
                          >
                            Already Connected
                          </OptionThree>
                          <OptionFour
                            active={this.isActiveOption('other')}
                            value="other"
                            id="cancelation_reason"
                            onClick={event => {
                              this.doChange(event)
                            }}
                          >
                            Other
                          </OptionFour>
                        </div>
                        <TextareaAutosize
                          id="cancelation_message"
                          name="cancel_message"
                          value={this.state.cancelation_message || ''}
                          placeholder="I'm not interested in the intro because..."
                          onChange={event => {
                            this.doChange(event)
                          }}
                          style={{
                            position: 'relative',
                            outline: 'none',
                            fontSize: 14,
                            width: 335,
                            minHeight: 30,
                            overflowX: 'hidden',
                            overflowY: 'auto',
                            border: 'none',
                            resize: 'none',
                            top: 275,
                            margin: '0 auto',
                            borderRadius: 0,
                            borderBottom: '1px solid #000000',
                            display: 'block',
                            maxHeight: 300,
                          }}
                        />
                      </Reasons>
                      <StyledButton
                        style={{
                          position: 'relative',
                          top: 280,
                        }}
                        onClick={this.handleSubmit}
                      >
                        Send
                      </StyledButton>
                    </form>
                  </Col>
                </Row>
              </div>
            </header>
          </div>
        )}
      </CancelRejectContainer>
    )
  }
}

export default CancelRejectForm

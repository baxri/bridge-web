import React, { Fragment } from 'react'
import { Col } from 'reactstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'

import { Avatar, Button } from 'components/shared'
import { ActionsWrapper as Wrapper, ButtonWrapper, Content } from './styled'
import {
  resendEmail,
  cancelByOwner,
  resetIntroduction,
} from 'intropath-core/actions/introduction'
import { MixpanelContext } from 'utils/mixpanelContext'
import { checkUserTokens } from 'utils/checkGoogleAccount'

class Actions extends React.Component {
  static contextType = MixpanelContext

  // Wait 500 millis before reloading intro with updated timeline
  waitAndReload = () => {
    setTimeout(this.props.reloadIntroduction, 500)
  }

  resendEmail = () => {
    const { user, history, intro } = this.props
    checkUserTokens(
      user.tokens,
      history,
      `/introductions/${intro.id}`,
      `/introductions/${intro.id}`,
      () => {
        this.props.resendEmail(intro.id).then(this.waitAndReload)
        this.mixpanel_resend()
      }
    )
  }

  cancelByOwner = () => {
    if (window.confirm('Are you sure?')) {
      this.props.cancelByOwner(this.props.intro.id).then(() => {
        this.props.reloadIntroduction()
        this.props.history.push(
          `/introductions/${this.props.intro.id}?filter=all`
        )
      })
      this.mixpanel_cancel()
    }
  }

  confirm = () => {
    this.props.resetIntroduction()
    this.props.history.push(`/introductions/${this.props.intro.id}/publish`)
  }

  mixpanel_resend() {
    const { user, intro } = this.props
    const event =
      intro.status === 'initialized'
        ? 'FIRST_OPT_IN_RESENT'
        : 'SECOND_OPT_IN_RESENT'
    this.context.mixpanel.identify(user.id)
    this.context.mixpanel.track(event, {
      UserId: user.id,
      IntroId: intro.id,
    })
  }

  n1Confirm = () => {
    const { intro } = this.props
    this.props.history.push(
      `/introductions/${intro.id}/confirm?token=${intro.initialized_token}&email=${intro.from_email}&back_to=${intro.id}`
    )
  }

  n1Cancel = () => {
    const { intro } = this.props
    this.props.history.push(
      `/introductions/${intro.id}/cancel?token=${intro.initialized_token}&back_to=${intro.id}`
    )
  }

  rate = (token, rating) => () => {
    const { intro } = this.props
    this.props.history.push(
      `/introductions/${intro.id}/rate?token=${token}&rating=${rating}&back_to=${intro.id}`
    )
  }

  n2Accept = () => {
    const { intro } = this.props
    this.props.history.push(
      `/introductions/${intro.id}/accept?token=${intro.published_token}&email=${intro.to_email}&back_to=${intro.id}`
    )
  }

  n2Reject = () => {
    const { intro } = this.props
    this.props.history.push(
      `/introductions/${intro.id}/reject?token=${intro.published_token}&back_to=${intro.id}`
    )
  }

  mixpanel_cancel() {
    const { user, intro } = this.props
    this.context.mixpanel.identify(user.id)
    this.context.mixpanel.track('INTRO_CANCELLED', {
      UserId: user.id,
      IntroId: intro.id,
      PreviousIntroStatus: intro.status,
    })
  }

  ratingLinks(token) {
    return (
      <Fragment>
        {[
          ['great', 'Great!'],
          ['okay', 'Okay'],
          ['not_good', 'Not Good :('],
          ['no_feedback', 'No Feedback Yet'],
        ].map(item => (
          <ButtonWrapper key={item[0]}>
            {item[0] === 'no_feedback' && (
              <Button small secondary onClick={this.rate(token, item[0])}>
                {item[1]}
              </Button>
            )}
            {item[0] !== 'no_feedback' && (
              <Button small onClick={this.rate(token, item[0])}>
                {item[1]}
              </Button>
            )}
          </ButtonWrapper>
        ))}
      </Fragment>
    )
  }

  buildActions() {
    const {
      intro: {
        status,
        from,
        to,
        my_role = null,
        rating = null,
        to_rating = null,
        initialized_token = null,
        published_token = null,
      },
    } = this.props

    const actions = []

    if (my_role === 'broker') {
      if (status === 'published') {
        actions.push(
          <Fragment key="resend">
            <div>Awaiting for {to}'s reply.</div>
            <ButtonWrapper>
              <Button small onClick={this.confirm}>
                Resend intro
              </Button>
            </ButtonWrapper>
          </Fragment>
        )
      } else if (status === 'confirmed') {
        actions.push(
          <Fragment key="confirm">
            <div>Please forward or cancel the intro.</div>
            <ButtonWrapper>
              <Button small onClick={this.confirm}>
                Forward intro
              </Button>
            </ButtonWrapper>
          </Fragment>
        )
      } else if (status === 'initialized') {
        actions.push(
          <Fragment key="opt-in">
            <div>Awaiting for {from}'s reply.</div>
            <ButtonWrapper>
              <Button small onClick={this.resendEmail}>
                Resend opt-in intro
              </Button>
            </ButtonWrapper>
          </Fragment>
        )
      }

      if (status !== 'accepted' && status !== 'rejected') {
        actions.push(
          <Fragment key="cancel">
            <ButtonWrapper>
              <Button small secondary onClick={this.cancelByOwner}>
                Cancel intro
              </Button>
            </ButtonWrapper>
          </Fragment>
        )
      }
    } else if (my_role === 'n1') {
      if (status === 'initialized') {
        actions.push(
          <Fragment key="confirm">
            <div>Awaiting your input</div>
            <ButtonWrapper>
              <Button small onClick={this.n1Confirm}>
                Opt-in / Write Forwardable
              </Button>
            </ButtonWrapper>
            <ButtonWrapper>
              <Button small secondary onClick={this.n1Cancel}>
                Do Not Accept
              </Button>
            </ButtonWrapper>
          </Fragment>
        )
      } else if (status === 'confirmed') {
        actions.push(
          <Fragment key="confirm">
            <div>
              You can update your info and resend, or leave as is if everything
              looks ok
            </div>
            <ButtonWrapper>
              <Button small onClick={this.n1Confirm}>
                Edit Opt-in / Forwardable
              </Button>
            </ButtonWrapper>
            <ButtonWrapper>
              <Button small secondary onClick={this.n1Cancel}>
                Do Not Accept
              </Button>
            </ButtonWrapper>
          </Fragment>
        )
      } else if (status === 'accepted' && rating === null) {
        actions.push(
          <Fragment key="rate">
            <div>Awaiting your feedback</div>
            {this.ratingLinks(initialized_token)}
          </Fragment>
        )
      }
    } else if (my_role === 'n2') {
      if (status === 'published') {
        actions.push(
          <Fragment key="confirm">
            <div>Awaiting your input</div>
            <ButtonWrapper>
              <Button small onClick={this.n2Accept}>
                Accept Intro
              </Button>
            </ButtonWrapper>
            <ButtonWrapper>
              <Button small secondary onClick={this.n2Reject}>
                Do Not Accept
              </Button>
            </ButtonWrapper>
          </Fragment>
        )
      } else if (status === 'accepted' && to_rating === null) {
        actions.push(
          <Fragment key="rate">
            <div>Awaiting your feedback</div>
            {this.ratingLinks(published_token)}
          </Fragment>
        )
      }
    }

    return actions
  }

  render() {
    const { user } = this.props

    const actions = this.buildActions()

    if (!actions.length) return null

    return (
      <Wrapper>
        <Col xs={1} style={{ padding: 0, textAlign: 'center' }}>
          <Avatar
            name={user.first_name}
            email={user.email}
            profile_pic_url={user.profile_pic_url}
          />
        </Col>

        <Content grey>
          <div>{actions}</div>
        </Content>
      </Wrapper>
    )
  }
}

const enhance = compose(
  withRouter,
  connect(
    state => ({ user: state.auth.user }),
    {
      resendEmail,
      cancelByOwner,
      resetIntroduction,
    }
  )
)

export default enhance(Actions)

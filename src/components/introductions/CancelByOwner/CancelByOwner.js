import React from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'
import styled from 'styled-components'

import {
  fetchIntroductionByInitializeToken,
  cancelByOwner,
} from 'intropath-core/actions/introduction'
import { MixpanelContext } from 'utils/mixpanelContext'
import { Heading, Confirmation } from 'components/shared'
import extractFirstName from 'utils/extractFirstName'
import media from 'utils/styledMediaQueryFix'
import userIntroPermission from 'utils/userIntroPermission'

const Container = styled.div`
  display: block;
  position: relative;
  ${media.greaterThan('large')`
    height: 85vh;
    width: 375px;
    max-width: 100%;
    border: none;
    margin: 0 auto;
    padding-top: 20px;
  `}
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

class CancelByOwner extends React.Component {
  state = { confirmation: null }
  static contextType = MixpanelContext

  componentWillMount() {
    this.query = queryString.parse(this.props.location.search)
    this.props.fetchIntroductionByInitializeToken(this.query.token)
  }

  mixpanel_cancel() {
    const { intro, user_id } = this.props
    const userId = user_id && user_id.id

    const opts = {
      UserId: userId,
      IntroId: intro.id,
      PreviousIntroStatus: intro.status,
    }

    this.context.mixpanel.identify(userId)
    this.context.mixpanel.track('INTRO_CANCELLED', opts)
  }

  yesCancelIntro = () => {
    const { introId } = this.props.match.params
    const { token } = this.query

    this.props.cancelByOwner(introId, token).then(() => {
      this.mixpanel_cancel()
      this.setState({ confirmation: true })
      if (this.props.user) {
        this.props.history.push(`/introductions/${introId}`)
      }
    })
  }

  noCancelIntro = () => {
    if (!this.props.user) {
      this.setState({ confirmation: false })
    } else {
      this.props.history.push(
        `/introductions/${this.props.match.params.introId}`
      )
    }
  }

  render() {
    const { errorMessage, user, intro, loading, canCancelByOwner } = this.props
    const { confirmation } = this.state

    if (loading) return null

    if (!user && intro && confirmation) {
      return <RenderMessage message="Thank You" />
    }

    if (intro) {
      const n1_name = extractFirstName(intro.from)
      const n2_name = extractFirstName(intro.to)

      if (!canCancelByOwner.can) {
        return <Container>{canCancelByOwner.message}</Container>
      }

      if (confirmation === null) {
        return (
          <Container>
            <Confirmation
              message={`Are you sure you want to cancel the intro of ${n1_name} to ${n2_name}`}
              onYes={this.yesCancelIntro}
              onNo={this.noCancelIntro}
            />
          </Container>
        )
      }
    }

    return (
      <div className="container">
        {errorMessage || 'Could not find introduction'}
      </div>
    )
  }
}

function mapStateToProps(state, auth) {
  const intro = state.introduction.intro ? state.introduction.intro : null

  return {
    errorMessage: state.introduction.error,
    loading: state.introduction.loading,
    intro,
    user: state.auth.authenticated,
    user_id: state.auth.user,
    canCancelByOwner: userIntroPermission(
      intro,
      state.auth.user
    ).canCancelByOwner(),
  }
}

export default connect(
  mapStateToProps,
  { fetchIntroductionByInitializeToken, cancelByOwner }
)(CancelByOwner)

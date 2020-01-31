import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { sortBy } from 'lodash'

import {
  fetchIntroduction,
  publishIntroduction,
  resetErrorMessage,
  resetMessage,
} from 'intropath-core/actions/introduction'
import PublishForm from './PublishForm'
import Confirmation from './Confirmation'
import {
  Heading,
  SelectedContacts,
  Flash,
  LoadingData as Spinner,
} from 'components/shared'
import { MixpanelContext } from 'utils/mixpanelContext'
import { Wrapper, GlobalStyle } from './styled'
import userIntroPermission from 'utils/userIntroPermission'
import { checkUserTokens } from 'utils/checkGoogleAccount'

class PublishIntroduction extends Component {
  static contextType = MixpanelContext

  constructor(props) {
    super(props)

    this.state = {
      submitting: false,
      published: false,
      publishedIntroIds: [],
    }
  }

  componentWillReceiveProps({ errorMessage }) {
    //The code is commented because it is preventing error message to display.
    //   const { intro } = this.props
    // if (errorMessage && intro && ['confirmed', 'published'].includes(intro.status)) {
    //   this.props.history.push(`/introductions/${intro.id}`)
    // }
  }

  componentDidMount() {
    const { user, history } = this.props
    const introId = this.props.match.params.introId
    checkUserTokens(
      user.tokens,
      history,
      `/introductions/${introId}/publish`,
      `/introductions/${introId}`,
      () => {
        this.props.fetchIntroduction(introId)
      }
    )
  }

  cancel = () => {
    const { intro } = this.props
    this.props.history.push(`/introductions/${intro.id}`)
  }

  onDone = () => {
    this.props.history.push('/')
  }

  onReviewNextIntro = nextIntro => {
    if (nextIntro) {
      this.props.history.push(`/introductions/${nextIntro.id}/publish`)
      this.setState({ published: false })
      this.props.fetchIntroduction(nextIntro.id)
    }
  }

  handleFormSubmit = ({ id, note, to_email, initialized_token: token }) => {
    const { intro } = this.props

    if (this.state.submitting) {
      return
    } // Do not submit more than once
    this.setState({ submitting: true })

    const type =
      intro.status === 'confirmed' ? 'INTRO_CONFIRMED' : 'SECOND_OPT_IN_RESENT'

    this.props
      .publishIntroduction(
        {
          id: this.props.match.params.introId,
          note,
          to_email,
          token,
        },
        true
      )
      .then(() => {
        const publishedIntroIds = this.state.publishedIntroIds
        publishedIntroIds.push(this.props.match.params.introId)

        this.setState({ submitting: false, published: true, publishedIntroIds })
      })
      .catch(e => {
        this.setState({ submitting: false })
        window.Raven.captureException(e)
      })
      .catch(e => window.Raven.captureException(e))

    this.mixpanel_confirm(note, type)
  }

  mixpanel_confirm = (note, type) => {
    const { user, intro } = this.props
    const edited = note && note.length > 0 ? true : false
    this.context.mixpanel.identify(user.id)

    this.context.mixpanel.track(type, {
      UserId: user.id,
      IntroId: intro.id,
      Edited: edited,
    })
  }

  getNextIntro = () => {
    const { nextIntros } = this.props
    const { publishedIntroIds } = this.state
    const nextPublishableIntros = nextIntros.filter(
      intro => publishedIntroIds.indexOf(intro.id) < 0
    )
    const nextIntrosSortedByMostRecent = sortBy(
      nextPublishableIntros,
      intro => new Date(intro.updated_at)
    ).reverse()
    return nextIntrosSortedByMostRecent.length > 0
      ? nextIntrosSortedByMostRecent[0]
      : null
  }

  render() {
    const {
      intro,
      errorMessage,
      resetErrorMessage,
      user,
      canPublish,
    } = this.props

    if (!intro || intro.id !== this.props.match.params.introId) {
      return <Spinner loading />
    }

    if (this.state.published) {
      const nextIntro = this.getNextIntro()
      return (
        <Wrapper id="introduction-publish-page">
          <Confirmation
            intro={intro}
            nextIntro={nextIntro}
            onReviewNextIntro={() => {
              this.onReviewNextIntro(nextIntro)
            }}
            onDone={this.onDone}
          />
        </Wrapper>
      )
    }

    return (
      <Wrapper id="introduction-publish-page">
        <GlobalStyle />
        <Heading.SideViewHeading
          label="Forward Intro"
          leftProps={{
            label: 'Cancel',
            onClick: this.cancel,
          }}
        />
        <SelectedContacts {...intro} />
        <div style={{ padding: 15 }}>
          {errorMessage && (
            <Flash
              type="error"
              message={errorMessage}
              clearMessage={resetErrorMessage}
            />
          )}

          {!canPublish.can && (
            <Flash type="error" message={canPublish.message} />
          )}

          {canPublish.can && (
            <PublishForm
              initialValues={intro}
              user={user}
              submitting={this.state.submitting}
              onSubmit={this.handleFormSubmit}
            />
          )}
        </div>
      </Wrapper>
    )
  }
}

const getIntro = intro => {
  if (intro) {
    const fromContact = {
      id: intro.from_id,
      name: intro.from,
      email: intro.from_email,
      linkedin_profile_url: intro.linkedin_profile_url,
      profile_pic_url: intro.from_profile_pic_url,
    }
    const toContact = {
      id: intro.to_id,
      name: intro.to,
      email: intro.to_email,
      linkedin_profile_url: intro.to_linkedin_profile_url,
      profile_pic_url: intro.to_profile_pic_url,
    }
    return {
      ...intro,
      toContact,
      fromContact,
    }
  }
  return null
}

const getNextIntros = (introId, introductions, broker_email) => {
  return introductions.filter(
    intro =>
      intro.id !== introId &&
      intro.status === 'confirmed' &&
      intro.my_role === 'broker'
  )
}

function mapStateToProps({ introduction, contacts, auth }, { match }) {
  const intro = introduction.intro ? getIntro(introduction.intro) : null
  return {
    errorMessage: introduction.error,
    message: introduction.message,
    intro,
    user: auth.user,
    canPublish: userIntroPermission(intro, auth.user).canPublish(),
    nextIntros: getNextIntros(
      match.params.introId,
      introduction.list,
      auth.user.email
    ),
  }
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    {
      fetchIntroduction,
      publishIntroduction,
      resetErrorMessage,
      resetMessage,
    }
  )
)(PublishIntroduction)

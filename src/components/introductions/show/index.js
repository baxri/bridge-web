import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { When } from 'react-if'

import {
  fetchIntroduction,
  resetIntroduction,
  markOptInResendFalse,
} from 'intropath-core/actions/introduction'

import { updateContacts } from 'intropath-core/actions/update'

import { Wrapper } from './styled'
import { Heading, SelectedContacts } from 'components/shared'
import extractFirstName from 'utils/extractFirstName'
import { parse, stringify } from 'utils/queryString'

import Actions from './Actions'
import Timeline from './Timeline'

class Introduction extends Component {
  constructor(props) {
    super()
    this.state = {
      showNotification: false,
    }
  }

  componentDidMount() {
    this.reloadIntroduction()
    const { success } = parse(this.props.location.search)
    if (success === 'true') {
      this.setState({ showNotification: true })
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.location.pathname !== this.props.location.pathname &&
      this.props.match.params.introId
    ) {
      this.props.fetchIntroduction(this.props.match.params.introId)
      this.onCloseNotification()
      const { showNotification } = this.state
      const { success } = parse(this.props.location.search)
      if (success === 'true') {
        if (!showNotification) {
          this.setState({ showNotification: true })
        }
      } else {
        if (showNotification) {
          this.setState({ showNotification: false })
        }
      }
    }
  }

  componentWillUnmount() {
    this.props.resetIntroduction()
  }

  cancel = () => {
    // Delete success query, but keep all other params (i.e. filter and page)
    const search = parse(this.props.location.search)
    delete search['success']

    this.props.history.push({
      pathname: '/introductions',
      search: stringify(search),
    })
  }

  showAction = () =>
    ['initialized', 'published', 'confirmed', 'accepted'].includes(
      this.props.intro.status
    )

  reloadIntroduction = () => {
    this.props.fetchIntroduction(this.props.match.params.introId).then(() => {
      this.props.updateContacts(false, false)
    })
  }

  onCloseNotification = () => {
    this.props.markOptInResendFalse()
    this.setState({ showNotification: false })
  }

  render() {
    const { showNotification } = this.state
    const { intro, user, opt_in_intro_resent } = this.props

    if (!intro || !intro.toContact || !intro.fromContact || !intro.messages)
      return null

    const notification =
      intro.status === 'initialized'
        ? `You will be notified once ${extractFirstName(
            intro.from
          )} has approved the intro.`
        : intro.status === 'published'
        ? `You will be notified once ${extractFirstName(
            intro.to
          )} has accepted the intro. If the intro hasn't been accepted within 5 days then an automated follow up will be sent.`
        : null

    return (
      <Wrapper id="introduction-page">
        <Heading.SideViewHeading
          label="Intro"
          leftProps={{
            label: 'Cancel',
            onClick: this.cancel,
          }}
        />

        <SelectedContacts {...intro} />

        {(opt_in_intro_resent || showNotification) && notification && (
          <Heading.NotificationHeading onClick={this.onCloseNotification}>
            Opt-in resent.
            <br />
            <br />
            {notification}
          </Heading.NotificationHeading>
        )}

        <When
          condition={
            !(opt_in_intro_resent || showNotification) && this.showAction()
          }
        >
          <Actions intro={intro} reloadIntroduction={this.reloadIntroduction} />
        </When>
        <Heading.ListHeading>Intro Timeline</Heading.ListHeading>
        <Timeline intro={intro} user={user} />
      </Wrapper>
    )
  }

  handleClickBack = () => this.props.history.goBack()
}

const getIntro = (intro, contacts) => {
  if (intro) {
    // Find contacts, they might not be found if user is N1/N2 and not one of their contact
    const toContact = contacts.find(c => c.email === intro.to_email) || {
      name: intro.to,
      email: intro.to_email,
      profile_pic_url: intro.to_profile_pic_url,
    }
    toContact.profile_pic_url =
      toContact.profile_pic_url || intro.to_profile_pic_url
    const fromContact = contacts.find(c => c.email === intro.from_email) || {
      name: intro.from,
      email: intro.from_email,
      profile_pic_url: intro.from_profile_pic_url,
    }
    fromContact.profile_pic_url =
      fromContact.profile_pic_url || intro.from_profile_pic_url

    return {
      ...intro,
      toContact,
      fromContact,
    }
  }
  return null
}

const mapStateToProps = ({ introduction, contacts, auth }, { match }) => ({
  intro:
    introduction.loaded && contacts.loaded
      ? getIntro(introduction.intro, contacts.list)
      : null,
  opt_in_intro_resent: introduction.opt_in_intro_resent,
  user: auth.user,
})

export default connect(
  mapStateToProps,
  { fetchIntroduction, resetIntroduction, updateContacts, markOptInResendFalse }
)(Introduction)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { If, Then, Else } from 'react-if'

import {
  fetchContactByToken,
  resetErrorMessage as resetContactErrorMessage,
} from 'intropath-core/actions/contacts'
import {
  fetchIntroduction,
  fetchLastIntroByContact,
  newConfirmIntroductionNoAuth,
  resetErrorMessage as resetIntroductionErrorMessage,
} from 'intropath-core/actions/introduction'
import { MixpanelContext } from 'utils/mixpanelContext'
import { Heading } from 'components/shared'
import ConfirmFormNoAuth from './ConfirmFormNoAuth'
import introlinkContactIdValue from './introlinkContactIdValue'

class NewConfirmNoAuthContainer extends Component {
  static contextType = MixpanelContext

  static propTypes = {
    location: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.query = queryString.parse(props.location.search)
  }

  componentDidMount() {
    this.props.fetchContactByToken(this.query.token)
    this.contactId = introlinkContactIdValue()
    if (this.contactId)
      this.props.fetchLastIntroByContact(this.contactId, this.query.token)
  }

  submit = (id, values, token) => {
    return this.props
      .newConfirmIntroductionNoAuth(id, values, token, true)
      .then(r => {
        introlinkContactIdValue(r.data.from_contact_id)
        this.mixpanelAccept(r.data.intro.id)
        this.props.history.push('/confirmation-success')
      })
  }

  mixpanelAccept = intro => {
    this.context.mixpanel.track('FIRST_OPT_IN_ACCEPTED', {
      IntroId: intro.id,
      ShareLink: true,
    })
  }

  renderForm = () => {
    const { contact } = this.props

    if (!contact) {
      return null
    }

    let intro = {
      broker: `${contact.user.first_name} ${contact.user.last_name}`,
      broker_profile_pic_url: contact.user.profile_pic_url,
      to: contact.name,
      to_linkedin_profile_url: contact.linkedin_profile_url,
    }

    if (this.contactId) intro = { ...intro, ...this.props.intro }

    return (
      contact &&
      (!this.contactId || this.props.intro) && (
        <ConfirmFormNoAuth
          intro={intro}
          token={this.query.token}
          initialValues={intro}
          confirmIntroductionNoAuth={this.submit}
          mixpanelAccept={() => {}}
          error={this.props.errorMessage}
          resetError={() => {
            this.props.resetContactErrorMessage()
            this.props.resetIntroductionErrorMessage()
          }}
        />
      )
    )
  }

  render() {
    return (
      <div>
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
    errorMessage: state.contacts.error || state.introduction.error,
    contact: state.contacts.contact,
    intro: state.introduction.intro,
    message: state.introduction.message,
    loading: !state.contacts.loaded,
  }
}

export default connect(
  mapStateToProps,
  {
    fetchContactByToken,
    fetchLastIntroByContact,
    fetchIntroduction,
    newConfirmIntroductionNoAuth,
    resetContactErrorMessage,
    resetIntroductionErrorMessage,
  }
)(NewConfirmNoAuthContainer)

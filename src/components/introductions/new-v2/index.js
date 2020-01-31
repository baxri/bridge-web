import React from 'react'
import { connect } from 'react-redux'
import { withSnackbar } from 'notistack'
import { FiChevronRight } from 'react-icons/fi'
import { MixpanelContext } from 'utils/mixpanelContext'
import { createIntroduction } from 'intropath-core/actions/introduction'
import { fetchContact } from 'intropath-core/actions/contacts'
import { validateContact } from './validation'
import {
  NewIntroWrapper,
  HideIf,
  NewIntroFormWrapper,
  FormOverlay,
  FlowSelectorTrigger,
  FlowSelectorTriggerLabel,
  FlowSelectorTriggerValue,
  FlowSelectorTriggerBadge,
} from './styled'
import Header from './Header'
import ContactSelector from './ContactSelector'
import Message from './Message'
import FlowSelector from './FlowSelector'
import qs from 'query-string'
import SafeTimeout from 'utils/SafeTimeout'
import { withFocusControl } from 'context/FocusContext'
import { isMobileSafari } from 'react-device-detect'

const firstName = name => {
  if (!name) return null
  return name.split(' ')[0]
}

class NewIntro extends React.Component {
  static contextType = MixpanelContext

  constructor(props) {
    super(props)

    this.messageBackup = { opt_in: '', fast: '' }

    this.state = {
      introContact: {},
      toContact: {},
      initIntroContact: false,
      initToContact: false,
      introInSearch: false,
      toInSearch: false,
      flow: 'opt_in',
      showFlowSelector: false,
      message: '',
      messageEdited: false,
      allowSend: false,
      errors: {},
      waiting: false,
    }
  }

  componentDidMount() {
    //Need this for quicker testing purposes
    if (!process.env.REACT_APP_ALLOW_SEND_WITHOUT_TOKENS) {
      const { user } = this.props
      if (!user.tokens || user.tokens.length < 1) {
        this.props.history.replace('/import-contacts')
      }
    }

    this.timeout = SafeTimeout.refresh(this.timeout || null)
    this.setInitialContacts()
    this.props.focusSet(/^intro_from/, true)
  }

  componentWillUnmount() {
    this.timeout.destroy()
  }

  componentDidUpdate(oldProps) {
    this.setInitialContacts()
  }

  setInitialContacts() {
    if (!this.state.initIntroContact && !this.state.initToContact) {
      const { contact_id, request_type } = qs.parse(this.props.location.search)
      if (!this.props.contact && contact_id) {
        if (this.props.contact_loaded) this.props.fetchContact(contact_id)
      } else {
        if (request_type === '1') {
          const initIntroContact = { ...this.props.contact }
          this.setState({ initIntroContact })
        } else if (request_type === '2') {
          const initToContact = { ...this.props.contact }
          this.setState({ initToContact })
        }
      }
    }
  }

  formatMessage() {
    const { introContact, toContact, flow } = this.state
    const from = firstName(introContact.name) || introContact.email
    const to = toContact.name || toContact.email
    const toFirstName = firstName(toContact.name) || toContact.email
    if (!from || !to) return ''

    let msg =
      flow === 'opt_in'
        ? `Hi ${from},\n\nJust confirming that you want an introduction to ${to}?`
        : `${from}, meet ${toFirstName}!\n\n` +
          `${toFirstName}, meet ${from}!\n\n` +
          `As previously discussed, I just want to introduce you to each other. I'll let you take it from here.`

    if (introContact.linkedin_profile_url && flow === 'fast') {
      msg += `\n\n${from}’s LinkedIn:\n${introContact.linkedin_profile_url}`
    }

    if (toContact.linkedin_profile_url) {
      if (flow === 'fast') {
        msg += `\n\n${toFirstName}’s LinkedIn:\n${toContact.linkedin_profile_url}`
      } else {
        msg += `\n${toContact.linkedin_profile_url}`
      }
    }
    return msg
  }

  updateForm(updateMessage = true) {
    let { introContact, toContact, message } = this.state
    const newState = {}
    if (updateMessage) {
      if (!this.state.messageEdited) {
        message = this.formatMessage()
        newState.message = message
      }
    }

    const errors = {}

    errors.introContact = validateContact(introContact, {
      contactConnector: toContact,
    })
    errors.toContact = validateContact(toContact, {
      contactConnector: introContact,
    })

    if (!message) {
      errors.message = 'Message required'
      errors.hasErrors = true
    }

    errors.hasErrors =
      errors.hasErrors ||
      errors.introContact.hasErrors ||
      errors.toContact.hasErrors

    newState.errors = errors
    newState.allowSend = !errors.hasErrors

    this.setState(newState)
  }

  onSend = () => {
    const { introContact, toContact } = this.state
    const hasPreviousIntro = this.props.introductions.some(previousIntro =>
      this.isMatchToPreviousIntro(previousIntro, introContact, toContact)
    )
    if (hasPreviousIntro) {
      if (
        window.confirm(
          "You've made this intro before. Are you sure you want to continue?"
        )
      ) {
        this.send()
      }
    } else {
      this.send()
    }
  }

  isMatchToPreviousIntro = (previousIntro, introContact, toContact) => {
    const previousIntroFromEmail = previousIntro.from_email
      ? previousIntro.from_email.toLowerCase()
      : null
    const previousIntroToEmail = previousIntro.to_email
      ? previousIntro.to_email.toLowerCase()
      : null

    const introContactEmail = introContact.email
      ? introContact.email.toLowerCase()
      : null
    const toContactEmail = toContact.email
      ? toContact.email.toLowerCase()
      : null

    const isMatch =
      previousIntroFromEmail !== null &&
      introContactEmail !== null &&
      previousIntroToEmail !== null &&
      toContactEmail !== null &&
      previousIntroFromEmail === introContactEmail &&
      previousIntroToEmail === toContactEmail

    return isMatch
  }

  send = () => {
    const { introContact, toContact, message, flow } = this.state
    this.setState({ waiting: true }, () => {
      this.props
        .createIntroduction(
          {
            from: introContact.name,
            from_email: introContact.email,
            from_linkedin_profile_url: introContact.linkedin_profile_url,
            from_id: introContact.id,
            to: toContact.name,
            to_email: toContact.email,
            to_id: toContact.id,
            to_linkedin_profile_url: toContact.linkedin_profile_url,
            flow,
            message,
          },
          true
        )
        .then(() => {
          this.props.enqueueSnackbar('Intro Sent', {})
          this.trackIntroCreated()
          this.onClose()
        })
        .catch(() => {
          this.props.enqueueSnackbar('Error! Please, try later', {})
          this.timeout.set(() => this.setState({ waiting: false }), 1000)
        })
    })
  }

  trackIntroCreated = () => {
    const { user } = this.props
    const { introContact, toContact, messageEdited, flow } = this.state
    const userId = user ? user.id : ''
    const includesLinkedInForN1 =
      introContact.linkedin_profile_url &&
      introContact.linkedin_profile_url.length > 0
        ? true
        : false
    const includesLinkedInForN2 =
      toContact.linkedin_profile_url &&
      toContact.linkedin_profile_url.length > 0
        ? true
        : false
    this.context.mixpanel.identify(userId)
    this.context.mixpanel.track('INTRO_CREATED', {
      UserId: userId,
      FromContactId: introContact.id,
      ToContactId: toContact.id,
      IncludesLinkedInForN1: includesLinkedInForN1,
      IncludesLinkedInForN2: includesLinkedInForN2,
      Edited: messageEdited,
      Flow: flow,
    })
  }

  onClose = () => {
    const { introContact, toContact } = this.state
    if (
      !this.state.waiting &&
      ((introContact && (introContact.name || introContact.email)) ||
        (toContact && (toContact.name || toContact.email)))
    ) {
      if (window.confirm('Are you sure want to cancel this intro?')) {
        this.props.history.push('/')
      }
    } else {
      this.props.history.push('/')
    }
  }

  onIntroContactChange = introContact => {
    this.setState({ introContact }, () => this.updateForm())
  }

  onIntroContactSelect = () => {
    if (!isMobileSafari) this.props.focusSet(/^intro_to/, true)
  }

  onIntroContactRemove = () => {
    if (!isMobileSafari) this.props.focusSet(/^intro_from/, true)
  }

  onToContactChange = toContact => {
    this.setState({ toContact }, () => this.updateForm())
  }

  onToContactSelect = () => {
    if (!this.state.introContact.name)
      if (!isMobileSafari) this.props.focusSet(/^intro_from/, true)
      else if (!isMobileSafari) this.props.focusSet('intro_message', true)
  }

  onToContactRemove = () => {
    if (!isMobileSafari) this.props.focusSet(/^intro_to/, true)
  }

  onSearchStartIntroContact = () => {
    this.setState({ introInSearch: true, toInSearch: false })
  }

  onSearchStopIntroContact = () => {
    this.setState({ introInSearch: false })
  }

  onSearchStartToContact = () => {
    this.setState({ introInSearch: false, toInSearch: true })
  }

  onSearchStopToContact = () => {
    this.setState({ toInSearch: false })
  }

  onMessageEdit = e => {
    this.setState(
      { message: e.target.value, messageEdited: !!e.target.value },
      () => this.updateForm(false)
    )
  }

  onMessageBlur = () => {
    this.updateForm()
  }

  onContactSync = () => {
    this.props.history.push('/import-contacts?importing=true')
  }

  onFlowSelectorOpen = () => this.setState({ showFlowSelector: true })

  onFlowSelectorClose = () => this.setState({ showFlowSelector: false })

  onSetFlow = flow => {
    if (flow !== this.state.flow) {
      this.messageBackup[flow === 'opt_in' ? 'fast' : 'opt_in'] = this.state
        .messageEdited
        ? this.state.message
        : ''
      const newState = { flow }
      if (this.messageBackup[flow]) {
        newState['messageEdited'] = true
        newState['message'] = this.messageBackup[flow]
      } else {
        newState['messageEdited'] = false
      }

      this.setState(newState, () => this.updateForm(true))
    }
    this.timeout.set(() => this.onFlowSelectorClose(), 300)
  }

  render() {
    return (
      <NewIntroWrapper>
        <Header
          onClose={this.onClose}
          title="Create intro"
          onAction={this.onSend}
          actionTitle={this.state.waiting ? 'Sending...' : 'Send'}
          actionProps={{
            disabled: this.state.waiting || !this.state.allowSend,
          }}
        />
        <NewIntroFormWrapper>
          <HideIf condition={this.state.toInSearch}>
            <ContactSelector
              name="intro_from"
              label="I want to introduce..."
              selectedLabel="Intro"
              onSearchStart={this.onSearchStartIntroContact}
              onSearchStop={this.onSearchStopIntroContact}
              onChange={this.onIntroContactChange}
              onSelect={this.onIntroContactSelect}
              onRemove={this.onIntroContactRemove}
              onContactSync={this.onContactSync}
              showBottomSeparator={true}
              initialValue={this.state.initIntroContact}
              initialTabIndex={10}
              contactConnector={this.state.toContact}
            />
          </HideIf>
          <HideIf condition={this.state.introInSearch}>
            <ContactSelector
              name="intro_to"
              label="To"
              selectedLabel="To"
              onSearchStart={this.onSearchStartToContact}
              onSearchStop={this.onSearchStopToContact}
              onChange={this.onToContactChange}
              onSelect={this.onToContactSelect}
              onRemove={this.onToContactRemove}
              onContactSync={this.onContactSync}
              showBottomSeparator={true}
              initialValue={this.state.initToContact}
              initialTabIndex={14}
              contactConnector={this.state.introContact}
            />
          </HideIf>
          <HideIf condition={this.state.introInSearch || this.state.toInSearch}>
            <FlowSelectorTrigger onClick={this.onFlowSelectorOpen}>
              <FlowSelectorTriggerLabel>Intro Flow</FlowSelectorTriggerLabel>
              <FlowSelectorTriggerValue>
                {this.state.flow === 'opt_in'
                  ? 'Get Forwardable Info & Opt-In'
                  : 'Fast, No Opt-In'}
              </FlowSelectorTriggerValue>
              <FlowSelectorTriggerBadge>
                <FiChevronRight size="18px" />
              </FlowSelectorTriggerBadge>
            </FlowSelectorTrigger>
            <Message
              name="intro_message"
              placeholder="Compose Message"
              value={this.state.message}
              onChange={this.onMessageEdit}
              onBlur={this.onMessageBlur}
              tabIndex={18}
            />
          </HideIf>
          <FormOverlay show={this.state.waiting} />
        </NewIntroFormWrapper>
        <FlowSelector
          show={this.state.showFlowSelector}
          flowType={this.state.flow}
          onChange={this.onSetFlow}
          onClose={this.onFlowSelectorClose}
          introPerson={firstName(this.state.introContact.name) || '(Person 1)'}
          toPerson={firstName(this.state.toContact.name) || '(Person 2)'}
        />
      </NewIntroWrapper>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  contact: state.contacts.contact,
  contact_loaded: state.contacts.loaded,
  loading: state.introduction.loading,
  introductions: state.introduction.list,
})

export default connect(
  mapStateToProps,
  { createIntroduction, fetchContact }
)(withSnackbar(withFocusControl(NewIntro)))

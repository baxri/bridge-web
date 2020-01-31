import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { When } from 'react-if'
import qs from 'query-string'

import { Heading } from 'components/shared'
import Message from './Message'
import Confirmation from './Confirmation'
import { withProvider, withConsumer } from 'context/NewIntroContext'
import ContactSuggestions from './ContactSuggestions'
import { fetchContact } from 'intropath-core/actions/contacts'

import { NewIntroWrapper } from './styled'

class NewIntro extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      contacts: props.contacts,
      maxReceiverContacts: 1,
    }

    this.fromRef = React.createRef()
    this.receiverRef = React.createRef()
  }

  componentDidMount() {
    this.fromRef && this.fromRef.focus()
    const { contact_id, request_type } = qs.parse(this.props.location.search)
    if (!this.props.contact && contact_id) {
      this.props.fetchContact(contact_id)
    } else {
      if (request_type === '1') {
        this.selectContact('from', [this.props.contact])
        this.setState({ from: [this.props.contact] })
      } else if (request_type === '2') {
        this.selectContact('receivers', [this.props.contact])
        this.setState({ receivers: [this.props.contact] })
      }
    }
  }

  rightButtonDisabled = () => {
    const { screen, from, receivers } = this.props

    if (screen === 'select_contact') {
      return !(receivers.length > 0 && from.length > 0)
    }
    return screen === 'message'
  }

  getFilteredContacts = () => {
    const { from, receivers, contacts } = this.props
    const selected = from.concat(receivers).map(s => s.id)
    const newContacts = contacts.filter(contact => {
      if (contact.id && selected.includes(contact.id)) {
        return false
      }
      return true
    })
    return newContacts
  }

  onContactSelected = field => value => {
    this.selectContact(field, value)
  }

  selectNext = () => {
    const event = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      shiftKey: true,
      keyCode: 13,
    })

    if (this.fromRef && this.fromRef.value && this.fromRef.value.length > 0) {
      this.fromRef.dispatchEvent(event)
    }

    if (
      this.receiverRef &&
      this.receiverRef.value &&
      this.receiverRef.value.length > 0
    ) {
      this.receiverRef.dispatchEvent(event)
    }
  }

  onAddContact = () => {
    this.setState(
      { maxReceiverContacts: this.state.maxReceiverContacts + 1 },
      () => {
        this.receiverRef && this.receiverRef.focus()
      }
    )
  }

  selectContact = (field, value) => {
    this.props.setValues(field, value, () => {
      this.setState({ contacts: this.getFilteredContacts() }, () => {
        if (this.props.from.length === 0 && this.fromRef) {
          this.fromRef.focus()
        } else if (this.receiverRef) {
          // fix focus after selected receiver the second time
          this.receiverRef.blur()
          setTimeout(() => this.receiverRef && this.receiverRef.focus(), 30)
        }
      })
    })
  }

  handleEnter = () => {
    if (this.props.from.length && this.props.receivers.length) {
      this.props.next('message')
    }
  }

  render() {
    const { screen, next, cancel, from, receivers } = this.props
    return (
      <NewIntroWrapper>
        <When condition={screen !== 'confirmation'}>
          <Heading.SideViewHeading
            label="Create Intro"
            leftProps={{
              label: 'Cancel',
              onClick: cancel,
            }}
            nextProps={{
              label: 'Next',
              onClick: () => this.selectNext(),
              disabled:
                receivers.length === this.state.maxReceiverContacts &&
                from.length > 0, // Do NOT show if contacts added
              tabIndex: 2,
            }}
          />
        </When>

        <When condition={screen === 'select_contact'}>
          <ContactSuggestions
            max={1}
            suggestions={this.state.contacts}
            onSelected={this.onContactSelected('from')}
            name="from"
            placeholder="I want to introduce..."
            selectedContacts={this.state.from || []}
            inputRef={ref => (this.fromRef = ref)}
            ref="from"
            showSuggestion={from.length === 0}
            tabIndex={0}
          />
          <When condition={!!from.length}>
            <ContactSuggestions
              max={this.state.maxReceiverContacts}
              suggestions={this.state.contacts}
              onSelected={this.onContactSelected('receivers')}
              onAddContact={this.onAddContact}
              name="receiver"
              placeholder="to..."
              selectedContacts={this.state.receivers || []}
              inputRef={ref => (this.receiverRef = ref)}
              showSuggestion={from.length > 0}
              tabIndex={1}
              handleEnter={this.handleEnter}
              buttonProps={{
                disabled: this.rightButtonDisabled(),
                onClick: () => next('message'),
                label: 'Review Intro',
              }}
            />
          </When>
          {this.state.contacts.length === 0 && (
            <div style={{ textAlign: 'center', marginTop: 20 }}>
              <Link to="/import-contacts?importing=true">
                Import your contacts
              </Link>
              <span>
                <br />
                to make creating intros a breeze
              </span>
            </div>
          )}
        </When>

        <When condition={screen === 'message'}>
          <Message />
        </When>

        <When condition={screen === 'confirmation'}>
          <Confirmation />
        </When>
      </NewIntroWrapper>
    )
  }
}

const mapStateToProps = state => ({
  contact: state.contacts.contact,
  contacts: state.contacts.list,
  loaded: state.contacts.loaded,
})

const enhance = compose(
  connect(
    mapStateToProps,
    { fetchContact }
  ),
  withProvider,
  withConsumer
)

export default enhance(NewIntro)

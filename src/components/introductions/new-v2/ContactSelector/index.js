import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { keyBy, orderBy, uniqBy, isEqual } from 'lodash'
import { isMobile, isMobileSafari } from 'react-device-detect'
import { isEmail } from 'validator'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import qs from 'query-string'

import {
  ContactSelectorContainer,
  ContactForm,
  SearchInputContainer,
  ContactSyncContainer,
  ContactSyncText,
  ContactSyncButton,
  ContactSyncButtonText,
} from './styled'
import Input from './Input'
import ContactResults from './ContactResults'
import SelectedContact from './SelectedContact'
import { validateContact } from '../validation'
import computeContactsFromIntros from 'components/shared/computeContactsFromIntros'
import SafeTimeout from 'utils/SafeTimeout'
import { withFocusControl } from 'context/FocusContext'
import api from 'intropath-core/actions/fetch/api'

const getContactKey = (name, email) => `${name}-${email}`

const newValidatedContact = ({
  name = '',
  email = '',
  linkedin_profile_url = '',
  profile_pic_url = '',
  id = '',
  contactConnector,
}) => {
  const contact = { name, email, linkedin_profile_url, profile_pic_url, id }
  return { contact, errors: validateContact(contact, { contactConnector }) }
}

const defaultProps = () => {
  return {
    ...newValidatedContact({}),
    contactSelected: false,
    contactSelectedFocused: false,
    value: '',
    shadow: '',
    isSearching: false,
    suggestions: [],
    edit: false,
    initialValueUsed: false,
    highlightIndex: -1,
    contactConnector: [],
    linkedinLoading: false,
  }
}

class ContactSelector extends React.Component {
  constructor(props) {
    super(props)

    this.state = defaultProps()

    this.typeTimeout = null
    this.hasFocus = false
    this.hasFieldFocus = false
  }

  componentDidMount() {
    this.timeout = SafeTimeout.refresh(this.timeout || null)
  }

  componentWillUnmount() {
    this.timeout.destroy()
  }

  componentDidUpdate(oldProps) {
    if (!isEqual(this.props, oldProps)) {
      if (
        this.props.contactConnector.email !== oldProps.contactConnector.email
      ) {
        this.setState({
          errors: validateContact(this.state.contact, {
            contactConnector: this.props.contactConnector,
          }),
        })
      }
      if (
        !oldProps.initialValue &&
        this.props.initialValue &&
        !this.state.initialValueUsed
      ) {
        const { contact_id } = qs.parse(this.props.location.search)
        const validateContact = newValidatedContact({
          ...this.props.initialValue,
          contactConnector: this.props.contactConnector,
        })
        let edit = this.state.edit

        if (
          contact_id === validateContact.contact.id &&
          validateContact.errors.hasErrors
        ) {
          edit = true
        }

        this.setState(
          {
            ...validateContact,
            contactSelected: true,
            initialValueUsed: true,
            edit,
          },
          () => this.contactUpdate(true)
        )
      } else {
        this.contactUpdate()
      }
    }
  }

  setFieldFocus = (fld, force = false) => {
    if (!isMobileSafari || force)
      this.props.focusSet(this.props.name + '__' + fld, true)
  }

  setNewContactIfNeed() {
    const { value } = this.state
    if (value.length > 0) {
      if (!this.isParseNeeded(value)) {
        const fld = isEmail(value.trim()) ? 'email' : 'name'
        this.onSuggestSelect({ [fld]: value.trim() })
        return true
      }
    }
    return false
  }

  isParseNeeded = value => {
    const result = value.match(/^(.*?)<([^><]+@[^><]+)>/)
    if (result == null || !isEmail(result[2].trim())) {
      return false
    }

    this.onSuggestSelect({ email: result[2].trim(), name: result[1].trim() })
    return true
  }

  onFieldFocus = fld => () => {
    this.hasFieldFocus = true
    this.onStartEdit()
  }

  onFieldBlur = fld => {
    this.hasFieldFocus = false

    if (this.state.contact[fld]) {
      this.onEdit(fld)({
        target: { value: this.state.contact[fld].trim() },
      })
    }
    // Give time to focus on another field before collapsing
    this.timeout.set(() => {
      if (
        this.state.contactSelected &&
        !this.state.errors.hasErrors &&
        !this.hasFieldFocus
      ) {
        this.onStopEdit()
      }
    }, 100)
  }

  onMainFocus = () => {
    // console.log('focused ' + this.props.label)
    if (this.state.contactSelected)
      this.setState({ contactSelectedFocused: true })
    this.startSearchIfNeed()
    this.hasFocus = true
  }

  onMainBlur = () => {
    //console.log('blured ' + this.props.label)
    if (this.state.contactSelected)
      this.setState({ contactSelectedFocused: false })

    if (this.ignoreBlur) return
    this.stopSearchIfNeed(true)
    this.hasFocus = false

    // Wait 200ms before selecting new contact if contact not selected and value is not empty on blur
    // iphone Done keyboard key workaround
    this.timeout.set(() => {
      const { contactSelected } = this.state
      if (!contactSelected) {
        this.setNewContactIfNeed()
      }
    }, 200)
  }

  onResultsMouseDown = () => {
    // workaround for early blur on long result click
    this.ignoreBlur = true
  }

  onMainChange = e => {
    this.ignoreBlur = false
    if (this.state.contactSelected) this.onRemove()
    const value = e.target.value
    const newState = { value }
    if (this.state.isSearching) {
      if (this.typeTimeout) {
        this.timeout.clear(this.typeTimeout)
      }
      this.typeTimeout = this.timeout.set(() => {
        this.setState({ suggestions: this.searchContacts(this.state.value) })
      }, 100)
    }
    this.setState(newState, () => {
      this.startSearchIfNeed()
      this.stopSearchIfNeed()
    })
  }

  onMainKeyDown = e => {
    const { suggestions, highlightIndex } = this.state
    if (e.key === 'ArrowUp') {
      if (highlightIndex >= 0) {
        this.setState({ highlightIndex: highlightIndex - 1 })
      }
    } else if (e.key === 'ArrowDown') {
      if (highlightIndex + 1 < suggestions.length) {
        this.setState({ highlightIndex: highlightIndex + 1 })
      }
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      if (this.state.contactSelected) {
        this.onRemove()
        return false
      }
    } else if (e.key === 'Enter' || e.key === 'Tab') {
      if (highlightIndex >= 0 && suggestions[highlightIndex]) {
        e.preventDefault()
        return false
      } else if (
        e.key === 'Tab' &&
        highlightIndex === -1 &&
        this.searchContacts(this.state.value)[0]
      ) {
        this.setState({ highlightIndex: 0 })
        e.preventDefault()
        return false
      }
    }
  }

  onMainKeyUp = e => {
    // should use keyup to prevent triggering keypress event on next selected field
    const { suggestions, highlightIndex } = this.state
    if (e.key === 'Enter' || e.key === 'Tab') {
      if (highlightIndex >= 0 && suggestions[highlightIndex]) {
        this.onSuggestSelect(suggestions[highlightIndex])
        e.preventDefault()
        return false
      } else if (this.setNewContactIfNeed()) {
        e.preventDefault()
        return false
      }
    }
  }

  onSuggestSelect = contact => {
    this.ignoreBlur = false
    const validContact = newValidatedContact(contact)
    const linkedinLoading =
      contact.email && !validContact.contact.linkedin_profile_url

    this.setState(
      {
        ...validContact,
        contactSelected: true,
        value: '',
        highlightIndex: -1,
        linkedinLoading,
      },
      () => {
        this.onMainBlur()
        this.contactUpdate(true)
        if (linkedinLoading) this.enrichContact(contact.email)
      }
    )

    if (validContact.errors.hasErrors) {
      this.onStartEdit()
      if (validContact.errors.name) {
        this.setFieldFocus('name')
      } else if (validContact.errors.email) {
        this.setFieldFocus('email')
      }
    }
  }

  onSelectedContactClick = () => {
    this.setFieldFocus('search', true)
    this.setState({ contactSelectedFocused: true })
  }

  onRemove = () => {
    this.setState(
      { ...newValidatedContact({}), edit: false, contactSelected: false },
      () => {
        this.contactUpdate()
        this.props.onRemove()
      }
    )
  }

  onStartEdit = () => {
    if (this.state.edit) return
    this.setState({ edit: true })
  }

  onStopEdit = () => {
    this.setState({ edit: false })
    if (!this.state.contactSelectedFocused && this.props.onSelect)
      this.props.onSelect()
  }

  onEdit(fld) {
    return e => {
      const { contact } = this.state
      contact[fld] = e.target.value
      this.setState(
        {
          ...newValidatedContact({
            ...contact,
            contactConnector: this.props.contactConnector,
          }),
        },
        () => this.contactUpdate()
      )
    }
  }

  startSearchIfNeed() {
    if (this.state.value.length > 0 && !this.state.isSearching) {
      this.setState({
        isSearching: true,
        suggestions: this.searchContacts(this.state.value),
      })
      this.props.onSearchStart()
    }
  }

  stopSearchIfNeed(force = false) {
    if ((force || !this.state.value) && this.state.isSearching) {
      this.timeout.set(() => {
        this.setState({ isSearching: false, suggestions: [] })
        this.props.onSearchStop()
      }, 100)
    }
  }

  contactUpdate(selected) {
    this.props.onChange({ ...this.state.contact })
    if (selected && !this.state.edit && this.props.onSelect)
      this.props.onSelect()
  }

  searchContacts(value) {
    // reuse recent contacts filter logic from contacts page
    let suggestions = []
    if (value.trim() !== '') {
      const computedContacts = computeContactsFromIntros(
        this.props.contactsByKey,
        this.props.intros,
        { query: value.trim() }
      )
      suggestions = orderBy(
        computedContacts,
        ['introductions_count', 'mostRecentIntroTime'],
        ['desc', 'desc']
      )
    }

    // while there are no allowed duplicates in current contacts there are still old users with duplicates in contacts
    suggestions = uniqBy(suggestions, function(suggestion) {
      return suggestion.email ? suggestion.email.toLowerCase() : null
    })

    const { contactConnector } = this.props
    return suggestions.filter(contact =>
      contactConnector.email
        ? contactConnector.email.toLowerCase() !== contact.email.toLowerCase()
        : true
    )
  }

  enrichContact = email => {
    let state = {
      linkedinLoading: false,
    }

    api()
      .post('/enrich', { email })
      .then(({ data }) => {
        if (!this.state.contact.linkedin_profile_url) {
          state = {
            ...state,
            contact: {
              ...this.state.contact,
              linkedin_profile_url: data.linkedin,
            },
          }

          this.props.onChange({ ...state.contact })
        }

        this.setState(state)
      })
      .catch(_error => {
        this.setState(state)
      })
  }

  render() {
    const {
      label,
      selectedLabel,
      showBottomSeparator = false,
      initialTabIndex = 0,
      name,
    } = this.props

    const { errors } = this.state

    const { contacts } = this.props
    const showSyncContacts =
      this.hasFocus && this.state.value && (!contacts || !contacts.length)

    const wideLabel = '68px'
    return (
      <div>
        <ContactSelectorContainer showBottomSeparator={showBottomSeparator}>
          <ContactForm expanded={this.state.contactSelected && this.state.edit}>
            <SearchInputContainer hide={this.state.contactSelected}>
              <Input
                name={`${name}__search`}
                showLabel={false}
                placeholder={label}
                onChange={this.onMainChange}
                onFocus={this.onMainFocus}
                onBlur={this.onMainBlur}
                onKeyDown={this.onMainKeyDown}
                onKeyUp={this.onMainKeyUp}
                value={this.state.value}
                shadowValue={this.state.shadow}
                tabIndex={initialTabIndex}
                tabOnEnter={this.state.contactSelectedFocused}
              />
            </SearchInputContainer>
            {this.state.contactSelected && (
              <Fragment>
                <SelectedContact
                  contact={this.state.contact}
                  label={selectedLabel}
                  labelWidth={wideLabel}
                  showLabel={this.state.edit}
                  highlight={this.state.contactSelectedFocused}
                  onClick={this.onSelectedContactClick}
                  onExpand={this.onStartEdit}
                  onCollapse={this.onStopEdit}
                  collapseDisabled={errors.hasErrors}
                  collapsed={!this.state.edit}
                  linkedinLoading={this.state.linkedinLoading}
                />
                <Input
                  component={Input}
                  name={`${name}__name`}
                  error={errors && errors.name}
                  label="Name"
                  labelWidth={wideLabel}
                  onChange={this.onEdit('name')}
                  onFocus={this.onFieldFocus('name')}
                  onBlur={() => {
                    this.onFieldBlur('name')
                  }}
                  value={this.state.contact.name || ''}
                  tabIndex={initialTabIndex + 1}
                  tabOnEnter={true}
                />
                <Input
                  name={`${name}__email`}
                  error={errors && errors.email}
                  label="Email"
                  labelWidth={wideLabel}
                  onChange={this.onEdit('email')}
                  onFocus={this.onFieldFocus('email')}
                  onBlur={() => {
                    this.onFieldBlur('email')
                  }}
                  value={this.state.contact.email || ''}
                  tabIndex={initialTabIndex + 2}
                  tabOnEnter={true}
                  type={isMobile ? 'email' : 'text'}
                />
                <Input
                  name={`${name}__linkedin`}
                  error={errors && errors.linkedin_profile_url}
                  label="Linkedin"
                  labelWidth={wideLabel}
                  onChange={this.onEdit('linkedin_profile_url')}
                  onFocus={this.onFieldFocus('linkedin_profile_url')}
                  onBlur={() => {
                    this.onFieldBlur('linkedin_profile_url')
                  }}
                  value={this.state.contact.linkedin_profile_url || ''}
                  optional={true}
                  tabIndex={initialTabIndex + 3}
                  tabOnEnter={true}
                />
              </Fragment>
            )}
          </ContactForm>
          <div onMouseDown={this.onResultsMouseDown}>
            <ContactResults
              contacts={this.state.suggestions}
              query={this.state.value}
              onSelect={this.onSuggestSelect}
              highlightIndex={this.state.highlightIndex}
            />
          </div>
        </ContactSelectorContainer>
        {showSyncContacts && (
          <ContactSyncContainer>
            <ContactSyncButton onClick={this.props.onContactSync}>
              <img alt="Sync your Contacts" src="/img/icons/google.png" />
              <ContactSyncButtonText>Sync your Contacts</ContactSyncButtonText>
            </ContactSyncButton>
            <ContactSyncText>to make creating intros a breeze</ContactSyncText>
          </ContactSyncContainer>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const intros = state.introduction.list
  const contacts = state.contacts.list

  const contactsByKey = keyBy(contacts, ({ name, email }) => {
    return getContactKey(name, email)
  })

  return {
    contacts,
    contactsByKey,
    intros,
    loaded: state.contacts.loaded,
  }
}

const enhance = compose(
  connect(mapStateToProps),
  withFocusControl,
  withRouter
)

export default enhance(ContactSelector)

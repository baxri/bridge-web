import React from 'react'
import Autosuggest from 'react-autosuggest'
import TagsInput from 'react-tagsinput'
import { validate } from 'email-validator'
import { When } from 'react-if'
import { sortBy, compact, uniq, uniqBy } from 'lodash'
import { connect } from 'react-redux'

import { Contact, Heading, SelectedContact, Button } from 'components/shared'
import {
  SelectContactWrapper as Wrapper,
  Label,
  SelectedLabel,
  BorderlessInput,
  SearchContact,
  Contacts,
  TagsWrapper,
  ListTags,
  ContinueButtonWrapper,
  ContinueButton,
} from './styled'
import fastFilter from 'utils/fastFilter'
import sortContacts from 'utils/contactSort'

const renderSuggestion = (suggestion, { query, isHighlighted }) => (
  <Contact {...suggestion} activeCursor={isHighlighted} />
)

const renderSuggestionsContainer = ({ containerProps, children, query }) => (
  <div {...containerProps}>
    <Heading.ListHeading>
      {query ? 'Contacts' : 'Recent Contacts'}
    </Heading.ListHeading>

    <Contacts>{children}</Contacts>
  </div>
)

const renderInputComponent = ({
  label,
  tags,
  onRemove,
  onAddContact,
  inputRef,
  ref,
  ...props
}) => {
  return (
    <div style={{ maxWidth: 550 }}>
      <React.Fragment>
        {props.name !== 'receiver' && props.disabled && (
          <SelectedLabel>I want to introduce</SelectedLabel>
        )}
        {props.name === 'receiver' && tags.length > 0 && (
          <SelectedLabel>To</SelectedLabel>
        )}
        <SearchContact>
          {label && <Label>{label}</Label>}
          <TagsWrapper>
            <ListTags>
              {tags.map((tag, index) => (
                <SelectedContact
                  key={index}
                  position="left"
                  close={() => onRemove(tags.filter((t, i) => i !== index))}
                  name={tag.name || tag.email}
                  avatarUrl={tag.profile_pic_url || null}
                  style={index > 0 ? { marginTop: 10 } : {}}
                />
              ))}
            </ListTags>

            <When condition={!props.disabled}>
              <BorderlessInput
                addMargin={!!tags.length}
                ref={ref => inputRef && inputRef(ref)}
                {...props}
              />
            </When>
            {props.name === 'receiver' && props.disabled && (
              <div className="text-right" style={{ marginTop: 10 }}>
                <Button
                  style={{ border: 'none' }}
                  size="sm"
                  onClick={onAddContact}
                  id="add-contact"
                >
                  Add contact
                </Button>
              </div>
            )}
          </TagsWrapper>
        </SearchContact>
      </React.Fragment>
    </div>
  )
}

const renderLayout = (tagComponents, inputComponent) => (
  <div style={{ width: '100%' }}>{inputComponent}</div>
)

const getSuggestionValue = suggestion => {
  return suggestion.name + suggestion.email
}

const theme = {
  container: {
    width: '100%',
  },
  suggestionsContainer: {
    display: 'none',
    margin: '10px -15px 0',
  },
  suggestionsContainerOpen: {
    display: 'block',
  },
  suggestionsList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  suggestionHighlighted: {
    backgroundColor: 'grey',
  },
}

const INDEX_KEYS = ['name', 'email']
const LIMIT = 50

class ContactSuggestions extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      suggestions: [],
      value: '',
      tags: [],
      isHighlighted: false,
    }
  }

  componentDidUpdate() {
    const { tags } = this.state
    const { max } = this.props
    if (max && tags.length >= max && this.state.suggestions.length > 0) {
      this.setState({ suggestions: [] })
    }

    if (this.props.selectedContacts.length) {
      this.setState({ tags: this.props.selectedContacts })
    }
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    let suggestions = []

    if (value === '' && this.props.introductions.length) {
      let contacts = []
      this.props.introductions.forEach(introduction => {
        if (this.props.name === 'from' && introduction.from_email)
          contacts.push(introduction.from_email)
        if (this.props.name === 'receiver' && introduction.to_email)
          contacts.push(introduction.to_email)
      })
      suggestions = compact(
        uniq(contacts)
          .slice(0, 50)
          .map(email => this.props.suggestions.find(s => s.email === email))
      )
    } else if (value !== '') {
      suggestions = sortContacts(
        fastFilter(this.props.suggestions, INDEX_KEYS, value, LIMIT)
      )
    }

    suggestions = uniqBy(suggestions, function(suggestion) {
      return suggestion.email ? suggestion.email.toLowerCase() : null
    })

    this.handleNextButton(value)

    this.setState({
      suggestions,
    })
  }

  handleNextButton = value => {
    let next_button = document.getElementsByClassName('next_button')[0]
    if (!next_button) {
      return
    }

    if (value === '') {
      next_button.style.display = 'none'
      return
    }

    // Add slight delay to check tags, i.e. that contact has not been selected
    setTimeout(() => {
      const selected =
        this.props.max && this.state.tags.length >= this.props.max

      if (!selected) {
        next_button.style.display = 'block'
      } else {
        next_button.style.display = 'none'
      }
    }, 100)
  }

  handleSuggestionsClearRequested = () => {}

  handleSuggestionSelected = (event, addTag, { suggestion, method }) => {
    if (suggestion) {
      let emptyField
      if (!suggestion.name) {
        emptyField = 'name'
      } else if (!suggestion.email) {
        emptyField = 'email'
      }

      addTag({
        ...suggestion,
        emptyField,
      })
    }
  }

  handleChange = tags => {
    this.props.onSelected(tags)
    this.setState({ tags })
  }

  handleKeyDown = event => {
    const value = event.target.value.trim()

    if (
      event.key === 'Enter' &&
      !this.state.isHighlighted &&
      !value &&
      this.props.handleEnter
    ) {
      this.props.handleEnter()
    } else if (
      ['Enter', 'Tab'].includes(event.key) &&
      !this.state.isHighlighted &&
      value
    ) {
      const isEmail = validate(value)
      const tag = isEmail
        ? { email: value, name: '', emptyField: 'name' }
        : { name: value, email: '', emptyField: 'email' }
      const tags = this.state.tags.concat(tag)

      this.props.onSelected(tags)
      this.setState({ tags, value: '' })
      event.preventDefault()
    }
  }

  handleSuggestionHighlighted = ({ suggestion }) => {
    this.setState({ isHighlighted: !!suggestion })
  }

  handleOnBlur = (event, { highlightedSuggestion }) => {
    if (event && event.relatedTarget && highlightedSuggestion) {
      const tags = this.state.tags.concat(highlightedSuggestion)
      this.props.onSelected(tags)
      this.setState({ tags, value: '' })
    }
  }

  onChange = (event, { newValue, method }) => {
    if (['enter', 'click'].includes(method)) {
      event.preventDefault()
      this.setState({ value: '' })
    } else if (['down', 'up'].includes(method)) {
      event.preventDefault()
    } else {
      this.setState({ value: newValue })
    }
  }

  render() {
    const { suggestions, value, tags } = this.state
    const {
      label,
      max,
      onSelected,
      onAddContact,
      inputRef,
      showSuggestion,
      handleEnter,
      buttonProps,
      ...props
    } = this.props
    const inputProps = {
      value,
      onChange: this.onChange,
      label: label,
      disabled: max && tags.length >= max,
      onKeyDown: this.handleKeyDown,
      onBlur: this.handleOnBlur,
      ...props,
    }

    const autosuggestInput = ({ addTag, ...props }) => {
      return (
        <Autosuggest
          onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
          onSuggestionSelected={(event, rest) =>
            this.handleSuggestionSelected(event, addTag, rest)
          }
          onSuggestionHighlighted={this.handleSuggestionHighlighted}
          suggestions={suggestions}
          getSuggestionValue={getSuggestionValue}
          inputProps={inputProps}
          alwaysRenderSuggestions={showSuggestion}
          renderSuggestionsContainer={renderSuggestionsContainer}
          renderSuggestion={renderSuggestion}
          renderInputComponent={args =>
            renderInputComponent({
              ...args,
              tags: this.state.tags,
              onRemove: this.handleChange,
              onAddContact,
              inputRef: inputRef,
            })
          }
          theme={theme}
          focusInputOnSuggestionClick={props.name === 'receiver'}
        />
      )
    }

    return (
      <div>
        <Wrapper>
          <TagsInput
            renderInput={autosuggestInput}
            value={this.state.tags}
            onChange={this.handleChange}
            renderTag={() => null}
            renderLayout={renderLayout}
          />
        </Wrapper>
        {inputProps.disabled && this.props.name === 'receiver' && (
          <ContinueButtonWrapper className="text-right">
            <ContinueButton {...buttonProps}>
              {buttonProps.label}
            </ContinueButton>
          </ContinueButtonWrapper>
        )}

        {!inputProps.disabled &&
          this.props.suggestions.length > 0 &&
          suggestions.length === 0 &&
          value === '' && (
            <Heading.ListHeading>
              Start typing to show matching contacts
            </Heading.ListHeading>
          )}
      </div>
    )
  }
}

ContactSuggestions.defaultProps = {
  selectedContacts: [],
}

const mapStateToProps = ({ introduction }) => ({
  introductions: sortBy(introduction.list, ['created_at']).reverse(),
})

export default connect(mapStateToProps)(ContactSuggestions)

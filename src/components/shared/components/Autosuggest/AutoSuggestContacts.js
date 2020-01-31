import React, { Component } from 'react'
import AutoSuggest from 'react-autosuggest'
import { compact, sortBy } from 'lodash'

function splitWords(text) {
  return text.split(' ').map(t => t.trim())
}

export function getSuggestedContacts(contacts, value) {
  const inputValue = value.trim().toLowerCase()

  if (inputValue.length === 0) return []

  const suggestions = contacts.map(contact => {
    const contactName = (contact.name || '').toLowerCase()
    const contactEmail = (contact.email || '').toLowerCase()
    const contactValues = splitWords(contactName).concat(
      contactEmail,
      contactName
    )
    const indices = contactValues.map(name => name.indexOf(inputValue))
    const index = indices.reduce((result, index, i) => {
      if (index === -1) return result

      const newResult = index === 0 ? i : contactValues.length
      return result === -1 ? newResult : Math.min(result, newResult)
    })

    return index === -1 ? null : { ...contact, index }
  })

  return sortBy(compact(suggestions), 'index')
}

function shouldRenderSuggestions(value) {
  return value.trim().length >= 0
}

export default class AutoSuggestContacts extends Component {
  state = { suggestedContacts: [] }

  handleSuggestedContactsFetchRequested = ({ value }) =>
    this.setState({
      suggestedContacts: getSuggestedContacts(this.props.contacts, value),
    })

  handleSuggestedContactsClearRequested = () =>
    this.setState({
      suggestedContacts: [],
    })

  handleInputChange = (e, { newValue }) =>
    this.props.inputProps.onChange(newValue)

  render() {
    const { contacts, inputProps, ...props } = this.props

    return (
      <AutoSuggest
        {...props}
        suggestions={this.state.suggestedContacts}
        shouldRenderSuggestions={shouldRenderSuggestions}
        onSuggestionsFetchRequested={this.handleSuggestedContactsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestedContactsClearRequested}
        inputProps={{ ...inputProps, onChange: this.handleInputChange }}
        renderInputComponent={this.renderInputComponent}
      />
    )
  }

  renderInputComponent = inputProps => (
    <Input inputProps={inputProps} onChange={this.props.inputProps.onChange} />
  )
}

class Input extends Component {
  render() {
    return <input {...this.props.inputProps} onChange={this.handleChange} />
  }

  handleChange = e => {
    e.persist()
    this.props.onChange(e)
    setTimeout(() => this.props.inputProps.onChange(e), 1)
  }
}

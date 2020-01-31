import React from 'react'
import Autosuggest from 'react-autosuggest'
import cx from 'classnames'

import './Autosuggest.css'

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function getSuggestions(
  suggestions,
  value,
  getSuggestionMatch = suggestion => {
    return suggestion.name
  }
) {
  const escapedValue = escapeRegexCharacters(value.trim())

  if (escapedValue === '') {
    return []
  }

  const regex = new RegExp(escapedValue, 'i')

  return suggestions.filter(suggestion =>
    regex.test(getSuggestionMatch(suggestion))
  )
}

function getSuggestionMatch(suggestion) {
  return getSuggestionValue(suggestion)
}

function getSuggestionValue(suggestion) {
  return suggestion.name
}

class AutosuggestWrapper extends React.Component {
  state = { suggestions: [] }

  handleSuggestionsFetchRequested = ({ value }) => {
    const { getSuggestions, limit } = this.props
    const suggestions = getSuggestions(
      this.props.suggestions,
      value,
      this.props.getSuggestionMatch
    )
    this.setState({
      suggestions: suggestions.slice(0, limit),
    })
  }

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    })
  }

  handleSuggestionHighlighted = ({ suggestion }) => {
    if (!suggestion) return
    const { changeInputOnHighlight, getSuggestionValue } = this.props
    if (changeInputOnHighlight) {
      this.props.inputProps.onChange(getSuggestionValue(suggestion), {
        newValue: getSuggestionValue(suggestion),
      })
    }
    this.props.onSuggestionHighlighted({ suggestion })
    this.props.onHighlightOrSelect(suggestion)
  }

  handleSuggestionSelected = (event, data) => {
    this.props.onSuggestionSelected(event, data)
    this.props.onHighlightOrSelect(data.suggestion)
  }

  getHighlightedSuggestion = () => {
    const index = this.autosuggest.state.highlightedSuggestionIndex
    return this.state.suggestions[index]
  }

  getSuggestionValue = suggestion => {
    return this.props.getSuggestionValue(suggestion)
  }

  focus() {
    this.autosuggest.input.focus()
  }

  blur() {
    this.autosuggest.input.blur()
  }

  render() {
    const { suggestions } = this.state
    const { className, showAddNew, getSuggestionValue, ...props } = this.props
    const inputProps = {
      ...props.inputProps,
      className: cx(['form-control', props.inputProps.className]),
    }
    const containerClasses = [
      className,
      'react-autosuggest__container',
      {
        'react-autosuggest-with-add-new': showAddNew,
      },
    ]

    return (
      <div className={cx(containerClasses)}>
        <Autosuggest
          ref={el => (this.autosuggest = el)}
          onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          {...props}
          onSuggestionSelected={this.handleSuggestionSelected}
          onSuggestionHighlighted={this.handleSuggestionHighlighted}
          suggestions={suggestions}
          inputProps={inputProps}
        />
      </div>
    )
  }
}

AutosuggestWrapper.defaultProps = {
  suggestions: [],
  onSuggestionHighlighted() {},
  onHighlightOrSelect() {},
  onSuggestionSelected() {},
  getSuggestionMatch,
  getSuggestionValue,
  showAddNew: true,
  changeInputOnHighlight: true, // not a good combination with highlightFirstSuggestion,
  getSuggestions,
  limit: 0,
}

export default AutosuggestWrapper

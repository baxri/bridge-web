import React from 'react'
import { Field } from 'redux-form'
import Autosuggest from './Autosuggest'

class AutosuggestWrapper extends React.Component {
  handleSuggestionSelected = (event, { suggestion }) => {
    this.props.onSuggestionSelected.apply(this, arguments);
    this.props.input.onChange(
      this.autosuggest.props.getSuggestionValue(suggestion)
    )
  };

  render() {
    const { input, meta, ...props } = this.props

    return (
      <Autosuggest
        ref={el => (this.autosuggest = el)}
        {...props}
        inputProps={{ ...input, ...props.inputProps }}
        onSuggestionSelected={this.handleSuggestionSelected}
      />
    )
  }
}

class AutosuggestField extends React.Component {
  render() {
    return <Field {...this.props} component={AutosuggestWrapper} />
  }
}

AutosuggestField.defaultProps = {
  onSuggestionSelected() {},
}

export default AutosuggestField

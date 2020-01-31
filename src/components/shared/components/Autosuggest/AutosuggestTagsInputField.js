import React from 'react'
import { isArray, compact } from 'lodash'

import AutosuggestTagsInput from './AutosuggestTagsInput'
import FormGroupField from 'components/shared/components/Form/FormGroupField'

const ensureArray = value => {
  if (isArray(value)) return value
  return compact([value])
}

class AutosuggestTagsInputWrapper extends React.Component {
  focus() {
    return this.tagsInputWrapper.tagsInput.focus()
  }

  render() {
    const { input, meta, ...props } = this.props

    return (
      <AutosuggestTagsInput
        ref={el => (this.tagsInputWrapper = el)}
        {...input}
        {...props}
        inputProps={{
          name: input.name,
          onFocus: input.onFocus,
          ...props.inputProps,
          id: props.id,
        }}
      />
    )
  }
}

class AutosuggestTagsInputField extends React.Component {
  getRenderedComponent = () => {
    return this.el.component
  }

  render() {
    return (
      <FormGroupField
        ref={el => (this.el = el)}
        component={AutosuggestTagsInputWrapper}
        {...this.props}
        format={ensureArray}
      />
    )
  }
}

export default AutosuggestTagsInputField

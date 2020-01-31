import React from 'react'
import { includes } from 'lodash'
import PropTypes from 'prop-types'

import TagsInput from '../TagsInput'
import Autosuggest from './Autosuggest'

class AutosuggestTagsInput extends React.Component {
  constructor(props) {
    super(props)
    const { replaceEndAtMax, maxTags } = this.props
    if (replaceEndAtMax && maxTags <= 0) {
      throw new Error('maxTags must be greater than 0')
    }
  }

  handleChange = tags => {
    this.props.onChange(tags)
  }

  getTagDisplayValue = tag => {
    const { tagDisplayProp } = this.props
    const tagName = tag[tagDisplayProp]
    if (tagName) return tagName
    return this.autosuggestWrapper.getSuggestionValue(tag)
  }

  addTag = suggestion => {
    const { replaceEndAtMax, value: tags, tagDisplayProp } = this.props
    const tag = {
      ...suggestion,
      [tagDisplayProp]: this.getTagDisplayValue(suggestion),
    }

    if (replaceEndAtMax && this.isMax) {
      const newTags = tags.slice(0, -1).concat([tag])
      return this.props.onChange(newTags)
    }
    return this.tagsInput.addTag(tag)
  }

  get isMax() {
    const { value: tags, maxTags } = this.props
    if (maxTags === -1) return false

    return tags.length >= maxTags
  }

  render() {
    function autocompleteRenderInput({ addTag, ...props }) {
      const handleOnChange = (e, { newValue, method }) => {
        if (method === 'enter') {
          e.preventDefault()
        } else {
          if (e.target) {
            props.onChange(e)
          } else {
            const event = {
              target: {
                value: newValue,
              },
            }
            props.onChange(event)
          }
        }
      }

      return (
        <Autosuggest
          ref={el => {
            this.autosuggestWrapper = el
            props.ref(this.autosuggestWrapper)
          }}
          {...this.props.autosuggestProps}
          inputProps={{
            ...props,
            // disabled: props.disabled || this.isMax,
            placeholder: this.props.value.length > 0 ? '' : props.placeholder,
            onChange: handleOnChange,
            onKeyDown: e => {
              props.onKeyDown(e)
              const isAddKey = includes(this.props.addKeys, e.which)
              if (this.isMax && !isAddKey) {
                return e.preventDefault()
              }

              if (isAddKey) {
                const suggestion = this.autosuggestWrapper.getHighlightedSuggestion()
                if (suggestion) {
                  e.preventDefault()
                  props.onChange({
                    target: {
                      value: '',
                    },
                  })
                  this.addTag(suggestion)
                }
              }
            },
          }}
          onSuggestionSelected={(e, { suggestion }) => {
            props.onChange({
              target: {
                value: '',
              },
            })
            this.addTag(suggestion)
          }}
          changeInputOnHighlight={false}
        />
      )
    }

    const { autosuggestProps, replaceEndAtMax, ...props } = this.props

    return (
      <TagsInput
        ref={el => (this.tagsInput = el && el.tagsInput)}
        {...props}
        renderInput={autocompleteRenderInput.bind(this)}
        onChange={this.handleChange}
      />
    )
  }
}

function defaultRenderTag(props) {
  let {
    tag,
    key,
    disabled,
    onRemove,
    classNameRemove,
    getTagDisplayValue,
    ...other
  } = props

  return (
    <span key={key} {...other}>
      <span className="react-tagsinput-tag__text">
        {getTagDisplayValue(tag)}
      </span>
    </span>
  )
}

AutosuggestTagsInput.propTypes = {
  value: PropTypes.array,
}

const TAB_KEY = 9
const ENTER_KEY = 13

AutosuggestTagsInput.defaultProps = {
  renderTag: defaultRenderTag,
  tagDisplayProp: 'name',
  addKeys: [TAB_KEY, ENTER_KEY],
  replaceEndAtMax: false,
  maxTags: -1,
}

export default AutosuggestTagsInput

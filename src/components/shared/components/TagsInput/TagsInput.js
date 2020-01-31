import React from 'react'
import TagsInput from 'react-tagsinput'
import { includes, isNull } from 'lodash'
import cx from 'classnames'

import './TagsInput.css'

const LEFT_KEY = 37
const RIGHT_KEY = 39
const BACKSPACE_KEY = 8

const hasValue = n => !isNull(n)
const isNavKey = keyCode => includes([LEFT_KEY, RIGHT_KEY], keyCode)

class TagsInputWrapper extends React.Component {
  state = { focusedTagIndex: null }

  handleNav = e => {
    const { focusedTagIndex } = this.state
    const firstTagIndex = 0
    const lastTagIndex = this.props.value.length - 1
    e.preventDefault()

    if (e.which === LEFT_KEY) {
      if (
        focusedTagIndex === firstTagIndex ||
        focusedTagIndex < firstTagIndex
      ) {
        return
      }

      const prevIndex = hasValue(focusedTagIndex)
        ? focusedTagIndex - 1
        : lastTagIndex

      return this.setState({ focusedTagIndex: prevIndex })
    }

    if (e.which === RIGHT_KEY) {
      if (focusedTagIndex === lastTagIndex || focusedTagIndex > lastTagIndex) {
        return this.setState({ focusedTagIndex: null })
      }

      const nextIndex = focusedTagIndex + 1
      return this.setState({ focusedTagIndex: nextIndex })
    }
  }

  handleTagClick = index => {
    this.setState({ focusedTagIndex: index }, () => {
      this.tagsInput.focus()
    })
  }

  renderTag = ({ className, ...props }) => {
    const { focusedTagIndex } = this.state
    const tagClasses = [
      className,
      { 'react-tagsinput-tag--focused': focusedTagIndex === props.key },
    ]

    return this.props.renderTag({
      className: cx(tagClasses),
      onClick: () => this.handleTagClick(props.key),
      ...props,
    })
  }

  renderInput = ({ onKeyDown, ...props }) => {
    const { focusedTagIndex } = this.state
    const { tagDisplayProp } = this.props

    return this.props.renderInput({
      ...props,
      onBlur: e => {
        props.onBlur(e)
        setTimeout(() => {
          if (this.props.addOnBlur) {
            this.tagsInput.addTag({ [tagDisplayProp]: props.value })
          }
        })
      },
      onKeyDown: e => {
        const isRemoveKey = keyCode => {
          return includes(this.props.removeKeys, keyCode)
        }

        if (isNavKey(e.which)) {
          return this.handleNav(e)
        }
        if (hasValue(focusedTagIndex) && isRemoveKey(e.which)) {
          if (focusedTagIndex >= this.props.value.length - 1) {
            this.setState({ focusedTagIndex: null })
          }
          return this.tagsInput._removeTag(focusedTagIndex)
        }
        onKeyDown(e)
      },
    })
  }

  handleChange = tags => {
    setTimeout(() => {
      if (!this.tagsInput) return
      const container = this.tagsInput.div.firstChild
      container.scroll(container.scrollWidth, 0)
    }, 0)
    this.props.onChange(tags)
  }

  render() {
    const { addOnBlur, ...props } = this.props

    return (
      <TagsInput
        ref={el => (this.tagsInput = el)}
        {...props}
        onChange={this.handleChange}
        renderTag={this.renderTag}
        // inputProps={{
        //   ...this.props.inputProps,
        //   onKeyDown: this.handleInputKeyDown
        // }}
        renderInput={this.renderInput}
      />
    )
  }
}

TagsInputWrapper.defaultProps = {
  removeKeys: [BACKSPACE_KEY],
  addOnBlur: true,
  tagDisplayProp: 'name',
}

export default TagsInputWrapper

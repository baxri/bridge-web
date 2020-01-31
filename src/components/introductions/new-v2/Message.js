import React from 'react'
import { StyledTextArea } from './styled'
import { Focusable } from 'context/FocusContext'

class Message extends React.Component {
  render() {
    const {
      name,
      placeholder,
      value,
      onChange,
      onKeyDown = () => {},
      onBlur,
      tabIndex,
    } = this.props
    return (
      <Focusable
        component={StyledTextArea}
        refProp="inputRef"
        name={name}
        autoComplete="off"
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        value={value}
        tabIndex={tabIndex}
      />
    )
  }
}

export default Message

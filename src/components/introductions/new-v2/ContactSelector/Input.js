import React from 'react'
import {
  InputContainer,
  InputLabel,
  InputField,
  InputOptional,
  InputError,
  Shadow,
  ShadowContainer,
} from './styled'
import { Focusable, withFocusControl } from 'context/FocusContext'
import { isMobileSafari } from 'react-device-detect'

class Input extends React.Component {
  state = {
    focused: false,
  }

  onFocus = e => {
    this.setState({ focused: true })

    this.props.onFocus && this.props.onFocus(e)
  }

  onBlur = e => {
    this.setState({ focused: false })

    this.props.onBlur && this.props.onBlur(e)
  }

  onKeyPress = e => {
    if (e.key === 'Enter' && this.props.tabOnEnter) {
      if (!isMobileSafari) this.props.focusSetOnNext(null, true)
    }

    if (this.props.onKeyPress) return this.props.onKeyPress(e)
  }

  render() {
    const {
      onChange = undefined,
      onKeyDown = undefined,
      onKeyUp = undefined,
      name,
      placeholder = '',
      showLabel = true,
      label = '',
      labelWidth = undefined,
      value = '',
      shadowValue = '',
      highlight = false,
      showTopSeparator = false,
      optional = false,
      error = false,
      type = 'text',
      tabIndex,
    } = this.props

    return (
      <InputContainer showTopSeparator={showTopSeparator}>
        {showLabel && <InputLabel width={labelWidth}>{label}</InputLabel>}
        <ShadowContainer showLabel={showLabel}>
          <Shadow value={shadowValue} readOnly={true} highlight={highlight} />
          <Focusable
            component={InputField}
            onKeyPress={this.onKeyPress}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            type={type}
            {...{
              onChange,
              onKeyDown,
              onKeyUp,
              value,
              highlight,
              placeholder,
              tabIndex,
              name,
            }}
          />
        </ShadowContainer>
        {optional && !value && !error && (
          <InputOptional>Optional</InputOptional>
        )}
        {error && !this.state.focused && <InputError>{error}</InputError>}
      </InputContainer>
    )
  }
}

export default withFocusControl(Input)

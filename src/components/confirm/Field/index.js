import React from 'react'

import {
  StyledField,
  FieldLabel,
  FieldLabelText,
  StyledFieldStatus,
  FieldTextarea,
  FieldInput,
  FieldMessage,
  FieldInfo,
} from './styled'

import { FiCheck } from 'react-icons/fi'

const FieldStatus = props => (
  <StyledFieldStatus {...props}>
    <FiCheck size="18px" />
  </StyledFieldStatus>
)

export default React.memo(function Field(props) {
  const {
    name,
    type,
    value = '',
    onChange,
    onFocus,
    onBlur,
    placeholder,
    error,
    valid,
    warning,
    message,
    info,
    label,
    optional,
    disabled,
  } = props
  return (
    <StyledField>
      <FieldLabel>
        <FieldLabelText optional={optional} disabled={disabled}>
          {label}
        </FieldLabelText>
        {!disabled && <FieldStatus {...{ valid, warning }} />}
      </FieldLabel>
      {props.type === 'textarea' ? (
        <FieldTextarea
          {...{
            name,
            type,
            value,
            onChange,
            onFocus,
            onBlur,
            placeholder,
            disabled,
          }}
        />
      ) : (
        <FieldInput
          {...{
            name,
            type,
            value,
            onChange,
            onFocus,
            onBlur,
            placeholder,
            disabled,
          }}
        />
      )}
      {!disabled && (message || error) ? (
        <FieldMessage warning={warning} error={error}>
          {error ? error : message}
        </FieldMessage>
      ) : null}
      {!disabled && info ? <FieldInfo>{info}</FieldInfo> : null}
    </StyledField>
  )
})

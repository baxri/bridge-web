import React from 'react'
import styled from 'styled-components'
import { Input, FormGroup, Label, FormFeedback } from 'reactstrap'

const StyledInput = styled(Input)`
  border-radius: 0;
  border-color: #d4d4d4 !important;
  -webkit-box-shadow: none;
  box-shadow: none;
  border-radius: 0 !important;
  padding-top: 12px;
  padding-bottom: 12px;
`

const renderText = ({
  input,
  meta: { error, touched },
  label,
  id,
  ...props
}) => (
  <FormGroup>
    <Label for={id}>{label}</Label>

    <StyledInput
      id={id}
      valid={touched && !error}
      invalid={touched && error}
      {...{ ...input, ...props }}
    />

    {touched && error && (
      <FormFeedback style={{ display: 'block' }} valid={touched && !error}>
        {error}
      </FormFeedback>
    )}
  </FormGroup>
)

export default renderText

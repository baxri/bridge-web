import React from 'react'
import { FormGroup, Label, Input as BsInput } from 'reactstrap'

const Input = ({ label, value, onChange, id, type, ...rest }) => (
  <FormGroup>
    {label && <Label htmlFor={id}>{label}</Label>}
    <BsInput
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={onChange}
      {...rest}
    />
  </FormGroup>
)

Input.defaultProps = {
  type: 'type',
}

export default Input

import React from 'react'
import styled from 'styled-components'

const CustomInput = styled.input`
  border-radius: 0;
  border-color: #d4d4d4 !important;
  -webkit-box-shadow: none;
  box-shadow: none;
  border-radius: 0 !important;
  height: 50px;
  margin-bottom: 5px;
`
const StyledInput = ({ ...field }) => (
  <div>
    <CustomInput
      className={`form-control ${field.meta.touched &&
        field.meta.error &&
        'is-invalid'}`}
      {...field.input}
      type={field.type}
      autoFocus={field.autoFocus}
    />
    {field.meta.touched && field.meta.error && (
      <div className="invalid-feedback">{field.meta.error}</div>
    )}
  </div>
)

export default StyledInput

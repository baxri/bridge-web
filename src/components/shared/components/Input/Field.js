import React from 'react'
import { Field } from 'redux-form'

import { Text, TextArea } from './fields'

const renderField = props => {
  switch (props.type) {
    // add another input types
    case 'textarea':
      return <TextArea {...props} />
    default:
      return <Text {...props} />
  }
}

const CustomField = props => <Field component={renderField} {...props} />

export default CustomField

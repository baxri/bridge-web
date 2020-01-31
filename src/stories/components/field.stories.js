import React from 'react'
import { storiesOf } from '@storybook/react'
import withReduxForm from 'redux-form-storybook'

import { Field, StyledInput } from 'components/shared'

storiesOf('COMPONENTS|Field', module)
  .addDecorator(withReduxForm)
  .add('Default', () => (
    <div className="form-group introduce-input">
      <label>Text</label>
      <Field
        autoFocus={true}
        name="text"
        className="form-control"
        component={props => <StyledInput {...props} />}
        type={'text'}
      />
    </div>
  ))
  .add('Password', () => (
    <div className="form-group introduce-input">
      <label>Password</label>
      <Field
        autoFocus={true}
        name="password"
        className="form-control"
        component={props => <StyledInput {...props} />}
        type={'password'}
      />
    </div>
  ))

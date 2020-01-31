import React from 'react'
import { storiesOf } from '@storybook/react'

import { Flash } from 'components/shared'

storiesOf('COMPONENTS|Flash', module)
  .add('Default', () => <Flash message="Intro created!" />)
  .add('Error', () => <Flash type="error" message="Something wrong!" />)

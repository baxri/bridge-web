import React from 'react'
import { storiesOf } from '@storybook/react'

import { LoadingData as Spinner } from 'components/shared'

storiesOf('COMPONENTS|Spinner', module).add('Default', () => (
  <Spinner loading={true} />
))

import React from 'react'
import { storiesOf } from '@storybook/react'

import { Header } from 'components/shared'

storiesOf('COMPONENTS|Header', module).add('Default', () => (
  <Header
    title="Create intro"
    actionTitle="Send"
    actionProps={{ disabled: false }}
  />
))

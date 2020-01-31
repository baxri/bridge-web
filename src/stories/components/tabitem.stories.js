import React from 'react'
import { storiesOf } from '@storybook/react'

import { TabItem } from 'components/shared'

storiesOf('COMPONENTS|Tab Item', module).add('Default', () => (
  <div>
    <TabItem label={'Active (5)'} active={false} />
    <TabItem label={'To Do (10)'} active={true} />
    <TabItem label={'No Reply (3)'} active={false} />
  </div>
))

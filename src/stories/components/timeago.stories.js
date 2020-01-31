import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import { TimeAgo } from 'components/shared'

storiesOf('COMPONENTS|Time Ago', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const fulldate = boolean('Full date', false)
    return (
      <div>
        <TimeAgo date={new Date('2018-09-11')} fulldate={fulldate} />
      </div>
    )
  })

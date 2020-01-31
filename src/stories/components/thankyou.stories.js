import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

import { Thankyou } from 'components/shared'
import intros from '../data/intros.json'

storiesOf('COMPONENTS|Thankyou', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    return <Thankyou type="n1Forwardable" intro={intros[0]} />
  })
  .add('With custom message', () => {
    return (
      <Thankyou
        type="n1Forwardable"
        intro={intros[0]}
        errorMessage="You have already accepted the Intro"
      />
    )
  })

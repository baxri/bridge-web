import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, optionsKnob as options, text } from '@storybook/addon-knobs'

import { Avatar } from 'components/shared'

const AvatarStory = props => <Avatar {...props} />

storiesOf('COMPONENTS|Avatar', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const sizes = { Small: 'small', Medium: 'medium', Big: 'big' }
    const sizeProp = options('Size', sizes, 'small', {
      display: 'inline-radio',
    })
    const name = text('Name', 'John Smith')
    const email = text('Email', 'johnsmith@email.com')

    return <AvatarStory size={sizeProp} name={name} email={email} />
  })

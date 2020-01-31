import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  withKnobs,
  boolean,
  optionsKnob as options,
} from '@storybook/addon-knobs'

import { Icons } from 'components/shared'

storiesOf('COMPONENTS|Icons', module)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <div>
      <Icons.EditButton />
      <Icons.Check />
      <Icons.ArrowRight />
      <Icons.AngleLeft />
      <Icons.AngleRight />
      <Icons.Search />
    </div>
  ))
  .add('ThumbsUp', () => {
    const statuses = options(
      'Status',
      {
        Accepted: 'accepted',
        'Not accepted': '',
      },
      '',
      { display: 'inline-radio' }
    )
    const isLeft = boolean('Left side', false)

    return <Icons.IntroThumbsUp status={statuses} left={isLeft} />
  })
  .add('Intro status', () => {
    const statuses = options(
      'Status',
      {
        Initialized: 'initialed',
        Accepted: 'accepted',
        Confirmed: 'confirmed',
        Rejected: 'rejected',
        Canceled: 'canceled',
      },
      'initialed',
      { display: 'inline-radio' }
    )
    return (
      <div>
        <Icons.IntroArrowLeft status={statuses} />
        <Icons.IntroArrowRight status={statuses} />
      </div>
    )
  })

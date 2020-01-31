import React from 'react'
import { storiesOf } from '@storybook/react'

import { Heading } from 'components/shared'

storiesOf('COMPONENTS|Heading', module)
  .add('Center', () => (
    <div className="container">
      <header>
        <Heading.CenterHeading>Accepting...</Heading.CenterHeading>
      </header>
    </div>
  ))
  .add('Header Action', () => (
    <Heading.HeaderAction text="Import Your LinkedIn Contacts" />
  ))
  .add('List', () => <Heading.ListHeading>{'Contacts'}</Heading.ListHeading>)
  .add('Sideview', () => (
    <Heading.SideViewHeading
      label="Confirm Intro"
      leftProps={{
        label: 'Cancel',
        onClick: () => {},
      }}
    />
  ))
  .add('Notification', () => (
    <Heading.NotificationHeading onClick={() => {}}>
      Notification
    </Heading.NotificationHeading>
  ))
  .add('H3', () => <Heading.H3>Latest Activity</Heading.H3>)

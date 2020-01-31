import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Container } from 'reactstrap'
import { storiesOf } from '@storybook/react'

import { Activity } from 'components/shared'
import activity from '../data/activity.json'

const ActivitiyStory = () => (
  <Router>
    <Container style={{ backgroundColor: '#ffffff' }}>
      <Activity {...activity} />
    </Container>
  </Router>
)

storiesOf('COMPONENTS|Activitiy', module).add('Default', () => (
  <ActivitiyStory />
))

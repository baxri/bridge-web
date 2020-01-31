import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { storiesOf } from '@storybook/react'

import Navbar from 'components/layout/Navbar'

const NavbarStory = () => (
  <Router>
    <Navbar />
  </Router>
)

storiesOf('COMPONENTS|Navbar', module).add('Default', () => <NavbarStory />)

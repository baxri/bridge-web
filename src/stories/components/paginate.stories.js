import React from 'react'
import { storiesOf } from '@storybook/react'
import { BrowserRouter as Router } from 'react-router-dom'

import { Paginate } from 'components/shared'

storiesOf('COMPONENTS|Paginate', module).add('Default', () => (
  <Router>
    <Paginate
      pageUrl={'/introductions'}
      currentPage={3}
      total={10}
      totalPages={15}
    />
  </Router>
))

import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { storiesOf } from '@storybook/react'
import StoryRouter from 'storybook-react-router'

import Sidenav from 'components/layout/Sidenav'

const page = name => () => <div>{name}</div>

const SidenavStory = () => (
  <Container>
    <Router>
      <Row>
        <Col lg={4}>
          <Sidenav />
        </Col>

        <Col>
          <Route path="/" exact component={page('Overview')} />
          <Route path="/introductions" component={page('Introductions')} />
          <Route path="/contacts" component={page('Contacts')} />
          <Route path="/settings" component={page('Settings')} />
        </Col>
      </Row>
    </Router>
  </Container>
)

storiesOf('COMPONENTS|Sidenav', module)
  .addDecorator(StoryRouter())
  .add('Default', () => <SidenavStory />)

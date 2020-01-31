import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { BrowserRouter as Router } from 'react-router-dom'
import { storiesOf } from '@storybook/react'

import { CardOverview } from 'components/shared'

const CardStory = () => (
  <Router>
    <Container>
      <Row>
        <Col lg={4}>
          <CardOverview
            count="06"
            text="Intros waiting for confirmation"
            linkTo="/"
          />
        </Col>
        <Col lg={4}>
          <CardOverview
            count="21"
            text="Intros with no reply this month"
            linkTo="/"
          />
        </Col>
        <Col lg={4}>
          <CardOverview
            count="50+"
            text="Completed intros this month"
            linkTo="/"
          />
        </Col>
      </Row>
    </Container>
  </Router>
)

storiesOf('COMPONENTS|Card', module).add('CardOverview', () => <CardStory />)

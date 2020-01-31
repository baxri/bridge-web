import React from 'react'
import { Col, Row } from 'reactstrap'

import { CardOverview } from 'components/shared'

class IntrosEmpty extends React.Component {
  render() {
    return (
      <Row>
        <Col lg={3}>
          <CardOverview
            text="Intros"
            count={0}
            link="Start Your First Intro"
            linkTo="/introductions/new"
            onClick={this.props.onClick}
          />
        </Col>
      </Row>
    )
  }
}

export default IntrosEmpty

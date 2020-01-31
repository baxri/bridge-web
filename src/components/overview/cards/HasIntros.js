import React from 'react'
import { Row, Col } from 'reactstrap'

import { CardOverview } from 'components/shared'

class HasIntros extends React.Component {
  render() {
    const {
      numberOfContacts,
      confirmation,
      awaiting,
      connected,
      feedback_count,
    } = this.props
    let colWidth = numberOfContacts === 0 ? 3 : 4
    if (feedback_count > 0) colWidth--

    return (
      <Row>
        <Col lg={colWidth}>
          <CardOverview
            text="Intros needing confirmation"
            count={confirmation}
            linkTo="/introductions?filter=confirm"
          />
        </Col>
        <Col lg={colWidth}>
          <CardOverview
            text="Intros awaiting a reply"
            count={awaiting}
            linkTo="/introductions?filter=noreply"
          />
        </Col>
        <Col lg={colWidth}>
          <CardOverview
            text="People connected"
            count={connected}
            linkTo="/introductions?filter=completed"
          />
        </Col>
        {feedback_count > 0 && (
          <Col lg={colWidth === 2 ? 3 : colWidth}>
            <CardOverview
              id="card-mobile"
              text="People gave feedback"
              count={feedback_count}
              linkTo="/introductions?filter=rated"
            />
          </Col>
        )}
      </Row>
    )
  }
}

export default HasIntros

import React from 'react'
import { Row, Col } from 'reactstrap'

const AuthLayout = Component => props => (
  <Row>
    <Col xs={12} lg={{ size: 4, offset: 4 }}>
      <Component {...props} />
    </Col>
  </Row>
)

export default AuthLayout

import React from 'react'
import { Row, Col } from 'reactstrap'
import styled from 'styled-components'

import { Button } from 'components/shared'

const Heading = styled.p`
  color: #848484;
  font-size: 28px;
  margin-bottom: 30px;
  text-align: center;
`

const Confirmation = ({ intro, onClickShareAgain }) => {
  return (
    <Row className="row-centered" style={{ marginTop: 40 }}>
      <Col lg={6} className="col-centered offset-lg-3">
        <div className="page intro">
          <div className="container">
            <header style={{ textAlign: 'center' }}>
              <Heading className="sub-heading">
                Nice work :)
                <br />
                Network has been shared.
              </Heading>
              <Row>
                <Col xs={12} className="col-centered">
                  <Button
                    className="btn btn-default"
                    onClick={onClickShareAgain}
                  >
                    Share Your Network Again
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col xs={12} className="col-centered">
                  <Button
                    link
                    to="/contacts"
                    style={{
                      marginTop: 10,
                      marginRight: 10,
                      marginLeft: 10,
                      marginBottom: 30,
                    }}
                  >
                    I{"'"}m done, thanks!
                  </Button>
                </Col>
              </Row>
            </header>
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default Confirmation

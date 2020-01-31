import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'reactstrap'
import styled from 'styled-components'
import media from 'utils/styledMediaQueryFix'

import { Button } from 'components/shared'
import { recoverAccount } from 'intropath-core/actions/auth'

const StyledButton = styled(Button)`
  margin-top: 16px;
  ${media.greaterThan('large')`
    width: unset;
  `}
`

class RecoverAccount extends Component {
  componentWillMount() {
    this.rollbackAccount(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.rollbackAccount(nextProps)
  }

  rollbackAccount = props => {
    if (!props.deleting) props.history.push('/')
  }

  handleRecover = () => {
    this.props.recoverAccount(this.props.user.id)
  }

  logOut = () => {
    this.props.history.push('/logout')
  }

  render() {
    return (
      <Row style={{ marginTop: 60 }}>
        <Col lg={12} className="text-center">
          <p>
            <br />
            Your account has been flagged to be deleted and your data is no
            longer accessible.
            <br />
            <br />
            To request an expedited hard delete, please send a message to{' '}
            <a href="mailto:help@brdg.app">help@brdg.app</a>.<br />
            <br />
            <br />
            Click below if you wish to reopen your account.
          </p>
          <StyledButton full onClick={this.handleRecover}>
            Reopen Your Account
          </StyledButton>
          <br />
          <StyledButton
            full
            alt="true"
            style={{ marginTop: 16 }}
            onClick={this.logOut}
          >
            Logout
          </StyledButton>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => state.auth

export default connect(
  mapStateToProps,
  { recoverAccount }
)(RecoverAccount)

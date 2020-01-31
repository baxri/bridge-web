import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'

import { Alert } from 'components/shared'

const StyledLink = styled(Link)`
  color: #212529;
  text-decoration: underline;

  &:hover {
    color: #212529;
  }
`

class GoogleNotConnected extends React.PureComponent {
  isOnRecover = () =>
    this.props.location && this.props.location.pathname === '/recover'

  render() {
    if (!this.props.showGoogleWarning || this.isOnRecover()) return null

    return (
      <Alert>
        Your connected Google account is no longer working, please connect it
        again
        <br />
        {this.props.location.pathname !== '/profile' && (
          <StyledLink to="/profile">Re-connect Google account</StyledLink>
        )}
      </Alert>
    )
  }
}

export default compose(
  withRouter,
  connect(state => ({ showGoogleWarning: state.user.showGoogleWarning }))
)(GoogleNotConnected)

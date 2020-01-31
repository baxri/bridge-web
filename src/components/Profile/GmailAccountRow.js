import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { showGoogleWarning, updateUser } from 'intropath-core/actions/user'
import media from 'utils/styledMediaQueryFix'
import { Button } from 'components/shared'

const Tdata = styled.td`
  text-align: left;
  vertical-align: middle;

  ${media.lessThan('large')`
    word-break: break-all;
  `}
`

class GmailAccountRow extends Component {
  state = { isLoading: false }

  handleSetPrimary = () => {
    this.setState({ isLoading: true })
    this.props.setPrimaryToken(this.props.token.id, true).then(result => {
      let profile_pic_url = result.payload.token.user_pic

      if (profile_pic_url.length > 0) {
        this.props.updateUser(this.props.profile.id, {
          profile_pic_url,
        })
      }

      this.setState({ isLoading: false })
      this.props.showGoogleWarning(
        result.payload.token.show_deactivated_warning
      )
    })
  }

  handleUnsetPrimary = () => {
    this.setState({ isLoading: true })
    this.props
      .setPrimaryToken(this.props.token.id, false)
      .then(() => this.setState({ isLoading: false }))
  }

  handleRevoke = () => {
    // eslint-disable-next-line
    if (confirm('Are you sure?')) {
      this.setState({ isLoading: true })
      this.props
        .revokeToken(this.props.token.id)
        .then(() => this.setState({ isLoading: false }))
    }
  }

  render() {
    const { user, token, allowSetPrimary } = this.props
    const { isLoading } = this.state

    return (
      <tr className="gmail-account-row">
        <Tdata>{token.email || user.email}</Tdata>
        <td className="text-right pr-0">
          {allowSetPrimary &&
            (token.is_primary ? (
              <Button transparent secondary disabled>
                {'Primary'}
              </Button>
            ) : (
              <Button
                transparent
                onClick={token.is_primary ? null : this.handleSetPrimary}
                disabled={isLoading}
              >
                {'Set as primary'}
              </Button>
            ))}
          {token.show_deactivated_warning && (
            <Link
              to="/import-contacts?importing=false"
              className="btn btn-link"
            >
              Reconnect
            </Link>
          )}
          <Button
            transparent
            danger
            onClick={this.handleRevoke}
            disabled={isLoading}
          >
            Remove
          </Button>
        </td>
      </tr>
    )
  }
}

const mapStateToProps = state => ({
  ...state.user,
})

export default connect(
  mapStateToProps,
  { showGoogleWarning, updateUser }
)(GmailAccountRow)

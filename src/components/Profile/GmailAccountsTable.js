import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'reactstrap'

import { setPrimaryToken, revokeToken } from 'intropath-core/actions/user'
import GmailAccountRow from './GmailAccountRow'
import { Button } from 'components/shared'
import history from 'utils/history'

class GmailAccountsTable extends Component {
  constructor() {
    super()
    this.state = {
      connectBtnText: 'Connect Gmail',
    }
  }

  updateText() {
    if (window.innerWidth < 786) {
      this.setState({ connectBtnText: 'Connect' })
    }
  }

  onConnectClick = e => {
    e.preventDefault()
    history.push('/import-contacts?importing=true')
  }

  componentDidMount() {
    this.updateText()
    window.addEventListener('resize', this.updateText.bind(this))
  }

  render() {
    const { user, tokens, setPrimaryToken, revokeToken } = this.props
    const allowSetPrimary = tokens.length > 1

    return (
      <Row>
        <Col lg={12}>
          <table className="table gmail-accounts-table mb-0">
            <thead>
              <tr>
                <th style={{ textAlign: 'left', verticalAlign: 'middle' }}>
                  Connected Gmail Accounts
                </th>
                <th className="text-right pr-0">
                  <Button small alt="true" onClick={this.onConnectClick}>
                    {this.state.connectBtnText}
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {tokens.map(token => (
                <GmailAccountRow
                  key={token.id}
                  user={user}
                  token={token}
                  allowSetPrimary={allowSetPrimary}
                  setPrimaryToken={setPrimaryToken}
                  revokeToken={revokeToken}
                />
              ))}
            </tbody>
            {allowSetPrimary && (
              <tfoot>
                <tr>
                  <td colSpan={2}>
                    <small>
                      * Setting a primary account will make it the default
                      account to be used when sending intro emails, disregarding
                      the actual account from which the contacts involved were
                      imported from.
                    </small>
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
          {tokens.length > 0 && <hr style={{ margin: 0 }} />}
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.profile,
  tokens: state.user.profile.tokens,
})

export default connect(
  mapStateToProps,
  { setPrimaryToken, revokeToken }
)(GmailAccountsTable)

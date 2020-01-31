import React from 'react'
import { Row, Col } from 'reactstrap'
import { connect } from 'react-redux'
import styled from 'styled-components'
import media from 'utils/styledMediaQueryFix'

import Cards from './Cards'
import RecentIntros from './RecentIntros'
import LatestActivity from './LatestActivity'
import { Heading, Button } from 'components/shared'
import ConfirmationAlert from 'components/auth/ConfirmationAlert'
import { checkUserTokens } from 'utils/checkGoogleAccount'
import { getItem } from 'utils/storage'
import { fetchUser } from 'intropath-core/actions/user'

const Background = styled(Col)`
  ${media.lessThan('large')`
    margin-bottom: 10px;
  `}
`

class OverviewPage extends React.Component {
  componentWillMount() {
    const { deleting, history, fetchUser } = this.props
    if (deleting) history.push('/recover')

    const user = getItem('user')
    if (user) fetchUser(user.id)
  }

  onStartIntroClick = () => {
    const { user, history } = this.props
    checkUserTokens(user.tokens, history, '/introductions/new')
  }

  render() {
    const { introductions, contacts, loaded } = this.props

    return (
      <div>
        <ConfirmationAlert />
        <Heading.HeaderAction text="Overview">
          <Button full onClick={this.onStartIntroClick}>
            Make an intro
          </Button>
        </Heading.HeaderAction>

        {!loaded && <span>Loading...</span>}
        {loaded && (
          <div>
            <Cards
              numberOfContacts={contacts.length}
              {...{ introductions }}
              onClick={this.onStartIntroClick}
            />

            <Row style={{ marginTop: 5 }}>
              <Background lg={7}>
                <RecentIntros {...{ introductions }} />
              </Background>
              <Col lg={5}>{loaded && <LatestActivity />}</Col>
            </Row>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    authenticated: state.auth.authenticated,
    deleting: state.auth.deleting,
    introductions: state.introduction.list,
    contacts: state.contacts.list,
    loaded: state.introduction.loaded && state.contacts.loaded,
  }
}

export default connect(
  mapStateToProps,
  { fetchUser }
)(OverviewPage)

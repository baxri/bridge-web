import React from 'react'
import { connect } from 'react-redux'
import qs from 'query-string'
import { Route, Switch } from 'react-router-dom'
import { When } from 'react-if'

import { resetErrorMessage } from 'intropath-core/actions/introduction'
import { setIntroductionFilter, resetIntroductionFilter } from 'actions/filter'
import { Heading, Button } from 'components/shared'
import Filter from './Filter'
import Search from './Search'
import ListIntros from './ListIntros'
import { IntroductionsWrapper as Wrapper, Index, SideView } from './styled'

import Introduction from 'components/introductions/show'
import PublishIntro from 'components/introductions/publish'
import ConfirmationAlert from 'components/auth/ConfirmationAlert'
import { checkUserTokens } from 'utils/checkGoogleAccount'

class Introductions extends React.PureComponent {
  componentWillMount() {
    this.props.resetIntroductionFilter()
    this.setFilterFromParams()
  }

  componentDidUpdate() {
    this.setFilterFromParams()
  }

  setFilterFromParams = () => {
    const { query, filter, page } = qs.parse(this.props.location.search)
    this.props.setIntroductionFilter({
      query: query || '',
      status: filter || 'all',
      page: page ? parseInt(page) : 1,
    })
  }

  isIndex = () => this.props.location.pathname === '/introductions'

  isNewIntroPage = () => this.props.location.pathname === '/introductions/new'

  sideViewClose = () => {
    if (window.confirm('Are you sure want to cancel this intro?'))
      this.props.history.push('/introductions')
  }

  searchBarShow = () => {
    const {
      filter,
      active,
      declined,
      completed,
      rated,
      archived,
      confirm,
      noreply,
    } = this.props

    if (
      (filter === 'active' && active === 0) ||
      (filter === 'confirm' && confirm === 0) ||
      (filter === 'noreply' && noreply === 0) ||
      (filter === 'rated' && rated === 0) ||
      (filter === 'declined' && declined === 0) ||
      (filter === 'completed' && completed === 0) ||
      (filter === 'archived' && archived === 0)
    ) {
      return false
    } else return true
  }

  onStartIntroClick = () => {
    const { user, history } = this.props
    checkUserTokens(user.tokens, history, '/introductions/new')
  }

  render() {
    const {
      location: { pathname },
      numberOfIntros,
      loaded,
    } = this.props

    return (
      <Wrapper>
        <Index pathname={pathname} isIndex={this.isIndex()}>
          <ConfirmationAlert />
          <Heading.HeaderAction text="Your Intros">
            <Button full onClick={this.onStartIntroClick}>
              Make an intro
            </Button>
          </Heading.HeaderAction>

          {!loaded && <span>Loading...</span>}

          {loaded && numberOfIntros === 0 && (
            <span>Click on the Make an intro button to get started</span>
          )}

          {!this.isNewIntroPage() && loaded && numberOfIntros > 0 && (
            <div>
              <Filter intros={this.props.intros} />
              {this.searchBarShow() && <Search />}
              <ListIntros numberOfIntros={numberOfIntros} />
            </div>
          )}
        </Index>

        <When condition={!this.isIndex()}>
          <SideView pathname={pathname}>
            <Switch>
              <Route
                path="/introductions/:introId/publish"
                component={PublishIntro}
              />
              <Route path="/introductions/:introId" component={Introduction} />
            </Switch>
          </SideView>
        </When>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => {
  return {
    numberOfIntros: state.introduction.list.length,
    loaded: state.introduction.loaded,
    intros: state.introduction.list,
    filter: state.filter.introduction.status,
    active: state.count.intros.active,
    confirm: state.count.intros.confirm,
    noreply: state.count.intros.noreply,
    completed: state.count.intros.completed,
    rated: state.count.intros.rated,
    declined: state.count.intros.declined,
    archived: state.count.intros.archived,
    user: state.auth.user,
  }
}

export default connect(
  mapStateToProps,
  {
    resetErrorMessage,
    setIntroductionFilter,
    resetIntroductionFilter,
  }
)(Introductions)

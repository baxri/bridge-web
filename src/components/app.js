import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Col } from 'reactstrap'
import { withSnackbar } from 'notistack'
import { compose } from 'redux'
import { keys } from 'lodash'

import FooterTemplate from 'components/layout/footer'
import Nav from 'components/layout/nav'
import Navbar from 'components/layout/Navbar'
import Sidenav from 'components/layout/Sidenav'
import NoAuthNav from 'components/layout/NoAuthNav'
import { isNewUnloggedDesign } from 'utils/newDesign'
import { MixpanelContext } from 'utils/mixpanelContext'
import { LoadingData as Spinner } from 'components/shared'
import 'bootstrap/dist/css/bootstrap.min.css'

import { fetchIntrosCount } from 'intropath-core/actions/counts'
import { RELOAD_TIME } from 'utils/cache'
import { updateAllData } from 'intropath-core/actions/update'
import { syncContacts } from 'intropath-core/actions/contacts'
import { getActivities } from 'intropath-core/actions/activity'
import { showGoogleWarning } from 'intropath-core/actions/user'
import { StyledApp, Wrapper, Content } from './styled'
import GoogleNotConnected from 'components/google'

class App extends Component {
  constructor(props) {
    super(props)

    if (navigator.cookieEnabled) {
      this.noCache = !(
        keys(localStorage).includes('/contacts_compressed') &&
        keys(localStorage).includes('/introductions_compressed')
      )
    }

    this.state = {
      loading: this.noCache,
    }

    this.footerExcludes = ['/introductions/new', '/import-contacts']
  }

  static propsTypes = {
    location: PropTypes.object,
  }

  static contextType = MixpanelContext

  componentWillMount() {
    if (navigator.cookieEnabled) {
      this.fetchAllData()
      this.reloadInterval = setInterval(this.fetchAllData, RELOAD_TIME)
    } else {
      this.props.enqueueSnackbar(
        <h6 className="mb-0">
          Cookies are not enabled on your browser. please enable cookies in your
          browser preferences to continue.
        </h6>,
        {
          variant: 'error',
          persist: true,
        }
      )
    }
  }

  componentWillUnmount() {
    clearInterval(this.reloadInterval)
    window.removeEventListener('focus', this.onPageFocused)
  }

  componentDidMount() {
    window.addEventListener('focus', this.onPageFocused)
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged(this.props, prevProps)
    }

    if (this.props.fullFetch && !prevProps.fullFetch) {
      this.props.enqueueSnackbar(
        'Full update. It can take several seconds for the first time.'
      )
    }

    if (this.props.authenticated) {
      const { pathname } = this.props.location
      const syncRoutes = [
        '/',
        '/contacts',
        '/introductions/new',
        '/introductions',
      ]
      if (
        pathname !== prevProps.location.pathname &&
        syncRoutes.includes(pathname)
      ) {
        this.syncContactsAndFetchAllData()
      }

      if (prevProps.user === null && this.props.user !== null) {
        this.fetchAllData()
      }
    }
  }

  onPageFocused = () => {
    this.syncContactsAndFetchAllData()
  }

  syncContactsAndFetchAllData = async () => {
    if (this.props.authenticated) {
      try {
        if (await this.props.syncContacts()) {
          setTimeout(this.fetchAllData, 10000)
          this.props.showGoogleWarning(false)
        }
      } catch (error) {
        this.props.showGoogleWarning(true)
      }
    }
  }

  onRouteChanged(props, prevProps) {
    const { user } = this.props
    const user_id = user ? user.id : ''
    this.context.mixpanel.identify(user_id)
    this.context.mixpanel.track('NAVIGATED_TO', {
      PreviousScreen: prevProps.location.pathname,
      Screen: props.location.pathname,
      UserId: user_id,
    })
  }

  waitForDataToLoad() {
    const { pathname: path } = this.props.location
    return path === '/' || path === '/introductions' || path === '/contacts'
  }

  noAuthRequired() {
    const { pathname: path } = this.props.location
    return (
      path.includes('accept') ||
      path.includes('confirm') ||
      path.includes('new-by-share') ||
      path.includes('rate') ||
      path.includes('rating-message') ||
      path.includes('recover') ||
      path.includes('cancel') ||
      path.includes('reject') ||
      path.includes('cancel_by_owner') ||
      path.includes('reset-password')
    )
  }

  canceledByOwner() {
    const { pathname: path } = this.props.location
    return path.includes('cancel_by_owner')
  }

  shouldFetchAllData() {
    return this.noAuthRequired()
  }

  fetchAllData = () => {
    if (
      this.props.authenticated &&
      (this.canceledByOwner() || !this.shouldFetchAllData())
    ) {
      if (!this.noCache) {
        // when fetchAllData is not the first time
        this.props.enqueueSnackbar('Loading...')
        this.props.fetchIntrosCount({
          query: this.props.query,
        })
        this.props.getActivities()
      }

      this.props
        .updateAllData(false, true)
        .then(() => this.setState({ loading: false }))
        .catch(() => this.setState({ loading: false }))
    }
  }

  renderNav() {
    const path = this.props.location.pathname
    const isNoAuthPage = ''
    if (isNewUnloggedDesign(path)) return

    if (this.noAuthRequired()) {
      const { pathname: path } = this.props.location
      const recover_path = path.includes('recover')

      return <NoAuthNav recover_path={recover_path} />
    } else {
      return isNoAuthPage ? <Nav /> : <Navbar />
    }
  }

  renderContent() {
    const {
      location: { pathname },
      authenticated,
    } = this.props
    const isFull =
      this.footerExcludes.includes(pathname) || this.noAuthRequired()

    if (isNewUnloggedDesign(pathname)) {
      return this.props.children
    } else if (
      authenticated &&
      this.state.loading &&
      this.waitForDataToLoad()
    ) {
      return <Spinner loading={true} />
    } else {
      return (
        <Wrapper className="row">
          {!isFull && (
            <Col lg={2}>
              {!this.noAuthRequired() && <Sidenav {...this.props} />}
            </Col>
          )}

          <Content lg={isFull ? 12 : 10} pathname={pathname}>
            <GoogleNotConnected />
            {this.props.children}
          </Content>
        </Wrapper>
      )
    }
  }

  render() {
    const { pathname } = this.props.location
    const isNewUnloggedDesign =
      pathname.includes('login') ||
      pathname.includes('forgot-password') ||
      pathname.includes('register')
    let appClass = 'app-container'
    const tankYouPage =
      pathname.includes('confirmation-success') ||
      pathname.includes('accept') ||
      pathname.includes('cancel') ||
      pathname.includes('reject') ||
      pathname.includes('rating-message')
    if (tankYouPage) {
      appClass = 'app-container thank-you-page'
    } else if (isNewUnloggedDesign) {
      appClass = 'container app-container'
    }

    return (
      <StyledApp>
        {this.renderNav()}

        <div className={appClass}>{this.renderContent()}</div>

        {!this.footerExcludes.includes(pathname) &&
          !pathname.includes('/confirm') && <FooterTemplate />}
      </StyledApp>
    )
  }
}

const mapStateToProps = ({
  auth,
  filter,
  introduction: { fullFetch },
  contacts: { fullFetch: contactsFullFetch },
}) => ({
  authenticated: auth.authenticated,
  user: auth.user,
  query: filter.introduction.query,
  fullFetch: fullFetch || contactsFullFetch,
})

const enhance = compose(
  withSnackbar,
  withRouter,
  connect(
    mapStateToProps,
    {
      updateAllData,
      syncContacts,
      fetchIntrosCount,
      getActivities,
      showGoogleWarning,
    }
  )
)

export default enhance(App)

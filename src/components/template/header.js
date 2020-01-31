import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import history from '../../utils/history'
import { AuthPages } from '../../Constants/AuthPages'

class HeaderTemplate extends Component {
  state = { path: '' }

  componentDidMount() {
    this.unlisten = history.listen(location => {
      this.setState({ path: location.pathname })
    })

    this.setState({ path: history.location.pathname })
  }

  componentWillUnmount() {
    this.unlisten && this.unlisten()
  }

  renderLinks() {
    const { path } = this.state

    if (this.props.authenticated) {
      if (this.props.deleting) {
        return [
          <li key={4 + 'header'}>
            <Link className="logo" to="/logout">
              Logout
            </Link>
          </li>,
        ]
      } else {
        return [
          <li key={0 + 'header'}>
            <Link className="logo" to="/search">
              Search
            </Link>
          </li>,
          <li key={1 + 'header'}>
            <Link className="logo" to="/introductions">
              Intros
            </Link>
          </li>,
          <li key={2 + 'header'}>
            <Link className="logo" to="/contacts">
              Contacts
            </Link>
          </li>,
          <li key={3 + 'header'}>
            <Link className="logo" to="/profile">
              Profile
            </Link>
          </li>,
          <li key={4 + 'header'}>
            <Link className="logo" to="/logout">
              Logout
            </Link>
          </li>,
        ]
      }
    } else {
      return [
        // Unauthenticated navigation
        path === '/login' ? null : (
          <li key={1}>
            <Link className="logo" to="/login">
              Log In
            </Link>
          </li>
        ),
        path === '/register' ? null : (
          <li key={2}>
            <Link className="logo" to="/register">
              Sign Up
            </Link>
          </li>
        ),
      ]
    }
  }

  render() {
    const auth_pages = AuthPages.includes(this.props.current_path)
    return (
      <nav className="nav-confirm">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#nav-collapse"
            >
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            {!auth_pages && (
              <Link className="logo" to="/">
                BRIDGE
              </Link>
            )}
          </div>

          <div className="collapse navbar-collapse" id="nav-collapse">
            <ul className="nav navbar-nav navbar-right">
              {!auth_pages && this.renderLinks()}
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    deleting: state.auth.deleting,
  }
}

export default connect(mapStateToProps)(HeaderTemplate)

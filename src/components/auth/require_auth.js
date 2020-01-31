import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export default function(ComposedComponent) {
  class Authentication extends Component {
    static propTypes = {
      history: PropTypes.object,
    }

    componentDidMount() {
      this.authenticate(this.props)
    }

    componentWillUpdate(nextProps) {
      this.authenticate(nextProps)
    }

    authenticate(props) {
      const { history } = this.props
      if (!props.authenticated) {
        if (history.location.pathname === '/') {
          window.location = '/home.html'
        } else {
          history.push(`/login?return_to=${history.location.pathname}`)
        }
      } else if (props.deleting) {
        history.push('/recover')
      }
    }

    render() {
      const { authenticated, ...props } = this.props
      return authenticated ? <ComposedComponent {...props} /> : null
    }
  }

  function mapStateToProps(state) {
    return { ...state.auth }
  }

  return connect(mapStateToProps)(Authentication)
}

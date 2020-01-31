import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Nav extends Component {
  render() {
    return (
      <nav className="nav-confirm">
        <div className="container">
          <div className="row">
            <div className="col-xs-6">
              <Link className="current-parent logo" to="/">
                BRIDGE
              </Link>
            </div>
            <div className="col-xs-6" />
          </div>
        </div>
      </nav>
    )
  }
}

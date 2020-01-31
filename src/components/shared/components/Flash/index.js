import React, { Component } from 'react'

export default class Flash extends Component {
  render() {
    const isError = this.props.type === 'error'
    const styleType = isError ? 'danger' : 'success'
    return (
      <div className={'alert alert-' + styleType}>
        {this.props.clearMessage && (
          <button className="close" onClick={this.props.clearMessage}>
            x
          </button>
        )}
        <strong>{isError ? 'Oops!' : 'Success!'}</strong> {this.props.message}
      </div>
    )
  }
}

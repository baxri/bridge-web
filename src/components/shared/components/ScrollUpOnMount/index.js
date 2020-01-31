import React from 'react'

class ScrollUpOnMount extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return null
  }
}

export default ScrollUpOnMount

import React from 'react'
import { connect } from 'react-redux'

import { fetchOverviewCount } from 'intropath-core/actions/counts'
import HasIntros from './cards/HasIntros'
import IntrosEmpty from './cards/IntrosEmpty'

class Cards extends React.PureComponent {
  componentDidMount() {
    this.props.fetchOverviewCount()
  }

  render() {
    const { all, ...rest } = this.props

    if (rest.loading) return 'loading...'

    return (
      <div>
        {all > 0 && <HasIntros {...rest} />}

        {all === 0 && <IntrosEmpty {...rest} />}
      </div>
    )
  }
}

const mapStateToProps = ({ count: { overview: state } }) => state

export default connect(
  mapStateToProps,
  { fetchOverviewCount }
)(Cards)

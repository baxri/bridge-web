import React from 'react'
import styled from 'styled-components'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { TabItem } from 'components/shared'
import { merge } from 'utils/queryString'
import { fetchIntrosCount } from 'intropath-core/actions/counts'
import { RELOAD_TIME } from 'utils/cache'
import { introsConfirmedAsBroker } from 'utils/intros'

const FilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #dfe1e7;
`

class Filter extends React.Component {
  componentDidMount() {
    this.fetchCount()

    this.fetchCountInterval = setInterval(this.fetchCount, RELOAD_TIME)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.fetchCount()
    }
  }

  componentWillUnmount() {
    clearInterval(this.fetchCountInterval)
  }

  setActive = status => () => {
    this.props.history.push({
      pathname: '/introductions',
      search: merge('', { filter: status, query: this.props.query }),
    })
  }

  fetchCount = () => {
    this.props.fetchIntrosCount({
      query: this.props.query,
    })
  }

  render() {
    const { isActive, count, intros } = this.props

    return (
      <FilterWrapper>
        <div>
          <TabItem
            label={`All (${count.all})`}
            active={isActive('all')}
            onClick={this.setActive('all')}
          />

          <TabItem
            label={`Received (${count.received})`}
            active={isActive('received')}
            onClick={this.setActive('received')}
          />
          <TabItem
            label={`Active (${count.active})`}
            active={isActive('active')}
            onClick={this.setActive('active')}
          />
          <TabItem
            label={`To Do (${introsConfirmedAsBroker(intros)})`}
            active={isActive('confirm')}
            onClick={this.setActive('confirm')}
          />
          <TabItem
            label={`No Reply (${count.noreply})`}
            active={isActive('noreply')}
            onClick={this.setActive('noreply')}
          />
          <TabItem
            label={`Done (${count.completed})`}
            active={isActive('completed')}
            onClick={this.setActive('completed')}
          />
          <TabItem
            label={`Rated (${count.rated})`}
            active={isActive('rated')}
            onClick={this.setActive('rated')}
          />
          <TabItem
            label={`Declined (${count.declined})`}
            active={isActive('declined')}
            onClick={this.setActive('declined')}
          />
        </div>
        <div>
          <TabItem
            label={`Archived (${count.archived})`}
            active={isActive('archived')}
            onClick={this.setActive('archived')}
          />
        </div>
      </FilterWrapper>
    )
  }
}

const mapStateToProps = ({ filter: { introduction: filter }, count }) => ({
  isActive: status => filter.status === status,
  count: count.intros,
  query: filter.query,
})

const enhance = compose(
  withRouter,
  connect(
    mapStateToProps,
    { fetchIntrosCount }
  )
)

export default enhance(Filter)

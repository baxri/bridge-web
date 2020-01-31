import React from 'react'
import styled from 'styled-components'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { TabItem } from 'components/shared'
import { merge } from 'utils/queryString'
import { searchFilter } from 'utils/filterIntros'

const FilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #dfe1e7;
`
const FilterIntros = ({ setActive, isActive, count }) => (
  <FilterWrapper>
    <div>
      <TabItem
        label={`Active (${count.active})`}
        active={isActive('active')}
        onClick={setActive('active')}
      />
      <TabItem
        label={`To Do (${count.confirm})`}
        active={isActive('confirm')}
        onClick={setActive('confirm')}
      />
      <TabItem
        label={`No Reply (${count.noreply})`}
        active={isActive('noreply')}
        onClick={setActive('noreply')}
      />
      <TabItem
        label={`Done (${count.completed})`}
        active={isActive('completed')}
        onClick={setActive('completed')}
      />
      <TabItem
        label={`Declined (${count.declined})`}
        active={isActive('declined')}
        onClick={setActive('declined')}
      />
    </div>
    <div>
      <TabItem
        label={`Archived (${count.archived})`}
        active={isActive('archived')}
        onClick={setActive('archived')}
      />
    </div>
  </FilterWrapper>
)
const mapStateToProps = (state, props) => {
  const { filter } = state
  return {
    isActive: status => filter.contact.status === status,
    count: {
      active: searchFilter(props.intros, {
        ...filter.contact,
        status: 'active',
      }).length,
      confirm: searchFilter(props.intros, {
        ...filter.contact,
        status: 'confirm',
      }).length,
      noreply: searchFilter(props.intros, {
        ...filter.contact,
        status: 'noreply',
      }).length,
      completed: searchFilter(props.intros, {
        ...filter.contact,
        status: 'completed',
      }).length,
      declined: searchFilter(props.intros, {
        ...filter.contact,
        status: 'declined',
      }).length,
      archived: searchFilter(props.intros, {
        ...filter.contact,
        status: 'archived',
      }).length,
    },
    setActive: status => () => {
      props.history.push({
        pathname: props.location.pathname,
        search: merge(props.location.search, { filter: status, page: 1 }),
      })
    },
  }
}

const enhance = compose(
  withRouter,
  connect(mapStateToProps)
)

export default enhance(FilterIntros)

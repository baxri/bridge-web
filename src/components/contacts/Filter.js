import React from 'react'
import styled from 'styled-components'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { TabItem } from 'components/shared'
import { merge } from 'utils/queryString'

const FilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const ContactsFilter = ({ query, setActive, isActive, count }) => (
  <FilterWrapper>
    <div>
      {query.length > 0 && (
        <TabItem label={`Search results`} active={false} onClick={() => {}} />
      )}
      {query.length < 1 && count.recent > 0 && (
        <TabItem
          label={`Recent (${count.recent})`}
          active={isActive('recent')}
          onClick={setActive('recent')}
        />
      )}
      {query.length < 1 && count.frequent > 0 && (
        <TabItem
          label={`Frequent (${count.frequent})`}
          active={isActive('frequent')}
          onClick={setActive('frequent')}
        />
      )}
      {query.length < 1 && (
        <TabItem
          label={`All (${count.all})`}
          active={count.recent === 0 || isActive('all')}
          onClick={setActive('all')}
        />
      )}
    </div>
  </FilterWrapper>
)

const mapStateToProps = (
  { filter },
  { history, location, recentContacts, frequentContacts, allContacts }
) => {
  return {
    query: filter.contact.query ? filter.contact.query.trim() : '',
    isActive: status => filter.contact.status === status,
    count: {
      recent: recentContacts.length,
      frequent: frequentContacts.length,
      all: allContacts.length,
    },
    setActive: status => () => {
      history.push({
        pathname: '/contacts',
        search: merge('', { filter: status }),
      })
    },
  }
}

const enhance = compose(
  withRouter,
  connect(mapStateToProps)
)

export default enhance(ContactsFilter)

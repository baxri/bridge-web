import React from 'react'
import { Link } from 'react-router-dom'
import ContactsTable from './ContactsTable'
import qs from 'query-string'
import { connect } from 'react-redux'
import { orderBy, keyBy } from 'lodash'

import computeContactsFromIntros from 'components/shared/computeContactsFromIntros'
import { setContactFilter, resetContactFilter } from 'actions/filter'
import { Heading } from 'components/shared'
import ContactSearch from './ContactSearch'
import Filter from './Filter'

const getContactKey = (name, email) => `${name}-${email}`

class Contacts extends React.Component {
  componentWillMount() {
    this.props.resetContactFilter()
    this.setFilterFromParams()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      this.setFilterFromParams()
    }
  }

  setFilterFromParams = () => {
    const { query, filter, page } = qs.parse(this.props.location.search)
    this.props.setContactFilter({
      query: query || '',
      status: filter || 'recent',
      page: page ? parseInt(page) : 1,
    })
  }

  render() {
    const { query } = qs.parse(this.props.location.search)
    const {
      contactsLoaded,
      introsLoaded,
      filter,
      items,
      frequentContacts,
      allContacts,
      computedContacts,
    } = this.props

    if (!contactsLoaded || !introsLoaded) {
      return (
        <header>
          <Heading.HeaderAction text="Contacts" />
          <div style={{ marginTop: '30px', marginBottom: '20px' }}>
            <p className="table-heading">Loading...</p>
          </div>
        </header>
      )
    }

    let contacts = allContacts
    if (query && query.trim().length > 0) {
      contacts = computedContacts
    } else if (items.length > 0 && filter === 'recent') {
      contacts = items
    } else if (frequentContacts.length > 0 && filter === 'frequent') {
      contacts = frequentContacts
    }

    return (
      <div className="page intro">
        <div>
          {this.renderHeader()}
          {!!allContacts.length && <ContactSearch />}
          <Filter
            recentContacts={items}
            frequentContacts={frequentContacts}
            allContacts={allContacts}
          />
          {!!allContacts.length && <ContactsTable list={contacts} />}
        </div>
      </div>
    )
  }

  renderHeader() {
    const { allContacts } = this.props
    return (
      <header>
        <Heading.HeaderAction text="Contacts" />
        {allContacts.length === 0 && (
          <div style={{ marginTop: '10px', marginBottom: '20px' }}>
            <p className="table-heading">
              <div>
                <Link to="/import-contacts?importing=true">
                  Import your contacts
                </Link>
                <span> to make creating intros a breeze</span>
              </div>
            </p>
          </div>
        )}
      </header>
    )
  }
}

const mapStateToProps = (state, props) => {
  const intros = state.introduction.list
  const contacts = state.contacts.list

  const contactsByKey = keyBy(contacts, ({ name, email }) => {
    return getContactKey(name, email)
  })

  const contact_filters = qs.parse(props.location.search)

  const computedContacts = computeContactsFromIntros(
    contactsByKey,
    intros,
    contact_filters
  )

  const contactsInvolvedInIntros = computedContacts.filter(
    c => c.introductions_count
  )

  const sortedContacts = orderBy(
    contactsInvolvedInIntros,
    ['mostRecentIntroTime'],
    ['desc']
  )

  const frequentContacts = orderBy(
    contactsInvolvedInIntros,
    ['introductions_count'],
    ['desc']
  )

  return {
    data: { contacts: sortedContacts },
    items: sortedContacts,
    frequentContacts: frequentContacts,
    allContacts: contacts,
    computedContacts: computedContacts,
    contactsLoaded: state.contacts.loaded,
    introsLoaded: state.introduction.loaded,
    filter: state.filter.contact.status,
  }
}

export default connect(
  mapStateToProps,
  { setContactFilter, resetContactFilter }
)(Contacts)

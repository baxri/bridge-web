import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Row, Col } from 'reactstrap'
import styled from 'styled-components'

import { merge, parse } from 'utils/queryString'
import { setContactFilter } from 'actions/filter'
import { SearchInput } from 'components/shared'

const Container = styled(Row)`
  margin-top: 5px;
  margin-bottom: 15px;
`

class ContactSearch extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      query: props.query || '',
      tooltipOpen: false,
    }
  }

  onChange = event => {
    this.setState({ query: event.target.value })
  }

  onKeyPress = event => {
    if (event.key === 'Enter') this.searchContact()
  }

  searchContact = () => {
    const { query } = this.state
    this.props.history.push({
      pathname: '/contacts',
      search: merge(this.props.location.search, { query, page: 1 }),
    })

    const { filter, page } = parse(this.props.location.search)
    setContactFilter({
      query: query || '',
      status: filter || 'active',
      page: page ? parseInt(page) : 1,
    })
  }

  render() {
    return (
      <Container>
        <Col lg={6} xs={12}>
          <SearchInput
            value={this.state.query}
            onChange={this.onChange}
            onKeyPress={this.onKeyPress}
            onFocus={() => this.setState({ tooltipOpen: true })}
            onBlur={() => this.setState({ tooltipOpen: false })}
            onIconClick={this.searchContact}
            keepTooltipOpen={this.state.tooltipOpen}
            id="search-contacts"
          />
        </Col>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  query: state.filter.contact.query,
})

const enhance = compose(
  withRouter,
  connect(mapStateToProps)
)

export default enhance(ContactSearch)

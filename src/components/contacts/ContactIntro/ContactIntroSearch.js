import React from 'react'
import { Row, Col } from 'reactstrap'
import styled from 'styled-components'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { SearchInput } from 'components/shared'
import { merge } from 'utils/queryString'

const Container = styled(Row)`
  margin-top: 15px;
  margin-bottom: 15px;
`

class ContactIntroSearch extends React.Component {
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
    if (event.key === 'Enter') this.updateIntros()
  }

  updateIntros = () => {
    const { query } = this.state
    const path = this.props.location.pathname
    this.props.history.push({
      pathname: path,
      search: merge(this.props.location.search, { query, page: 1 }),
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
            onIconClick={this.updateIntros}
            keepTooltipOpen={this.state.tooltipOpen}
            id="search-intros"
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

export default enhance(ContactIntroSearch)

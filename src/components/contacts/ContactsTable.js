import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import pagination from 'paginate-array'
import { Row, Col } from 'reactstrap'
import styled from 'styled-components'
import { compose } from 'redux'

import { Paginate } from 'components/shared'
import { setContactFilter, resetContactFilter } from 'actions/filter'
import ContactRow from 'components/contacts/ContactRow'

const Wrapper = styled.div`
  padding: 30px 15px;
  font-size: 16px;
  text-align: center;
`

class ContactsTable extends React.Component {
  render() {
    const { data, currentPage, total, totalPages } = this.props

    return (
      <Row>
        <Col lg={12} xs={12} className="col-centered">
          <div className="col-centered">
            {data.length > 0 && (
              <div className="board">
                <table className="table table-sm table-text-center table-with-column-header">
                  <tbody>
                    {data.map((item, index) => (
                      <ContactRow {...{ ...item, index, key: item.id }} />
                    ))}
                  </tbody>
                </table>
                {total > 10 && (
                  <Paginate
                    pageUrl={'/contacts'}
                    currentPage={currentPage}
                    total={total}
                    totalPages={totalPages}
                  />
                )}
              </div>
            )}
            {!data.length && <Wrapper>No Contacts Found</Wrapper>}
          </div>
        </Col>
      </Row>
    )
  }
}

ContactsTable.defaultProps = {
  list: [],
}

const mapStateToProps = (state, props) => {
  return {
    ...pagination(
      props.list,
      state.filter.contact.page,
      state.filter.contact.perPage
    ),
  }
}

const enhance = compose(
  withRouter,
  connect(
    mapStateToProps,
    { setContactFilter, resetContactFilter }
  )
)

export default enhance(ContactsTable)

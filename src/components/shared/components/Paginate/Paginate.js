import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { compose } from 'redux'

import { merge } from 'utils/queryString'

const Container = styled(Pagination)`
  display: flex;
  justify-content: center;
  margin: 15px 0;
`

const Paginate = ({ pageUrl, totalPages, currentPage, linkTo }) => {
  const currentPageIndex = currentPage - 1
  const pages = [...Array(totalPages).keys()].filter(
    page => page >= currentPageIndex - 3 && page <= currentPageIndex + 3
  )
  const showPreEllipsis = pages.length > 0 && pages[0] !== 0
  const showPostEllipsis =
    pages.length > 0 && pages[pages.length - 1] !== totalPages - 1
  return (
    <Container>
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink
          previous
          tag={Link}
          to={linkTo(pageUrl, currentPage - 1)}
        />
      </PaginationItem>
      {showPreEllipsis && (
        <PaginationItem disabled key={'preEllipsis'} active={false}>
          <PaginationLink>...</PaginationLink>
        </PaginationItem>
      )}
      {pages.map(page => (
        <PaginationItem
          key={`page-${page + 1}`}
          active={currentPage === page + 1}
        >
          <PaginationLink tag={Link} to={linkTo(pageUrl, page + 1)}>
            {page + 1}
          </PaginationLink>
        </PaginationItem>
      ))}
      {showPostEllipsis && (
        <PaginationItem disabled key={'postEllipsis'} active={false}>
          <PaginationLink>...</PaginationLink>
        </PaginationItem>
      )}
      <PaginationItem disabled={currentPage === totalPages}>
        <PaginationLink next tag={Link} to={linkTo(pageUrl, currentPage + 1)} />
      </PaginationItem>
    </Container>
  )
}

const mapStateToProps = (state, { history, location }) => ({
  linkTo: (pageUrl, page) => ({
    pathname: pageUrl,
    search: merge(location.search, { page }),
  }),
})

const enhance = compose(
  withRouter,
  connect(mapStateToProps)
)

export default enhance(Paginate)

import React from 'react'
import { connect } from 'react-redux'
import pagination from 'paginate-array'
import styled from 'styled-components'
import media from 'utils/styledMediaQueryFix'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'

import { Intro, EmptyState } from 'components/shared'
import { searchFilter } from 'utils/filterIntros'
import { parse, stringify } from 'utils/queryString'
import { Paginate } from 'components/shared'

const Container = styled.div`
  ${media.lessThan('large')`
    margin-left: -15px;
    margin-right: -15px;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 15px;
  `}
`
class ListIntros extends React.Component {
  shouldComponentUpdate(nextProps) {
    return JSON.stringify(nextProps.data) !== JSON.stringify(this.props.data)
  }

  render() {
    const {
      data,
      currentPage,
      total,
      totalPages,
      onClick,
      intro_count,
      numberOfIntros,
    } = this.props

    return (
      <Container>
        {data.map(intro => (
          <Intro key={intro.id} {...intro} onClick={onClick} expanded={true} />
        ))}

        {intro_count < 1 && numberOfIntros < 1 && <EmptyState.Intro />}

        {total > 10 && (
          <Paginate
            pageUrl={'/introductions'}
            currentPage={currentPage}
            total={total}
            totalPages={totalPages}
          />
        )}
      </Container>
    )
  }
}

const mapStateToProps = (state, props) => {
  // Delete success query, but keep all other params (i.e. filter and page)
  const search = parse(props.location.search)
  delete search['success']
  return {
    intro_count: state.count.intros.all,
    ...pagination(
      searchFilter(state.introduction.list, state.filter.introduction),
      state.filter.introduction.page,
      state.filter.introduction.perPage
    ),
    onClick: id =>
      props.history.push({
        pathname: `/introductions/${id}`,
        search: stringify(search),
      }),
  }
}

const enhance = compose(
  withRouter,
  connect(mapStateToProps)
)

export default enhance(ListIntros)

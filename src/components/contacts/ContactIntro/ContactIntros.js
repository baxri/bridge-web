import React from 'react'
import { connect } from 'react-redux'
import pagination from 'paginate-array'
import styled from 'styled-components'
import media from 'utils/styledMediaQueryFix'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'

import { Intro } from 'components/shared'
import { searchFilter } from 'utils/filterIntros'
import { Paginate } from 'components/shared'
import ContactIntroSearch from '../ContactIntro/ContactIntroSearch'

const Container = styled.div`
  ${media.lessThan('large')`
    background-color: #EAEAEA;
    margin-left: -15px;
    margin-right: -15px;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 15px;
  `}
`
const Wrapper = styled.div`
  padding: 30px 15px;
  font-size: 16px;
  text-align: center;
`

const ContactIntros = ({
  data,
  currentPage,
  total,
  totalPages,
  onClick,
  path,
  intro_count,
}) => (
  <Container>
    {total > 0 && <ContactIntroSearch intros={data} />}

    {data.map(intro => (
      <Intro key={intro.id} {...intro} onClick={onClick} expanded={true} />
    ))}

    {intro_count < 1 && <Wrapper>No Such Intro Found</Wrapper>}

    {total > 10 && (
      <Paginate
        pageUrl={path}
        currentPage={currentPage}
        total={total}
        totalPages={totalPages}
      />
    )}
  </Container>
)

const mapStateToProps = (state, props) => {
  return {
    intro_count: state.count.intros.all,
    ...pagination(
      searchFilter(props.intros, state.filter.contact),
      state.filter.contact.page,
      state.filter.contact.perPage
    ),
    onClick: id => props.history.push(`/introductions/${id}`),
  }
}

const enhance = compose(
  withRouter,
  connect(mapStateToProps)
)

export default enhance(ContactIntros)

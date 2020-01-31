import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import media from 'utils/styledMediaQueryFix'

const Wrapper = styled.div`
  flex: 2;
  ${media.lessThan('large')`
    display: none;
  `}
`

const nameToShow = (role, broker) => (role === 'n1' ? broker : 'You')

const renderStatusMsg = ({ to, from, status, my_role, broker }) => {
  switch (status) {
    case 'initialized':
      return `Waiting on ${from} to approve the Intro`
    case 'confirmed':
      return `Waiting on ${nameToShow(my_role, broker)} to forward the intro`
    case 'canceled':
      return `Intro declined by ${from}`
    case 'delayed':
      return 'Needs review to continue'
    case 'published':
      return `Waiting on ${to} to accept the intro`
    case 'accepted':
      return 'Intro completed'
    case 'rejected':
      return `Intro declined by ${to}`
    case 'canceled_by_owner':
      return 'Intro canceled by You'
    default:
      return 'Done, Feedback successful'
  }
}

const IntroStatus = props => <Wrapper>{renderStatusMsg(props)}</Wrapper>

IntroStatus.propTypes = {
  status: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
}

export default IntroStatus

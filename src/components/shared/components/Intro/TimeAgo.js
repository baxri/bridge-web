import React from 'react'
import styled from 'styled-components'
import media from 'utils/styledMediaQueryFix'

import { TimeAgo } from 'components/shared'

const StyledTimeAgo = styled.div`
  flex: 2;
  max-width: 15%;
  ${media.lessThan('large')`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    padding: 3px;
    background-color: #F1F1F1;
    width: 18%;
    margin: 0 auto;
    border-radius: 0 0 5px 5px;
    color: #8D8C8D;
  `}

  ${media.lessThan('small')`
    max-width: 25%;
    width: 20%;
  `}
`

const TimeAgoComponent = ({ date }) => (
  <StyledTimeAgo>
    <TimeAgo date={date} />
  </StyledTimeAgo>
)

export default TimeAgoComponent

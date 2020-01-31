import React from 'react'
import styled from 'styled-components'
import media from 'utils/styledMediaQueryFix'

import { Icons } from 'components/shared'

const StyledIconState = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  max-width: 45px;

  & > svg {
    &:first-child {
      margin-right: 2px;
    }
    &:last-child {
      margin-left: 2px;
    }
  }

  ${media.lessThan('large')`
    max-width: 10%;
  `}
`

const IconState = ({ status }) => (
  <StyledIconState>
    {status === 'accepted' ? (
      <React.Fragment>
        <Icons.IntroThumbsUp status={status} />
        <Icons.IntroThumbsUp left status={status} />
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Icons.IntroArrowLeft status={status} />
        <Icons.IntroArrowRight status={status} />
      </React.Fragment>
    )}
  </StyledIconState>
)

export default IconState

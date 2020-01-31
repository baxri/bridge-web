import styled from 'styled-components'
import media from 'utils/styledMediaQueryFix'
import { Col } from 'reactstrap'

import { isSideView } from 'utils/newDesign'

export const StyledApp = styled.div`
  font-family: Rubik, sans-serif;
`

export const Wrapper = styled.div`
  padding-top: 10px;

  ${media.greaterThan('large')`
    margin: 0 !important;
  `}

  ${media.lessThan('large')`
    margin: 0 !important;
    padding: 0 !important;
  `}
`

export const Content = styled(Col)`
  ${props => isSideView(props.pathname) && 'position: initial;'}
`

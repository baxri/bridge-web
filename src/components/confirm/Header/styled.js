import styled from 'styled-components'
import * as gs from '../new-style'
import { colorMain } from '../new-style'
import { horizontalMargin } from '../new-style'
import { fontHeader } from '../new-style'
import { colorActive } from '../new-style'

export const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  height: 38px;
`

export const Title = styled.div`
  ${fontHeader};
  display: flex;
  align-items: center;
  margin-left: ${gs.horizontalMargin}px;
`

const StyledButton = styled.button`
  ${fontHeader};
  border: 0;
  background-color: transparent;
  color: ${colorActive};
  padding: 16px ${horizontalMargin}px;
  outline: none !important;
  :disabled {
    opacity: 0.1;
    color: ${colorMain};
  }
`

export const StyledRightButton = styled(StyledButton)`
  margin-left: auto;
`

export const StyledLeftButton = styled(StyledButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 5px 12px ${gs.horizontalMargin - 8}px;
  width: 48px;
  height: 60px;
  color: #d8d8d8;
  :hover {
    color: #aaa;
  }
`

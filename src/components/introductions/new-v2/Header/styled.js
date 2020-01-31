import styled from 'styled-components'
import * as gs from '../gmail-style'

export const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`

export const Title = styled.div`
  display: flex;
  align-items: center;
  ${gs.fontHeader};
`

const StyledButton = gs.HeaderButton

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

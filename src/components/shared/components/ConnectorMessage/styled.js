import styled from 'styled-components'
//import media from 'utils/styledMediaQueryFix'
import { colors } from 'components/theme'

export const ConnectorMessageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  text-align: left;
  color: #0d1531;
  margin: 10px;
`
export const AvatarWrapper = styled.div`
  flex: 1;
  margin-right: 10px;
`
export const MessageWrapper = styled.div`
  flex: 10;
`
export const Title = styled.div`
  font-size: 18px;
  line-height: 23px;
  margin-bottom: 10px;
`
export const Message = styled.div`
  border-radius: 0px 12px 12px 12px;
  background-color: #f1f4ff;
  font-size: 14px;
  line-height: 18px;
  padding: 8px 10px;
  margin-bottom: 10px;
  a {
    color: inherit;
    text-decoration: underline;
  }
`
export const Tip = styled.div`
  font-size: 12px;
  line-height: 15px;
  color: #82879c;
`

export const MakeChangesLink = styled.span`
  a {
    color: ${props => {
      return colors.primary
    }};
    text-decoration: none;
  }
`

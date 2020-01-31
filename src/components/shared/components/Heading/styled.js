import styled from 'styled-components'
import media from 'utils/styledMediaQueryFix'

import { Button } from 'components/shared'

export const H1 = styled.h1`
  font-size: 38px;
  ${media.lessThan('large')`
    display: ${props => (props.text === 'Overview' ? 'none' : 'block')};
  `}
`

export const H2 = styled.h2`
  font-size: 28px;
  margin: ${props => (props.margin ? props.margin : 'inherit')};
  text-align: center;

  ${media.lessThan('large')`
    font-size: 18px;
    font-weight: normal;
  `}
`

export const H3 = styled.h3`
  font-size: 24px;
  ${media.lessThan('large')`
    display: ${props => (props.text === 'Overview' ? 'none' : 'block')};
  `}
`

export const StyledCenterHeading = styled.div`
  max-width: 500;
  margin: auto;
  text-align: center;
`

export const StyledHeaderAction = styled.div`
  display: flex;
  padding: 15px 0;
  align-items: center;
  justify-content: space-between;
  ${media.lessThan('large')`
    display: block;

    a {
      width: 100%;
    }
  `}
`

export const StyledSideView = styled.div`
  /* display: flex;
  justify-content: space-between;
  align-items: center; */
  position: relative;
  border-bottom: 1px solid #e1e3e8;
  padding: 20px 15px;
  ${media.lessThan('large')`
    padding: 10px 15px;
  `}

  > button {
    position: absolute;
  }
`

export const StyledListHeading = styled.div`
  background-color: #f5f6f7;
  padding: 10px 15px;

  h4 {
    font-size: 18px;
    color: #92a4a8;
    font-weight: normal;
    margin: 0;
  }
`

export const StyledDateHeading = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px 15px;

  .line {
    width: 300px;
    height: 1px;
    background-color: #92a4a8;
  }

  h4 {
    flex-grow: 1;
    text-align: center;
    font-size: 14px;
    font-weight: normal;
    margin: 0 10px;
  }
`

export const StyledNotificationHeading = styled.div`
  position: relative;
  background-color: #047bfe;
  padding: 16px 32px 16px 16px;
  margin-bottom: 16px;

  h4 {
    font-size: 16px;
    color: #ffffff;
    font-weight: 100;
    margin: 0;
  }
`

export const ButtonMobile = styled(Button)`
  ${media.greaterThan('large')`
    display: none;
  `}
`

export const ButtonDesktop = styled(Button)`
  top: 20px;
  right: 15px;

  ${media.lessThan('large')`
    position: absolute;
    top: 3px;;
  `}
`

export const CloseButton = styled(Button)`
  border: none !important;
  background-color: transparent;
  height: 1.4em;
  padding: 0 !important;
  color: #92a4a8 !important;
  text-align: left !important;

  &:hover {
    background-color: transparent !important;
    color: #92a4a8 !important;
  }

  ${media.lessThan('large')`
    top: 6px;
  `}
`

export const CloseNotificationButton = styled(Button)`
  position: absolute;
  top: 8px;
  right: 16px;
  border: none;
  background-color: transparent !important;
  height: 1em;
  padding: 0 !important;
  color: #ffffff !important;
`

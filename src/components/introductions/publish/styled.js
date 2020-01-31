import styled, { createGlobalStyle } from 'styled-components'
import media from 'utils/styledMediaQueryFix'
import { Button } from 'components/shared'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-bottom: 2rem;

  ${media.greaterThan('large')`
    margin: auto;
    height: auto;
    min-width: 350px;
    max-width: 860px;
    border: none;
    box-shadow: 0px 0px 17px rgba(0,0,0,0.1);
    border-top-radius: 25px;
  `}

  ${media.lessThan('large')`
    margin-bottom: 4rem;
    height: auto;
  `}
`

// Confirmation Start
export const ConfirmationWrapper = styled.div`
  margin: 15px;
  margin-top: 50px;
  height: calc(100vh - 162px);
  display: flex;
  flex-direction: column;

  ${media.lessThan('large')`
    height: calc(100vh - 191px);
  `}
`

export const ConfirmationTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${media.greaterThan('large')`
    margin-top: 50px;
    margin-bottom: 20px;
  `}
`

export const ConfirmationMessageWrapper = styled.div`
  ${media.greaterThan('large')`
    margin-left: 90px;
  `}
`

export const StyledButton = styled(Button)`
  ${media.lessThan('large')`
    width: 100%;
  `}
`

export const GlobalStyle = createGlobalStyle`
  .app-container {
    min-height: auto !important;
  }
`

// Confirmation End

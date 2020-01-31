import React from 'react'
import styled from 'styled-components'
import media from 'utils/styledMediaQueryFix'

// TODO Fix topForNewIntroContainerInMobileView depending on if running locally or in producton
const isDevEnvironment = process.env.NODE_ENV === 'development'
const topForNewIntroContainerInMobileView = isDevEnvironment ? '-56px' : '0px'

const ConfirmContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;

  ${media.greaterThan('large')`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    align-content: flex-end;
    vertical-align: bottom;
    height: calc(100vh - 73px);
  `}

  ${media.lessThan('large')`
    position: absolute;
    top: ${topForNewIntroContainerInMobileView};
    left: 0;
    width: 100vw;
    //height: 100vh;
  `}
`

const ConfirmWindow = styled.div`
  background-color: white;
  position: relative;
  ${media.greaterThan('large')`
    min-height: 100%;
    width: 90%;
    min-width: 350px;
    max-width: 768px;
    border: none;
    margin: auto;

    ${props =>
      props.error
        ? 'margin-top: 2rem'
        : `
      box-shadow: 0px 0px 17px rgba(0,0,0,0.1);
    `}
  `}

  ${media.lessThan('large')`
    min-height: 100%;
    ${props => (props.error ? 'margin-top: 2rem' : '')}
  `}
`

export const ConfirmWrapper = ({ children, error }) => (
  <ConfirmContainer>
    <ConfirmWindow error={error}>{children}</ConfirmWindow>
  </ConfirmContainer>
)

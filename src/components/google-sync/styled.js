import React from 'react'
import styled from 'styled-components'
import { keyframes } from 'styled-components'
import media from 'utils/styledMediaQueryFix'

// TODO Fix topForGoogleSyncContainerInMobileView depending on if running locally or in producton
const isDevEnvironment = process.env.NODE_ENV === 'development'
const topForGoogleSyncContainerInMobileView = isDevEnvironment ? '-56px' : '0px'

const slideUp = keyframes`
  from {
    transform: translate(0, 100%);
  }

  to {
    transform: translate(0, 0);
  }
`

const slideLeft = keyframes`
  from {
    transform: translate(50%, 0);
  }

  to {
    transform: translate(0, 0);
  }
`

const GoogleSyncContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  height: 100vh;

  ${media.greaterThan('large')`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    align-content: flex-end;
    vertical-align: bottom;
  `}

  ${media.lessThan('large')`
    position: absolute;
    top: ${topForGoogleSyncContainerInMobileView};
    left: 0;
    width: 100vw;
  `}
`

const GoogleSyncWindow = styled.div`
  background-color: white;
  position: relative;
  ${media.greaterThan('large')`
    animation: ${slideUp} 0.5s 1;
    min-height: 100%;
    width: 90%;
    min-width: 350px;
    max-width: 768px;
    border: none;
    box-shadow: 0px 0px 17px rgba(0,0,0,0.1);
    margin: auto;
  `}

  ${media.lessThan('large')`
    animation: ${slideLeft} 0.5s 1;
    min-height: 100%;
  `}
`

export const GoogleSyncWrapper = ({ children }) => (
  <GoogleSyncContainer>
    <GoogleSyncWindow>{children}</GoogleSyncWindow>
  </GoogleSyncContainer>
)

export const Body = styled.div`
  padding: 24px;
  text-align: center;
  ${media.lessThan('small')`
    padding: 1rem;
  `}
`

export const HandShakeLogoWrapper = styled.div`
  padding: 24px;
  background-color: #568fff;
  width: fit-content;
  border-radius: 80px;
  margin: 0 auto;

  ${media.lessThan('small')`
    width: 100px;
    height: 100px;
    padding: 16px;
  `}
`

export const HandShakeImage = styled.img`
  ${media.lessThan('small')`
    width: 68px;
  `}
`

export const Title = styled.h5`
  margin-top: 24px;
  ${media.lessThan('small')`
    font-size: 1.1rem;
  `}
`

export const Text = styled.p`
  margin-top: 16px;
`

export const PrivacyText = styled.p`
  margin-top: 1rem;
  font-size: 12px;
  line-height: 15px;
  text-align: justify;
  color: #82879c;
`

export const GoogleButton = styled.button`
  border: solid 1px black;
  padding: 10px 16px;
  border-radius: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 auto;
  background-color: white;
`

export const ButtonText = styled.h5`
  padding: 0;
  margin: 0;
  font-size: 18px;
`
export const GoogleIcon = styled.img`
  margin-left: 8px;
`

export const NotificationContainer = styled.div`
  padding: 16px;
  background-color: #f9d7d7;
`

export const NotificationText = styled.p`
  color: #e13535;
  font-weight: bold;
  line-height: 20px;
  letter-spacing: 0.4px;
  margin-bottom: 0px;
`

export const NotificationSubText = styled.span`
  font-weight: normal;
`

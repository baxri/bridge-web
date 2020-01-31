import styled, { keyframes } from 'styled-components'
import media from 'utils/styledMediaQueryFix'

import { paths } from 'utils/newDesign'

// index Start
export const slideLeft = keyframes`
  from {
    right: -550px;
    ${media.lessThan('large')`
      right: -100%;
    `}
  }

  to {
    right: 0;
  }
`

export const IntroductionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

export const Index = styled.div`
  flex: 2;
  max-width: 100%;
  ${props =>
    !props.isIndex &&
    `
    height: calc(100vh - 40px);
    overflow: ${
      props.pathname.match(paths.introductionShow) ? 'scroll' : 'hidden'
    };
  `}

  ${media.lessThan('large')`
    ${props => {
      if (!props.isIndex) return 'display: none;'
    }}
  `}
`

export const SideView = styled.div`
  width: 550px;
  height: calc(100vh - 40px);
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  position: absolute;
  right: 0;
  z-index: 101;
  background-color: #ffffff;
  margin-top: -10px;
  transition: 0.1s ;
  border-left: 1px solid #E3E3E3;

  ${props => {
    if (props.pathname.match(paths.introductionShow)) {
      return `
        position: initial;
        margin-left: 15px;
        margin-right: -25px;
      `
    }
  }}

  ${media.greaterThan('large')`
    ${props => {
      if (
        props.pathname.match(paths.introductionNew) ||
        props.pathname.match(paths.introductionPublish)
      ) {
        return `
          position: fixed;
          left: 0;
          width: 100%;
          padding: 20px;
          transition: 0;
          animation: none;
        `
      }
    }}
  `}

  ${media.lessThan('large')`
    margin-top: 0;
    width: 100%;
    top: 0;
    bottom: 0;

    ${props => {
      if (props.pathname.match(paths.introductionShow)) {
        return `
          position: absolute;
          margin: 0;
        `
      }
    }}
  `}
`

export const Overlay = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 63px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;

  ${media.lessThan('large')`
    top: 250px;
  `}
`

// index End

import React from 'react'
import styled from 'styled-components'
import { keyframes } from 'styled-components'
import media from 'utils/styledMediaQueryFix'
import * as gs from './gmail-style'
import { colorPlaceholder } from './gmail-style'
import { FiCheck } from 'react-icons/fi'
import Textarea from 'react-textarea-autosize'

// TODO Fix topForNewIntroContainerInMobileView depending on if running locally or in producton
const isDevEnvironment = process.env.NODE_ENV === 'development'
const topForNewIntroContainerInMobileView = isDevEnvironment ? '-56px' : '0px'

// NewIntroWrapper Start

const NewIntroContainer = styled.div`
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

const slideUp = keyframes`
  from {
    transform: translate(0, 100%);
  }

  to {
    transform: translate(0, 0);
  }
`

// TODO translate(50%, 0) works on iPhone and Android
// but translate(100%, 0) does NOT work on iPhone for some reason
const slideLeft = keyframes`
  from {
    transform: translate(50%, 0);
  }

  to {
    transform: translate(0, 0);
  }
`

const NewIntroWindow = styled.div`
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

export const NewIntroWrapper = ({ children }) => (
  <NewIntroContainer>
    <NewIntroWindow>{children}</NewIntroWindow>
  </NewIntroContainer>
)

// NewIntroWrapper End

//HideIf Start

// Animated version
// export const HideIf = styled.div`
//   height: ${p => (p.condition? 0: 'auto')};;
//   transform: ${p => (p.condition? 'scaleY(0)': 'scaleY(1)')};
//   transform-origin: top;
//   transition: transform 300ms;
// `

///export const HideIf = (props) => (<div>{props.condition? null: props.children}</div>)

export const HideIf = styled.div`
  overflow: ${p => (p.condition ? 'hidden' : 'visible')};
  height: ${p => (p.condition ? 0 : 'auto')};
`

//HideIf End

//StyledTextArea Start

export const StyledTextArea = styled(Textarea)`
  ${gs.fontBase};
  display: block;
  resize: none;
  border: 0;
  width: 100%;
  min-height: 46px;
  padding: 16px ${gs.horizontalMargin}px;
  &:focus {
    border: 0;
    outline: 0;
  }
  ::placeholder {
    color: ${colorPlaceholder};
    opacity: 1;
  }
`

//StyledTextArea End

//NewIntroFormWrapper Start

export const NewIntroFormWrapper = styled.div`
  position: relative;
`

export const FormOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: ${p => (p.show ? 'block' : 'none')};
  background-color: rgba(255, 255, 255, 0.7);
`

//NewIntroFormWrapper End

//FlowSelector Start

export const FlowSelectorTrigger = styled.div`
  display: flex;
  align-items: center;
  padding: 0 ${gs.horizontalMargin}px;
  height: 45px;
  border-bottom: 1px solid ${gs.colorLightGray};
  cursor: pointer;
`

export const FlowSelectorTriggerLabel = styled.div`
  ${gs.fontBase};
  color: ${gs.colorPlaceholder};
  width: 100px;
`

export const FlowSelectorTriggerValue = styled.div`
  ${gs.fontBase};
  width: 100%;
  color: ${gs.colorGray};
  font-size: 12px;
  line-height: 12px;
  text-align: right;
`

export const FlowSelectorTriggerBadge = styled.div`
  color: ${gs.colorGray};
  margin-left: 12px;
`

export const FlowSelectorWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  left: 0;
  visibility: ${p => (p.show ? 'visible' : 'hidden')};
  margin-left: ${p => (p.show ? 0 : '100%')};
  background-color: #fff;
  transition: margin-left 300ms, visibility 300ms;
`

export const FlowSelectorItemWrapper = styled.div`
  position: relative;
  padding: 12px ${gs.horizontalMargin}px;
  border-top: 1px solid ${gs.colorLightGray};
  border-bottom: 1px solid ${gs.colorLightGray};
  margin-top: -1px;
  cursor: pointer;
`

export const FlowSelectorItemTitle = styled.div`
  ${gs.fontBase};
  font-size: 14px;
  line-height: 16px;
`

export const FlowSelectorItemInfo = styled.div`
  ${gs.fontBase};
  padding-top: 6px;
  color: ${gs.colorDarkGray};
  margin-right: 49px;
`

const StyledFlowSelectorItemChecked = styled.div`
  position: absolute;
  right: ${gs.horizontalMargin}px;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  color: #0acf83;
  opacity: ${p => (p.visible ? 1 : 0)};
  transition: opacity 200ms;
`

export const FlowSelectorItemChecked = props => (
  <StyledFlowSelectorItemChecked {...props}>
    <FiCheck size="18px" />
  </StyledFlowSelectorItemChecked>
)

//FlowSelector End

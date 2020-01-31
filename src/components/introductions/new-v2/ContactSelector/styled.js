import React from 'react'
import styled from 'styled-components'
import media from 'utils/styledMediaQueryFix'
import { FiChevronDown } from 'react-icons/fi'

import * as gs from '../gmail-style'

export const ContactSelectorContainer = styled.div`
  border-bottom: ${p =>
    p.showBottomSeparator ? `1px solid ${gs.colorLightGray}` : 0};
`

export const ContactForm = styled.div`
  position: relative;
  overflow-y: hidden;
  min-height: 45px;
  max-height: ${p => (p.expanded ? `${45 * 4}px` : '45px')};
  transition: max-height 300ms;
`

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 ${gs.horizontalMargin}px;
  height: 45px;
  border-top: ${p =>
    p.showTopSeparator ? `1px solid ${gs.colorLightGray}` : 0};
`

export const InputLabel = styled.div`
  ${gs.fontBase};
  overflow: hidden;
  width: ${p => (p.hide ? 0 : p.width || '50px')};
  //max-width: ${p => (p.hidden ? 0 : p.width || '50px')};
  transition: width 300ms;
`

export const InputField = styled(gs.Input)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0;
  font-weight: ${p => (p.highlight ? 'bold' : '300')};
  text-decoration: ${p => (p.highlight ? 'underline' : 'none')};
  &:focus {
    background-color: transparent;
    border-radius: 0;
    padding: 0;
    color: ${gs.colorMain};
    max-width: 100%;
  }
`

export const ShadowContainer = styled.div`
  position: relative;
  height: 30px;
  flex-grow: 10;
`

export const Shadow = styled(InputField)`
  color: ${gs.colorGray};
`

export const InputOptional = styled.div`
  ${gs.fontBase};
  font-size: 12px;
  color: ${gs.colorGray};
  text-align: right;
`

export const InputError = styled.div`
  ${gs.fontBase};
  font-size: 12px;
  color: ${gs.colorError};
  text-align: right;
  padding-left: 8px;
`

export const StyledLiIcon = styled.a`
  margin: -2px 0 0 12px;
  color: ${gs.colorGray} !important;
  outline: none;
  :hover {
    color: ${gs.colorDarkGray} !important;
  }
`

export const StyledExpand = styled.button`
  border: 0;
  background-color: #fff;
  padding: 0;
  outline: 0 !important;
  margin: -2px 0 0 12px;
  color: ${p =>
    p.disabled ? gs.colorLightGray : p.collapse ? gs.colorMain : gs.colorGray};
  transform: ${p => (p.collapse ? 'rotateZ(180deg)' : 'rotateZ(0)')};
  transition: color 300ms, transform 300ms;
`

export const LiIcon = props =>
  props.href ? (
    props.isLink ? (
      <StyledLiIcon {...props} target="_blank">
        <img alt="linkedin-url" src="/img/icons/linkedin-blue.svg" />
      </StyledLiIcon>
    ) : (
      <img alt="linkedin-url" src="/img/icons/linkedin-blue.svg" />
    )
  ) : (
    <img alt="linkedin-not" src={`/img/icons/linkedin-grey.svg`} />
  )

export const ExpandCollapse = props => (
  <StyledExpand {...props}>
    <FiChevronDown size="18px" />
  </StyledExpand>
)

export const SearchInputContainer = styled.div`
  ${p =>
    p.hide
      ? `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: -1;
  `
      : ''}
`

export const ContactResultsContainer = styled.div`
  overflow-y: auto;
  ${media.greaterThan('large')`
    height: calc(100vh - 190px);
  `}
  ${media.lessThan('large')`
    height: calc(100vh - 170px);
  `}
`

export const ContactItem = styled.div`
  border-top: 1px solid ${gs.colorLightGray};
  display: flex;
  justify-content: flex-start;
  align-content: center;
  padding: 0.5rem ${gs.horizontalMargin}px;
  cursor: pointer;
  background-color: ${props => props.highlight && '#e6e6e6 !important'};
  :hover {
    background-color: #fafafa;
  }
`

export const ContactDetails = styled.div`
  flex: 10;
  margin-left: 8px;
  overflow: hidden;
`

export const StyledContactName = styled.div`
  ${gs.fontBase};
  font-size: 14px;
  line-height: 16px;
  min-height: 6px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

export const StyledContactEmail = styled.div`
  ${gs.fontBase};
  color: ${gs.colorPlaceholder};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

export const ContactTitle = styled.div`
  ${gs.fontBase};
  font-size: 14px;
  margin: 0 12px 0 4px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

export const ContactSyncContainer = styled.div`
  padding: 20px 21px;
`

export const ContactSyncButton = styled.div`
  cursor: pointer;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: auto;
  padding: 11px 14px;
  border: 1px solid ${gs.colorButtonBorder};
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`

export const ContactSyncButtonText = styled.span`
  ${gs.fontBase};
  font-size: 18px;
  margin-left: 9px;
`

export const ContactSyncText = styled.div`
  margin-top: 8px;
  ${gs.fontBase};
  color: ${gs.colorDarkGray};
`

export const StyledIntrosCount = styled.div`
  background-color: #e5e5e5;
  border-radius: 2px;
  padding: 2px 4px;
  font-size: 10px;
  display: inline;
`

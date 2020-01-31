import React from 'react'
import styled from 'styled-components'
import media from 'utils/styledMediaQueryFix'

import { Button } from 'components/shared'

// SelectContact Start
export const SelectContactWrapper = styled.div`
  display: flex;
  padding: 20px 15px;
  align-items: center;
  ${media.lessThan('large')`
    padding: 10px 15px;
  `}
`

export const Label = styled.div`
  flex: 1;
  width: 20%;
`

export const SelectedLabel = styled.div`
  font-size: 14px;
  color: #cccccc;
`

export const SearchContact = styled.div`
  flex: 3;
  display: flex;
`

export const BorderlessInput = styled.input`
  border: none;
  font-size: 18px;
  width: 100%;
  ${props => props.addMargin && 'margin-top: 10px;'}

  &:focus {
    border: 0;
    outline: 0;
  }
`

export const SelectedContactsTo = styled.div`
  display: flex;
  flex-direction: column;

  & > div:not(:first-child) {
    margin-top: 10px;
  }
`

export const TagsWrapper = styled.div`
  width: 100%;
`

export const ListTags = styled.div`
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`

export const ContinueButtonWrapper = styled.div`
  margin-top: 15px;
  margin-left: 15px;
  margin-right: 15px;
  display: block;
`

export const ContinueButton = styled(Button)`
  ${media.lessThan('large')`
    width: 100%;
  `}
`

// SelectContact End

// ListContacts Start
export const Contacts = styled.div`
  max-height: calc(100vh - 250px);
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  ${media.lessThan('large')`
    height: calc(100vh - 210px);
  `}
`

// ListContacts End

// Message Start
export const MessageWrapper = styled.div`
  overflow-y: auto;
  padding-bottom: 20px;
  height: calc(100vh - 162px);
  display: flex;
  flex-direction: column;

  ${media.lessThan('large')`
    height: calc(100vh - 191px);
  `}
`

export const MessageContactWrapper = styled.div`
  min-height: 108px;
  display: flex;
  border-bottom: 1px solid #e1e3e8;
  padding: 20px 15px;
  flex-direction: column;
  ${media.lessThan('large')`
    padding: 10px 15px;
  `}
`

// Message End

// NewIntroWrapper Start

export const NewIntroWrapper = styled.div`
  ${media.greaterThan('large')`
    margin: auto;
    height: calc(100vh);
    min-width: 350px;
    max-width: 860px;
    border: none;
    box-shadow: 0px 0px 17px rgba(0,0,0,0.1);
    border-top-radius: 25px;
  `}

  ${media.lessThan('large')`
    margin-right: -15px;
    margin-left: -15px;
  `}
`

// NewIntroWrapper End

// InitializeMessage Start
export const InitializeMessageWrapper = styled.div`
  display: flex;
  margin: 10px 15px 0;
`

export const InitMessage = styled.div``

export const ActionMessage = styled.div`
  display: flex;
  padding: 10px 15px;
  justify-content: space-between;
  align-items: center;
  & > a {
    font-weight: 500;
    margin-bottom: 10px;
  }

  ${media.lessThan('large')`
    flex-direction: column;
    align-items: normal;
  `}
`

export const FormMessage = styled.div`
  width: 100%;
`

// InitializeMessage End

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

// Confirmation End

const AnchorTag = ({ danger, black, children, ...props }) => (
  <a {...props}>{children}</a>
)
export const Anchor = styled(AnchorTag)`
  color: ${props => {
    if (props.danger) return '#D0021B'
    if (props.black) return '#000000'
    return '#047BFE'
  }} !important;
  display: flex;
  align-items: center;
  cursor: pointer;
`

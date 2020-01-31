// import React from 'react'
import styled from 'styled-components'
import media from 'utils/styledMediaQueryFix'

import { Button } from 'components/shared'

export const FeedbackContainer = styled.div`
  background-color: white;
  position: relative;
  display: block;
  ${media.greaterThan('medium')`
    height: 80vh;
    max-width: 420px;
    width: 100%;
    border: none;
    margin: 0 auto;
    padding-top: 20px;
  `}
`

export const FeedbackMessageBox = styled.div`
  text-align: left;
  background: #e5e5e5;
  position: relative;
  padding: 10px;
  color: #555;
  position: relative;
  border-radius: 5px;
  &:before {
    content: '';
    position: absolute;
    left: -8px;
    top: 0;
    border-top: 4px solid #e5e5e5;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
  }
`

export const FeedbackWrapper = styled.div`
  margin-bottom: 30px;
  padding-top: 20px;
`

export const StyledButton = styled(Button)`
  ${media.lessThan('large')`
    width: 100%;
  `}
`

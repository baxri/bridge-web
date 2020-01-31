import React from 'react'
import styled from 'styled-components'
import media from 'utils/styledMediaQueryFix'
import { Col } from 'reactstrap'

const actionsStatus = ['canceled', 'rejected']

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  ${media.lessThan('large')`
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 6rem;
  `}
`

export const Messages = styled.ul`
  padding: 0;
  list-style: none;
  margin: 0;
  height: auto;
  display: flex;
  flex-direction: column;
  min-height: 100%;
`

export const Scrollable = styled.div`
  margin-bottom: 10px;

  ${media.lessThan('large')`
    flex: ${props => (actionsStatus.includes(props.status) ? 1 : 4)}
  }}
  `}

  ${media.greaterThan('large')`
    flex: ${props => (actionsStatus.includes(props.status) ? 1 : 6)}
    overflow: scroll;
    padding-bottom: 2rem;
  }}
  `}

  ${media.greaterThan('huge')`
    flex: ${props => (actionsStatus.includes(props.status) ? 1 : 7)}
    overflow: scroll;
    padding-bottom: 2rem;
  }}
  `}

`

export const ActionsWrapper = styled.div`
  border-top: 1px solid #eff2f4;
  padding: 15px;
  display: flex;
  flex: 1;

  ${media.lessThan('large')`
    flex: 1 0 auto;
  `}
`

export const ButtonWrapper = styled.div`
  flex: 1;
  margin: 5px 0px 10px 0px;
`

export const Text = styled.div`
  font-weight: ${props => props.weight || 'initial'};
`

export const Contact = styled.div`
  display: flex;
  padding: 15px;
  border-bottom: 1px solid #eff2f4;
`

export const TimelineText = styled.div`
  background-color: #f6f8fa;
  border-radius: 5px;
  white-space:pre-wrap;
  border-radius: 5px;
  margin-left: 10px;
  margin-top: 10px;
  margin-right:15px
  padding: 10px 10px 5px 10px;
  box-sizing: border-box;
`

export const MessageWrapper = styled.li`
  display: flex;
  margin: 15px;
  justify-content: center;
  min-height: min-content;
`

export const Timestamp = styled.div`
  font-size: 16px;
  color: #afafaf;
  display: flex;
`

export const By = styled.div`
  color: #212529;
  margin-right: 10px;
`

export const Time = styled.div`
  margin-top: 2px;
  font-size: 14px;
`

export const Title = styled.div``

const ColTag = ({ grey, black, children, ...props }) => (
  <Col {...props}>{children}</Col>
)
export const Content = styled(ColTag)`
  border-left: 2px solid
    ${props => {
      if (props.grey) return '#999999'
      if (props.black) return '#000000'
    }};
  margin-left: 5px;
  max-width: 91% !important;

  ${media.lessThan('large')`
    margin-left: 10px;
  `}

  p {
    word-wrap: break-word;
  }
`

export const TextWrap = styled.div`
  white-space: pre-wrap;
  word-break: break-word;
  width: 100%;
`

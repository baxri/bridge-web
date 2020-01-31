import React from 'react'
import { Card, CardBody, CardText } from 'reactstrap'
import styled from 'styled-components'
import media from 'utils/styledMediaQueryFix'
import { padStart } from 'lodash'

import { Button } from 'components/shared'
import { Icons } from 'components/shared'
import history from 'utils/history'

const Counter = styled.h2`
  font-size: 70px;
  font-weight: 500;
  ${media.lessThan('large')`
    font-size: 18px;
    margin: 0 5px;
  `}
`

const StyledCard = styled(Card)`
  text-align: center;
  box-shadow: 0px 0px 37px rgba(0, 0, 0, 0.1);
  border: 0 !important;
  border-radius: 9px !important;
  ${media.greaterThan('large')`
    height: 100%;
  `}
  ${media.lessThan('large')`
    display: ${props =>
      props.text !== 'Contacts' && props.count === 0 ? 'none' : 'block'};
    margin-bottom: 10px;
  `}
`

const StyledCardText = styled(CardText)`
  font-size: 24px;
  ${media.lessThan('large')`
    flex: 3;
    text-align: left;
    font-size: 16px;
    margin: 0;
  `}
`

const StyledCardBody = styled(CardBody)`
  padding: 28px;
  ${media.greaterThan('large')`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  `}
  ${media.lessThan('large')`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px !important;
  `}
`

const StyledButton = styled(Button)`
  ${media.lessThan('large')`
    font-size: 16px !important;
  `}
`

const Icon = styled.div`
  flex: 1;

  ${media.greaterThan('large')`
    display: none;
  `}

  ${media.lessThan('large')`
    display: none !important;
  `}
`

export default ({ text, count, link = 'View', linkTo, onClick }) => (
  <StyledCard text={text} count={count}>
    <StyledCardBody>
      <Counter>{count === 0 ? 0 : padStart(count, 1, 0)}</Counter>
      <StyledCardText>{text}</StyledCardText>

      <StyledButton
        alt="true"
        onClick={() => {
          history.push(linkTo)
        }}
      >
        {link}
      </StyledButton>

      <Icon>
        <Icons.AngleLeft />
        <Icons.AngleRight />
      </Icon>
    </StyledCardBody>
  </StyledCard>
)

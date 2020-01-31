import React from 'react'
import { Col } from 'reactstrap'
import styled from 'styled-components'
import media from 'utils/styledMediaQueryFix'
import { Link } from 'react-router-dom'
import You from './You'

import { SelectedContact, IntroIconState } from 'components/shared'

const Wrapper = styled.div`
  padding: 15px 0;
  border-bottom: 1px solid #e3e3e3;
  display: flex;
  align-items: center;

  ${media.lessThan('large')`
    margin: 0;
    width: 100%;
    padding-left: 0;
    padding-right: 0;
    diplay: flex;
    flex: 0 0 auto;

    > .col {
      max-width: 45%;
    }
  `}
`

const ContactWrapper = styled(Col)`
  width: 44%;
  color: #212529;
`

const ContactLink = styled(Col)`
  width: 44%;
  color: #212529;
  text-decoration: none;
  &:hover {
    text-decoration: none;
    color: inherit;
  }
`

const Contacts = ({
  from,
  from_email,
  fromContact,
  to,
  to_email,
  toContact,
  status,
  my_role = undefined,
}) => (
  <Wrapper>
    {my_role === 'n1' && (
      <Col>
        <You position="right" />
      </Col>
    )}
    {my_role !== 'n1' && fromContact.id && (
      <ContactLink tag={Link} to={`/contacts/${fromContact.id}`}>
        <SelectedContact {...fromContact} position="right" />
      </ContactLink>
    )}
    {my_role !== 'n1' && !fromContact.id && (
      <ContactWrapper>
        <SelectedContact {...fromContact} position="right" />
      </ContactWrapper>
    )}
    <IntroIconState status={status} />
    {my_role === 'n2' && (
      <Col>
        <You position="left" />
      </Col>
    )}
    {my_role !== 'n2' && toContact.id && (
      <ContactLink tag={Link} to={`/contacts/${toContact.id}`}>
        <SelectedContact position="left" {...toContact} />
      </ContactLink>
    )}
    {my_role !== 'n2' && !toContact.id && (
      <ContactWrapper>
        <SelectedContact position="left" {...toContact} />
      </ContactWrapper>
    )}
  </Wrapper>
)

export default Contacts

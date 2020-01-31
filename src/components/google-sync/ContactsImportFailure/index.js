import React from 'react'
import styled from 'styled-components'
import { Title, Text } from '../styled'

const Wrapper = styled.div`
  margin-top: 135px;
`

const ContactsImportFailure = ({ msg }) => (
  <Wrapper>
    <img src="/img/loading-logo.svg" />
    <Title>Importing contacts</Title>
    <Text>{msg}</Text>
  </Wrapper>
)

export default ContactsImportFailure

import React from 'react'
import styled from 'styled-components'
import { Title, Text } from '../styled'

const Wrapper = styled.div`
  margin-top: 135px;
`
const LoadingLogo = styled.img``
const ImportCount = styled.p`
  font-size: 14px;
  color: #82879c;
`

const ContactsImport = ({ total, importedContacts, syncing }) => (
  <Wrapper>
    <LoadingLogo src="/img/loading-logo.svg" />
    <Title>Importing contacts</Title>
    <Text>This should only take a moment</Text>
    {syncing && <ImportCount>Syncing</ImportCount>}
    {!syncing && total > 0 && (
      <ImportCount>
        {importedContacts} of {total}
      </ImportCount>
    )}
  </Wrapper>
)

export default ContactsImport

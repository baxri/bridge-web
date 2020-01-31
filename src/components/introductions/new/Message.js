import React from 'react'

import { SelectedContact } from 'components/shared'
import { withConsumer } from 'context/NewIntroContext'
import InitializeMessage from './InitializeMessage'
import { MessageWrapper, MessageContactWrapper, SelectedLabel } from './styled'

const Message = ({ from, receivers, receiverIndex, changeReceiver }) => (
  <MessageWrapper>
    <MessageContactWrapper>
      <SelectedLabel>I want to introduce</SelectedLabel>
      <SelectedContact
        style={{ maxWidth: 550 }}
        name={from[0].name || from[0].email}
        avatarUrl={from[0].profile_pic_url}
        position="left"
      />
    </MessageContactWrapper>
    <MessageContactWrapper>
      <SelectedLabel>To</SelectedLabel>
      <SelectedContact
        style={{ maxWidth: 550 }}
        name={receivers[receiverIndex].name || receivers[receiverIndex].email}
        avatarUrl={receivers[receiverIndex].profile_pic_url}
        position="left"
      />
    </MessageContactWrapper>
    <InitializeMessage />
  </MessageWrapper>
)

export default withConsumer(Message)

import React from 'react'
import { Col } from 'reactstrap'

import { Avatar, TimeAgo } from 'components/shared'
import {
  MessageWrapper as Wrapper,
  Content,
  By,
  Timestamp,
  Title,
  Time,
  TextWrap,
} from './styled'
import bridgeIcon from 'assets/icons/bridge-logo.svg'

const Message = ({ time, text, note, isAutomatic, by }) => (
  <Wrapper>
    <Col xs={1} style={{ padding: 0, textAlign: 'center' }}>
      {isAutomatic ? (
        <Avatar profile_pic_url={bridgeIcon} />
      ) : (
        <Avatar {...by} />
      )}
    </Col>
    <Content black>
      <Timestamp>
        {by && (
          <By>
            <b>{by.isYou ? 'You' : by.name}</b>
          </By>
        )}
        <Time>
          <TimeAgo date={time} fulldate />
        </Time>
      </Timestamp>
      <Timestamp>
        <Title>{text}</Title>
      </Timestamp>
      <TextWrap>{note}</TextWrap>
    </Content>
  </Wrapper>
)

export default Message

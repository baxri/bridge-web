import React from 'react'
import styled from 'styled-components'

import { Avatar } from 'components/shared'

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
  cursor: pointer;
  width: 100%;
  background-color: #ffffff;
  ${props => props.activeCursor && 'background-color: #e6e6e6'}
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  padding-right: 15px;
  border-bottom: 1px solid #e3e3e3;
  flex: 6;
  max-width: 80%;
`

const Name = styled.h4`
  font-size: 18px;
  margin: 0;
  padding: 0;
  margin-bottom: 10px;
  font-weight: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const Email = styled.p`
  color: #9c9696;
  font-size: 18px;
  margin: 0;
`

const AvatarWrapper = styled.div`
  margin: 10px;
  margin-left: 15px;
  flex: ;
`

const Contact = ({ name, email, profile_pic_url, onClick, activeCursor }) => (
  <Wrapper onClick={onClick} activeCursor={activeCursor}>
    <AvatarWrapper>
      <Avatar {...{ name, email, profile_pic_url }} size="medium" />
    </AvatarWrapper>

    <Info>
      <Name>{name}</Name>
      <Email>{email}</Email>
    </Info>
  </Wrapper>
)

export default Contact

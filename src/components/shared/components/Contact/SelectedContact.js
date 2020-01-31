import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { Avatar } from 'components/shared'
import closeIcon from 'assets/icons/close.svg'

const Container = styled.div`
  display: flex;
  flex-direction: ${props =>
    props.position === 'left' ? 'row' : 'row-reverse'};
  background-color: #f5f6f7;
  align-items: center;
  padding: 8px 10px;
  max-width: 100%;
  justify-content: space-between;
`

const StyledAvatar = styled(Avatar)`
  margin: 0 10px;
`

const Name = styled.div`
  margin: 0 10px;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 5;
`

const Close = styled.div`
  cursor: pointer;
  ${props => !props.close && 'display: none;'}
  background: url(${closeIcon}) no-repeat center center;
  width: 16px;
  height: 16px;
`

const SelectedContact = ({
  position,
  close,
  style,
  isYou = false,
  ...contact
}) => {
  return (
    <Container position={position} style={style}>
      <StyledAvatar {...contact} />
      <Name>{isYou ? 'You' : contact.name || contact.email}</Name>
      <Close close={!!close} onClick={close} />
    </Container>
  )
}
SelectedContact.propTypes = {
  position: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string,
  close: PropTypes.any,
  style: PropTypes.object,
  isYou: PropTypes.bool,
}

SelectedContact.defaultProps = {
  style: {},
}

export default SelectedContact

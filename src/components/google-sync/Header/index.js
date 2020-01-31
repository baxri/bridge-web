import React from 'react'
import { FiX } from 'react-icons/fi'

import { StyledHeader, Title, StyledLeftButton } from './styled'

const CloseButton = props => (
  <StyledLeftButton {...props}>
    <FiX size="26px" />
  </StyledLeftButton>
)

export default React.memo(function Header(props) {
  return (
    <StyledHeader>
      <CloseButton onClick={props.onClose} />
      <Title>{props.title}</Title>
    </StyledHeader>
  )
})

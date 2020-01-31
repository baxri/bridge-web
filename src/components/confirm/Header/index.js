import React from 'react'

import {
  StyledHeader,
  Title,
  StyledRightButton,
  StyledLeftButton,
} from './styled'

import { FiX, FiChevronLeft } from 'react-icons/fi'

const ActionButton = ({ children, ...props }) => (
  <StyledRightButton {...props}>{children}</StyledRightButton>
)

const CloseButton = props => (
  <StyledLeftButton {...props}>
    <FiX size="26px" />
  </StyledLeftButton>
)
const BackButton = props => (
  <StyledLeftButton {...props}>
    <FiChevronLeft size="26px" />
  </StyledLeftButton>
)

export default React.memo(function Header(props) {
  return (
    <StyledHeader>
      {props.onClose ? (
        <CloseButton onClick={props.onClose} />
      ) : props.onBack ? (
        <BackButton onClick={props.onBack} />
      ) : null}
      <Title>{props.title}</Title>
      {props.onAction ? (
        <ActionButton onClick={props.onAction} {...props.actionProps}>
          {props.actionTitle}
        </ActionButton>
      ) : null}
    </StyledHeader>
  )
})

import React from 'react'
import { FiX } from 'react-icons/fi'

import {
  H1,
  H2,
  H3,
  StyledCenterHeading,
  StyledHeaderAction,
  StyledSideView,
  StyledListHeading,
  StyledDateHeading,
  StyledNotificationHeading,
  ButtonDesktop,
  CloseButton,
  CloseNotificationButton,
} from './styled'

const CenterHeading = ({ children, ...props }) => (
  <StyledCenterHeading>
    <H3 {...props}>{children}</H3>
  </StyledCenterHeading>
)

const HeaderAction = ({ text, children }) => {
  return (
    <StyledHeaderAction>
      <H3 text={text}>{text}</H3>
      <div>{children}</div>
    </StyledHeaderAction>
  )
}

const SideViewHeading = ({
  label,
  leftProps: { label: leftLabel, ...restLeft },
  nextProps: { label: nextLabel, ...restNext } = {
    label: null,
    disabled: true,
  },
  rightProps: { label: rightLabel, ...restRight } = {
    label: null,
    disabled: true,
  },
}) => {
  return (
    <StyledSideView>
      <CloseButton {...restLeft}>
        <FiX size="1.4em" />
      </CloseButton>
      <H2 margin={0}>{label}</H2>
      {/* <ButtonMobile {...restRight} borderless size="sm" color="transparent" style={{ visibility: 'hidden' }}>
        <Icons.ChevronRight />
      </ButtonMobile> */}
      {!restNext.disabled && (
        <ButtonDesktop {...restNext} size="sm" className="next_button">
          {nextLabel}
        </ButtonDesktop>
      )}
      <ButtonDesktop
        {...restRight}
        size="sm"
        className="continue_button"
        style={{ display: restRight.disabled ? 'none' : 'block' }}
      >
        {rightLabel}
      </ButtonDesktop>
    </StyledSideView>
  )
}

const ListHeading = ({ children }) => (
  <StyledListHeading>
    <h4>{children}</h4>
  </StyledListHeading>
)

const DateHeading = ({ children }) => (
  <StyledDateHeading>
    <div className="line" />
    <h4>{children}</h4>
    <div className="line" />
  </StyledDateHeading>
)

const NotificationHeading = ({ onClick, children }) => (
  <StyledNotificationHeading>
    <CloseNotificationButton onClick={onClick}>
      <FiX size="1.0em" />
    </CloseNotificationButton>
    <h4>{children}</h4>
  </StyledNotificationHeading>
)

export {
  H1,
  H2,
  H3,
  CenterHeading,
  HeaderAction,
  SideViewHeading,
  ListHeading,
  DateHeading,
  NotificationHeading,
}

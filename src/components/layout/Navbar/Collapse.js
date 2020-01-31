import React from 'react'
import styled from 'styled-components'
import { Nav, NavItem, NavLink, Collapse } from 'reactstrap'
import media from 'utils/styledMediaQueryFix'
import { Link } from 'react-router-dom'

import Dropdown from './Dropdown'

const DefaultNav = styled(Nav)`
  display: flex;
  ${media.lessThan('large')`
    display: none !important;
  `}
`

const HamburgerNav = styled(Nav)`
  ${media.greaterThan('large')`
    display: none !important;
    margin-left: 10px;
  `}
  ${media.lessThan('large')`
    display: flex;
  `}
`

const NavDivider = styled(NavItem)`
  border-left: 1px solid #000000;
  opacity: 0.1;
  margin: 8px 15px;
`

const StyledNavItem = styled(NavItem)`
  padding-left: 10px;
`

const StyledNavLink = styled(NavLink)`
  color: #047bfe !important;
`

const StyledCollapse = styled(Collapse)`
  flex-grow: 0 !important;

  ${media.greaterThan('large')`
    margin-left: auto;
  `}
`

export default ({ isOpen, toggle }) => {
  const props = {
    tag: Link,
    onClick: toggle,
  }
  return (
    <StyledCollapse isOpen={isOpen} navbar>
      <DefaultNav navbar className="ml-auto">
        <NavDivider />
        <Dropdown />
      </DefaultNav>
      <HamburgerNav navbar className="ml-auto">
        <StyledNavItem>
          <StyledNavLink {...props} to="/">
            Overview
          </StyledNavLink>
        </StyledNavItem>
        <StyledNavItem>
          <StyledNavLink {...props} to="/introductions">
            Intros
          </StyledNavLink>
        </StyledNavItem>
        <StyledNavItem>
          <StyledNavLink {...props} to="/contacts">
            Contacts
          </StyledNavLink>
        </StyledNavItem>
        <StyledNavItem>
          <StyledNavLink {...props} to="/profile">
            Profile
          </StyledNavLink>
        </StyledNavItem>
        <StyledNavItem>
          <StyledNavLink href="/logout">Logout</StyledNavLink>
        </StyledNavItem>
      </HamburgerNav>
    </StyledCollapse>
  )
}

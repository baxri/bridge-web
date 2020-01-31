import React from 'react'
import styled from 'styled-components'
import media from 'utils/styledMediaQueryFix'
import { Link } from 'react-router-dom'

const Icon = styled.div`
  display: inline-block;
  background-image: url(${props => props.icon});
  width: 34px;
  height: 34px;

  ${media.greaterThan('large')`
    margin-right: 10px;
  `}
`

const StyledLi = styled.li`
  position: relative;

  ${props =>
    props.active &&
    media.greaterThan('large')`
    &:before {
      content: '';
      width: 6px;
      height: 100%;
      border-radius: 3.5px;
      background-color: #4A90E2;
      position: absolute;
    }
  `}

  ${props =>
    props.active &&
    media.lessThan('large')`
    &:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 6px;
      background-color: #4A90E2;
      bottom: 0;
    }
  `}
`

const FixLinkProps = ({ active, ...props }) => <Link {...props} />

const StyledLink = styled(FixLinkProps)`
  color: #000000;
  display: flex;
  align-items: center;
  font-size: 18px;

  ${props => (props.active ? 'font-weight: 500;' : 'opacity: .6;')}

  &:hover {
    text-decoration: none;
    opacity: 1;
    color: #000000;
  }

  ${media.greaterThan('large')`
    padding: 6px 10px 6px 20px;
  `}

  ${media.lessThan('large')`
    display: none;

    & > span {
      display: none;
    }
  `}
`

const Item = ({ icon, to, label, active }) => (
  <StyledLi active={active}>
    <StyledLink to={to} active={active}>
      <Icon icon={icon} /> <span>{label}</span>
    </StyledLink>
  </StyledLi>
)

export default Item

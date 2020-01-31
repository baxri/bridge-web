import React from 'react'
import { Button as BsButton } from 'reactstrap'
import styled from 'styled-components'
import media from 'utils/styledMediaQueryFix'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const FixPropsButton = ({ borderless, ...props }) => <BsButton {...props} />

const StyledButton = styled(FixPropsButton)`
  ${({ borderless, noBorder, color }) => {
    if (color === 'primary') {
      return borderless
        ? `
        border-color: #e3e3e3;

        &:hover, &:focus {
          border-color: #007bff;
          border: 2px solid #047BFE;
        }
      `
        : 'border: 2px solid #047BFE;'
    } else if (color === 'secondary') {
      return 'border: none;'
    } else if (color === 'transparent') {
      return 'border: none;'
    }
  }}

  font-size: ${props => {
    if (props.size === 'sm') return '14px'
    if (props.size === 'intro') return '12px'
    return '18px'
  }} !important;

  color: ${props => {
    if (props.color === 'danger') return '#D0021B'
    if (props.color === 'secondary') return '#ffffff'
    if (props.color === 'transparent') return '#000000;'
    return '#047BFE'
  }};

  background-color: ${props => {
    if (props.color === 'secondary') return '#d9d9d9'
    if (props.color === 'transparent') return 'transparent'
    return '#ffffff'
  }};

  border-radius: 3px !important;

  padding: ${props => {
    if (props.padding === 'intro') return '2px 10px'
    return '6px 20px'
  }}!important;

  font-weight: ${props => {
    if (props.weight === 'intro') return '300'
    return '500px'
  }} !important;

  border-radius: 3px;

  ${media.lessThan('large')`
    ${({ mobile }) => {
      if (mobile) {
        if (mobile.block) return 'width: 100%;'
      }
    }}`}
`

const LinkButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  display: inline;
  margin: 0;
  padding: 0;

  &:hover,
  &:focus {
    text-decoration: none;
  }
`

const Button = ({ children, linkButton, link, ...props }) => {
  return linkButton ? (
    <LinkButton {...props}>{children}</LinkButton>
  ) : (
    <StyledButton outline tag={link ? Link : 'button'} {...props}>
      {children}
    </StyledButton>
  )
}

Button.propTypes = {
  borderless: PropTypes.bool,
}
Button.defaultProps = {
  borderless: false,
  color: 'primary',
}

export default Button

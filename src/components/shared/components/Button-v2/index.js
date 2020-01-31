import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { BeatLoader } from 'react-spinners'

import { textColors, bgColors, activeColors, textButtonColors } from './styles'

/**
 * Picks color by button type
 * @param {Object} props
 * @param {Array} colors
 */
const pickColor = (props, colors) => {
  const propKeys = Object.keys(props)
  for (const key of Object.keys(colors)) {
    if (propKeys.includes('alt')) {
      return colors.alternative
    }

    if (propKeys.includes(key)) {
      return colors[key]
    }
  }

  return colors.primary
}

/**
 * Picks text color by button type
 * @param {Object} props
 */
const pickTextColor = (props, textColors) => {
  const propKeys = Object.keys(props)
  for (const key of Object.keys(textColors)) {
    if (propKeys.includes(key)) {
      return propKeys.includes('alt')
        ? textColors.alternative[key]
        : textColors[key]
    }
  }

  return propKeys.includes('alt')
    ? textColors.alternative.primary
    : textColors.primary
}

/**
 * Picks border color by button type
 * @param {Object} props
 */
const pickBorderColor = props => {
  const propKeys = Object.keys(props)
  for (const key of Object.keys(bgColors)) {
    if (propKeys.includes(key)) {
      if (propKeys.includes('alt') && key === 'secondary') {
        return '#B3B7C4'
      }
      return bgColors[key]
    }
  }

  return bgColors.primary
}

const pickBackgroundColor = props => pickColor(props, bgColors)

const pickActiveColor = props => pickColor(props, activeColors)

const StyledButton = styled.button`
  background: ${props => pickBackgroundColor(props)};
  color: ${props => pickTextColor(props, textColors)};
  text-align: center;
  border: 1px solid ${props => pickBorderColor(props)};
  border-radius: ${props =>
    props.pill ? '100px' : props.small ? '4px' : '8px'};
  min-width: ${props => (props.small ? '60px' : '80px')};
  height: ${props => (props.small ? '32px' : '48px')};
  font-size: ${props => (props.small ? '14px' : '16px')};
  opacity: ${props => (props.disabled ? 0.3 : 1)};
  padding: ${props => (props.small ? '0 16px' : '0 24px')};
  width: ${props => (props.full ? '100%' : 'unset')};
  font-style: normal;

  &:active {
    background: ${props => pickActiveColor(props)};
  }
`

const ButtonLink = styled.button`
  text-decoration: none;
  min-height: 32px;
  background: transparent;
  color: ${props => pickTextColor(props, textButtonColors)};
  font-size: 14px;
  border: none;
  opacity: ${props => (props.disabled ? 0.3 : 1)};

  &:focus,
  &:active {
    outline: none;
  }
`

const Button = ({ children, transparent, loading, ...props }) => {
  let _children = children
  if (loading) {
    _children = (
      <BeatLoader
        size={props.small ? 4 : 8}
        color={pickTextColor(props, textColors)}
      />
    )
  }
  if (transparent) {
    return <ButtonLink {...props}>{children}</ButtonLink>
  }
  return <StyledButton {...props}>{_children}</StyledButton>
}

Button.propTypes = {
  primary: PropTypes.bool,
}

export default Button

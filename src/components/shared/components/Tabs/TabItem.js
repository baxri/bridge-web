import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Item = styled.button`
  background: none;
  border: none;
  color: #000000;
  padding: 10px;
  opacity: 0.6;
  font-size: 15px;
  cursor: pointer;
  white-space: nowrap;

  ${props =>
    props.active &&
    `
    color: #047BFE;
    border-bottom: 2px solid #047BFE;
    font-weight: 500;
    opacity: 1;
  `}

  &:focus {
    outline: 0;
  }
`

const TabItem = ({ label, ...props }) => <Item {...props}>{label}</Item>

TabItem.propTypes = {
  onClick: PropTypes.func,
  active: PropTypes.bool,
  label: PropTypes.string.isRequired,
}

export default TabItem

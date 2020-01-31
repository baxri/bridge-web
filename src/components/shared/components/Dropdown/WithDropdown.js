import React from 'react'
import { Button } from 'components/shared'
import styled from 'styled-components'
import media from 'utils/styledMediaQueryFix'

const Menu = styled.ul`
  right: 10px;
  margin-top: 44px;
  left: 200px;
  font-size: 12px;

  ${media.lessThan('420px')`
    left: 130px;
  `}
`

const WithDropdown = ({
  containerClassName,
  dropdownProps,
  children,
  className,
  ...props
}) => {
  const { items, renderItem = _renderItem } = dropdownProps

  return (
    <div className="dropdown">
      <Button
        size="intro"
        padding="intro"
        weight="intro"
        className="dropdown-toggle btn btn-outline-primary"
        type="button"
        data-toggle="dropdown"
        {...props}
      >
        {children} <span className="caret" />
      </Button>
      <Menu className="dropdown-menu">{items.map(renderItem, this)}</Menu>
    </div>
  )
}

function _renderItem(text, index) {
  const slug = `${text}-${index}`
  return (
    <li key={slug}>
      <a href={false}>{text}</a>{' '}
    </li>
  )
}

export default WithDropdown

import React from 'react'
import { InputGroup, InputGroupAddon, Input, Tooltip } from 'reactstrap'
import styled from 'styled-components'

import { Icons } from 'components/shared'

const Button = styled.button`
  background-color: none;
  border: 1px solid #ced4da;
  border-left: 0;
  padding: 6px 15px 9px;
  border-radius: 0 3px 3px 0;
  color: #808080;
  &:focus {
    outline: 0;
  }
  &:hover {
    color: #000000;
  }
`

const StyledInput = styled(Input)`
  border-right: 0;
  font-size: 18px !important;
  border-radius: 3px;
  padding: 22px 15px !important;
  max-width: 350px;
  &:focus {
    box-shadow: none;
    outline: none;
    border-color: #ced4da;
  }
`

const SearchInput = ({ onIconClick, keepTooltipOpen, ...props }) => (
  <InputGroup>
    <StyledInput placeholder="Search..." {...props} />
    <InputGroupAddon addonType="prepend">
      <Button
        onClick={onIconClick}
        style={{ backgroundColor: '#ffffff', cursor: 'pointer' }}
      >
        <div style={{ marginTop: 4 }}>
          <Icons.Search />
        </div>
      </Button>
    </InputGroupAddon>
    {props.id && (
      <Tooltip placement="bottom" isOpen={keepTooltipOpen} target={props.id}>
        Press enter to search
      </Tooltip>
    )}
  </InputGroup>
)

export default SearchInput

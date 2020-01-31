import React from 'react'
import styled from 'styled-components'

import { Button } from 'components/shared'
import history from 'utils/history'

const StyledViewAll = styled.div`
  margin-top: 10px;
  &:not(:hover) {
    background-color: #fff;
  }
`

const ViewAll = ({ children, to, button }) => (
  <StyledViewAll>
    <Button alt="true" onClick={() => history.push(to)}>
      {children}
    </Button>
  </StyledViewAll>
)

export default ViewAll

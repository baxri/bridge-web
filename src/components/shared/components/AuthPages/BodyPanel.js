import React from 'react'
import styled from 'styled-components'

const StyledAuthBodyPanel = styled.div`
  background: #ffffff;
  padding: 15px 0 22px 0;
  border-radius: 5px;
`

const AuthBodyPanel = ({ children, ...props }) => (
  <StyledAuthBodyPanel {...props}>{children}</StyledAuthBodyPanel>
)

export default AuthBodyPanel

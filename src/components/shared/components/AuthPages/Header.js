import React from 'react'
import styled from 'styled-components'

const StyledTagLine = styled.p`
  letter-spacing: 5.8px;
  font-size: 17px;
`
const StyledLogo = styled.img`
  margin-bottom: 15px;
`

const Header = ({ children, ...props }) => (
  <div className="text-center">
    <StyledLogo src="/logo.svg" />
    <StyledTagLine {...props}>{children}</StyledTagLine>
  </div>
)

export default Header

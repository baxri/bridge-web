import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Container } from 'reactstrap'

const Footer = styled.footer`
  width: 100%;
  padding: 10px 30px;
  /* Set the fixed height of the footer here */
  height: 90px;
  background-color: white;
  text-align: center;
`

const Copyright = styled.p`
  color: #848484;
  font-size: 12px;
`

const StyledLink = styled(Link)`
  color: #848484;
  font-size: 12px;
`

const FooterTemplate = ({ year }) => (
  <Footer>
    <Container>
      <Copyright>Copyright © {year}, Bridge. All Rights Reserved.</Copyright>
      <StyledLink to="/terms">Terms</StyledLink>
      &nbsp;&nbsp;
      <StyledLink to="/privacy">Privacy</StyledLink>
      &nbsp;&nbsp;
      <StyledLink to="/cookie">Cookies</StyledLink>
    </Container>
  </Footer>
)

const mapStateToProps = () => ({
  year: new Date().getFullYear(),
})

export default connect(mapStateToProps)(FooterTemplate)

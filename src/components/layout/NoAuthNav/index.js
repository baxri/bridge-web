import React from 'react'
import { Navbar as BsNavbar, NavbarBrand } from 'reactstrap'
import styled from 'styled-components'
import media from 'utils/styledMediaQueryFix'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import logoIcon from 'assets/icons/logo.svg'

const StyledNavbar = styled(BsNavbar)`
  padding: 16px;
  background-color: #ffffff;
`
const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  justify-content: space-between;

  ${media.lessThan('large')`
    text-align:center;
  `}

  ${media.greaterThan('large')`
    max-width: 1140px;
    width:100%;
  `}
`

class NoAuthNav extends React.Component {
  state = {
    isOpen: false,
  }
  toggle = () => {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }))
  }
  render() {
    return (
      <StyledNavbar light expand="lg">
        <Container>
          <NavbarBrand tag={Link} to="/">
            <img src={logoIcon} height="27px" alt="Bridge" />
          </NavbarBrand>
        </Container>
      </StyledNavbar>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    authenticated: auth.authenticated,
  }
}

export default connect(mapStateToProps)(NoAuthNav)

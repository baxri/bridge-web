import React from 'react'
import {
  Navbar as BsNavbar,
  NavbarBrand,
  NavbarToggler,
  //  Container,
} from 'reactstrap'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import media from 'utils/styledMediaQueryFix'
import { connect } from 'react-redux'

//import bellIcon from 'assets/icons/bell.svg' //Import file is hidden for time being will be used later
import logoIcon from 'assets/icons/logo.svg'
import Collapse from './Collapse'

const StyledNavbar = styled(BsNavbar)`
  padding: 4px 2px;
  background-color: #ffffff;

  ${media.greaterThan('large')`
    border-bottom: 1px solid #e3e3e3;
  `}
`
// This code is commented for time being will be used later

/*const Bell = styled.div`
  width: 28px;
  height: 28px;
  background-repeat: no-repeat;
  background-image: url(${bellIcon});
  background-size: cover;
  border: none;
  cursor: pointer;

  ${media.greaterThan('large')`
    margin-left: auto;
  `}

`*/

const StyledNavbarToggler = styled(NavbarToggler)`
  border: none !important;
`

const NavBrand = styled(NavbarBrand)`
  ${media.lessThan('large')`
    flex: 1;
    text-align: center;
    padding-right: 42px;
  `}
`

const Container = styled.div`
  width: 100%;
  margin-right: auto;
  margin-left: auto;

  ${media.greaterThan('large')`
    max-width:1920px;
    padding-right: 15px;
    padding-left: 15px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  `}

  ${media.lessThan('large')`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    max-width:1140px;
    padding-right: 0;
    padding-left: 0
  `}
`

class Navbar extends React.Component {
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
          <StyledNavbarToggler onClick={this.toggle} />

          <NavBrand tag={Link} to="/">
            <img src={logoIcon} height="17px" alt="Bridge" />
          </NavBrand>

          {this.props.authenticated && (
            <React.Fragment>
              {/*  <Bell /> */}{' '}
              {/* Html code is commented for time being will be used later*/}
              <Collapse isOpen={this.state.isOpen} toggle={this.toggle} />
            </React.Fragment>
          )}
        </Container>
      </StyledNavbar>
    )
  }
}

const mapStateToProps = ({ auth }) => ({
  authenticated: auth.authenticated,
})

export default connect(mapStateToProps)(Navbar)

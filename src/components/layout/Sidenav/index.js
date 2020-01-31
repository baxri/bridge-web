import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import media from 'utils/styledMediaQueryFix'

import eyeIcon from 'assets/icons/eye.svg'
import introIcon from 'assets/icons/intro.svg'
import contactIcon from 'assets/icons/contact.svg'
// import settingIcon from 'assets/icons/setting.svg'

import Item from './Item'

const StyledUl = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  ${media.lessThan('large')`
    display: flex;
    justify-content: space-between;

    & > li {
      flex: 0;
    }
  `}
`

const StyledSidenav = styled.div`
  background-color: #ffffff;

  ${media.greaterThan('large')`
    position: fixed;
    height: calc(73vh - 0px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `}

  ${media.lessThan('large')`
    border-bottom: 1px solid #e3e3e3;
    padding: 0 15px;
    margin: 0 -15px;
  `}
`

// const StyledLinks = styled.ul`
//   list-style: none;
//   margin: 0;
//   padding: 0;
//   margin-left: 20px;
//   a {
//     color: #909090;
//   }
//   ${media.lessThan('large')`
//     display: none;
//   `}
// `

const Sidenav = ({ location }) => {
  const checkActive = pathname => location.pathname === pathname

  return (
    <StyledSidenav>
      <StyledUl>
        <Item
          icon={eyeIcon}
          to="/"
          label="Overview"
          active={checkActive('/')}
        />
        <Item
          icon={introIcon}
          to="/introductions"
          label="Intros"
          active={checkActive('/introductions')}
        />
        <Item
          icon={contactIcon}
          to="/contacts"
          label="Contacts"
          active={checkActive('/contacts')}
        />
        {/* <Item icon={settingIcon} to="/settings" label="Settings" active={checkActive('/settings')} /> */}
      </StyledUl>

      {/* <StyledLinks>
        <li>
          <a href="/">AGB</a>
        </li>
        <li>
          <a href="/">Datenschutz</a>
        </li>
        <li>
          <a href="/">Impressum</a>
        </li>
      </StyledLinks> */}
    </StyledSidenav>
  )
}

export default withRouter(Sidenav)

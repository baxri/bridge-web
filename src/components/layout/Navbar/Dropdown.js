import React from 'react'
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { Avatar } from 'components/shared'

const UserName = styled.div`
  font-weight: 500;
  margin-left: 10px;
  display: inline-block;
`

const DropdownAvatar = styled(Avatar)`
  display: inline-block;
`

const Dropdown = ({ authenticated, name, profilePicUrl }) => (
  <UncontrolledDropdown nav inNavbar>
    <DropdownToggle nav caret>
      <span>
        <DropdownAvatar profile_pic_url={profilePicUrl} name={name} />
        <UserName>{name}</UserName>
      </span>
    </DropdownToggle>
    <DropdownMenu right>
      <DropdownItem tag={Link} to="/profile">
        Profile
      </DropdownItem>
      <DropdownItem divider />
      <DropdownItem tag={Link} to="/logout">
        Logout
      </DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
)

function mapStateToProps({ auth }) {
  return {
    authenticated: auth.authenticated,
    name: `${auth.user.first_name} ${auth.user.last_name}`,
    profilePicUrl: auth.user && auth.user.profile_pic_url,
  }
}

export default connect(mapStateToProps)(Dropdown)

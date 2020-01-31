import React from 'react'
import { connect } from 'react-redux'
import SelectedContact from './SelectedContact'

const You = ({ user, position }) => (
  <SelectedContact
    name={user.first_name}
    position={position}
    profile_pic_url={user.profile_pic_url}
    isYou
  />
)

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
})

export default connect(
  mapStateToProps,
  {}
)(You)

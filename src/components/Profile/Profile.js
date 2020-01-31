import React, { Component } from 'react'
import { getItem } from 'utils/storage'
import { connect } from 'react-redux'
import { pick } from 'lodash'
import styled from 'styled-components'
import { Cloudinary } from 'cloudinary-core'

import {
  fetchUser,
  updateUser,
  resetMessage,
  resetErrorMessage,
} from 'intropath-core/actions/user'
import { softDeleteAccount } from 'intropath-core/actions/auth'
import ProfileForm from './ProfileForm'
import { Avatar, Heading, Button, Flash } from 'components/shared'
import uuid from 'utils/uuid'

const UserName = styled.div`
  font-weight: 500;
  margin-left: 10px;
  display: inline-block;
  color: #969696;
  font-size: 22px;
`

const ProfilePicture = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'hvkuwg1ho'

class Profile extends Component {
  constructor(props) {
    super(props)

    this.cl = Cloudinary.new({ cloud_name: CLOUD_NAME })
  }

  componentWillMount() {
    const { loaded, fetchUser } = this.props

    if (!loaded) {
      const user = getItem('user')
      fetchUser(user.id)
    }

    this.uploader = window.cloudinary.createUploadWidget(
      {
        cloudName: CLOUD_NAME,
        sources: ['local', 'url', 'camera'],
        multiple: false,
        clientAllowedFormats: ['png', 'jpeg'],
        maxFileSize: 1000000,
        cropping: true,
        croppingAspectRatio: 1,
        uploadPreset: 'q4wqtazu',
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          let profile_pic_url = result.info.secure_url

          if (result.info.coordinates) {
            const coords = result.info.coordinates.custom[0]
            profile_pic_url = this.cl.url(result.info.public_id, {
              x: coords[0],
              y: coords[1],
              width: coords[2],
              height: coords[3],
              crop: 'crop',
            })
          }
          this.props.updateUser(this.props.profile.id, {
            profile_pic_url,
            pic_type: 'uploaded',
          })
        }
      }
    )
  }

  render() {
    const {
      loaded,
      profile,
      message,
      resetMessage,
      errorMessage,
      resetErrorMessage,
    } = this.props

    return (
      <div>
        <Heading.HeaderAction text="Profile" />

        <ProfilePicture>
          <Button transparent onClick={this.openUploader}>
            <Avatar
              name={profile.first_name}
              email={profile.email}
              profile_pic_url={profile.profile_pic_url}
              size="big"
            />
          </Button>

          <UserName>Hi {profile.first_name}!</UserName>
        </ProfilePicture>

        {message && <Flash message={message} clearMessage={resetMessage} />}

        {errorMessage && (
          <Flash
            type="error"
            message={errorMessage}
            clearMessage={resetErrorMessage}
          />
        )}

        {loaded && (
          <ProfileForm
            initialValues={profile}
            onSubmit={this.handleFormSubmit}
            handleDelete={this.handleDelete}
          />
        )}
      </div>
    )
  }

  openUploader = () => {
    this.uploader.update({
      publicId: 'user_avatar_' + this.props.profile.id + '_' + uuid(),
    })
    this.uploader.open()
  }

  handleDelete = () => {
    if (window.confirm('Are you sure?')) {
      this.props.softDeleteAccount(this.props.profile.id)
    }
  }

  handleFormSubmit = formValues => {
    const values = pick(formValues, ['first_name', 'last_name'])
    this.props.updateUser(this.props.profile.id, values)
  }
}

const mapStateToProps = state => ({
  ...state.user,
})

const mapDispatchToProps = {
  softDeleteAccount,
  fetchUser,
  updateUser,
  resetMessage,
  resetErrorMessage,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)

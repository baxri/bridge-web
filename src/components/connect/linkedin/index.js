import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import media from 'utils/styledMediaQueryFix'
import { When } from 'react-if'

import { getItem } from 'utils/storage'
import {
  fetchUser,
  uploadLinkedIn,
  resetMessage,
  resetErrorMessage,
} from 'intropath-core/actions/user'
import { updateContacts } from 'intropath-core/actions/update'
import { Heading, Button, Flash } from 'components/shared'

const LinkedInForm = styled.form`
  display: flex;
  justify-content: space-between;
  padding: 15px 0;

  ${media.lessThan('large')`
    flex-direction: column;
    align-items: center;
  `}
`

class ConnectLinkedIn extends Component {
  constructor(props) {
    super(props)

    this.state = {
      uploading: false,
    }
  }

  componentWillMount() {
    const { loaded, fetchUser } = this.props

    if (!loaded) {
      const user = getItem('user')
      fetchUser(user.id)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ uploading: false })
  }

  handleChange = e => {
    this.props
      .uploadLinkedIn(e.target.files[0])
      .then(() => this.props.updateContacts())
    this.setState({ uploading: true })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.refs.file_upload.click()
  }

  render() {
    const {
      loaded,
      uploaded,
      message,
      resetMessage,
      error,
      resetErrorMessage,
    } = this.props
    const { uploading } = this.state

    return (
      <div>
        <div>
          <Heading.HeaderAction text="Import Your LinkedIn Contacts" />

          <When condition={message !== ''}>
            <Flash message={message} clearMessage={resetMessage} />
          </When>

          <When condition={error}>
            <Flash
              type="error"
              message={error}
              clearMessage={resetErrorMessage}
            />
          </When>

          <When condition={loaded}>
            <div style={{ marginTop: '30px', marginBottom: '20px' }}>
              <p>
                1. Open your{' '}
                <a
                  href="https://www.linkedin.com/psettings/member-data"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'underline' }}
                >
                  LinkedIn Data Archive page
                </a>
                .
              </p>
              <p>
                2. Download your data by selecting <b>The Works</b> and clicking
                on <b>Request Archive</b>.
              </p>
              <p>
                <img
                  src="/img/linkedin-request-archive.png"
                  alt="LinkedIn Request Archive"
                  style={{ height: '400px' }}
                />
              </p>
              <p>3. Upload your LinkedIn archive.</p>
              <LinkedInForm
                className="linkedin-upload-form"
                onSubmit={this.handleSubmit}
              >
                <input
                  type="file"
                  ref="file_upload"
                  style={{ display: 'none' }}
                  onChange={this.handleChange}
                  accept=".zip"
                />
                <Button type="submit">
                  {uploading
                    ? 'Uploading...'
                    : uploaded
                    ? 'Uploaded'
                    : 'Upload'}
                </Button>
              </LinkedInForm>
            </div>
          </When>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { ...state.user }
}

export default connect(
  mapStateToProps,
  {
    fetchUser,
    uploadLinkedIn,
    resetMessage,
    resetErrorMessage,
    updateContacts,
  }
)(ConnectLinkedIn)

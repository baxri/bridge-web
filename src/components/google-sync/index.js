import React from 'react'
import { withSnackbar } from 'notistack'
import { connect } from 'react-redux'
import queryString from 'query-string'
import {
  GoogleSyncWrapper,
  Body,
  HandShakeImage,
  HandShakeLogoWrapper,
  Title,
  Text,
  PrivacyText,
  GoogleButton,
  ButtonText,
  GoogleIcon,
  NotificationContainer,
  NotificationText,
  NotificationSubText,
} from './styled'
import Header from './Header'
import ContactsImport from './ContactsImportForm'

import googleOAuth from 'utils/googleOAuth'
import { createContacts } from 'intropath-core/actions/contacts'
import {
  addToken,
  fetchAccessToken,
  updateUser,
} from 'intropath-core/actions/user'
import importContacts from 'utils/importContacts'

class GoogleSync extends React.PureComponent {
  state = {
    isGoogleSignIn: false,
    totalContacts: 0,
    importedContacts: 0,
    syncing: false,
  }

  componentDidMount() {
    this.query = queryString.parse(this.props.location.search)
    if (this.query.importing) this.onGoogleSignIn()
  }

  onClose = () => {
    if (this.query.redirectOnClose) {
      this.props.history.push(this.query.redirectOnClose)
    } else {
      this.props.history.goBack()
    }
  }

  redirectAfterFinish = () => {
    this.query = queryString.parse(this.props.location.search)
    if (this.query.redirectAfter) {
      this.props.history.push(this.query.redirectAfter)
    } else {
      this.onClose()
    }
  }

  onGoogleSignIn = () => {
    googleOAuth()
      .then(({ token, profile_pic_url }) => {
        const { user, addToken, updateUser } = this.props
        addToken(token)
        if (profile_pic_url) {
          updateUser(user.id, {
            profile_pic_url,
            pic_type: 'token',
            token_id: token.id,
          })
        }

        return token
      })
      .then(token => this.importGoogleContacts(token))
      .catch(err => {
        if (err && err.error && err.error === 'popup_blocked_by_browser') {
          window.alert(
            'Popup is required to connect google account. Please, allow popup in browser and try again.'
          )
        } else {
          window.Raven.captureException(JSON.stringify(err))
        }

        console.log(err)
        this.props.enqueueSnackbar(
          'Error: Contacts did not sync. ' +
            (err && err.error ? 'Reason: ' + err.error : ''),
          {
            variant: 'error',
            autoHideDuration: 10000,
          }
        )
      })
  }

  importGoogleContacts = token => {
    if (!token) return

    let contacts = []

    this.setState({ isGoogleSignIn: true })
    fetchAccessToken(token.id)
      .then(({ data }) => {
        return importContacts(
          data.access_token,
          totalContacts => this.setState({ totalContacts }),
          newContacts => {
            contacts = contacts.concat(newContacts)
            const importedContacts =
              contacts.length > this.state.totalContacts
                ? this.state.totalContacts
                : contacts.length
            this.setState({ importedContacts })
          }
        )
      })
      .then(() => {
        // TODO Because contacts might have 0, 1 or more emails then import contact
        // will not match with total contact count so this is a hacky workaround for now
        this.setState({
          syncing: true,
          importedContacts: this.state.totalContacts,
        })

        if (contacts.length > 0) {
          this.props
            .createContacts({ contacts, token_id: token.id })
            .then(() => {
              this.redirectAfterFinish()
            })
        } else {
          this.redirectAfterFinish()
        }
      })
      .catch(e => {
        this.setState({ isGoogleSignIn: false })
        window.Raven.captureException(JSON.stringify(e))
      })
  }

  render() {
    const { tokenIsIvalid } = queryString.parse(this.props.location.search)
    const { totalContacts, importedContacts, syncing } = this.state
    return (
      <GoogleSyncWrapper>
        <Header onClose={this.onClose} title="Sync Contacts" />
        {!this.state.isGoogleSignIn && tokenIsIvalid === '1' && (
          <NotificationContainer>
            <NotificationText>
              Your connected google account needs your attention.{' '}
              <NotificationSubText>
                Please sync contacts again.
              </NotificationSubText>
            </NotificationText>
          </NotificationContainer>
        )}
        <Body>
          {this.state.isGoogleSignIn ? (
            <ContactsImport
              total={totalContacts}
              importedContacts={importedContacts}
              syncing={syncing}
            />
          ) : (
            <div>
              <HandShakeLogoWrapper>
                <HandShakeImage src="/img/handshake.svg" />
              </HandShakeLogoWrapper>
              <Title>Bridge makes introductions easy.</Title>
              <Text>
                In order to help you make introductions that are personal and
                affective, Bridge needs your permission to send emails from your
                account.
              </Text>
              <GoogleButton onClick={this.onGoogleSignIn}>
                <ButtonText>Sync Your Contacts</ButtonText>
                <GoogleIcon src="/img/icons/icon-google.svg" />
              </GoogleButton>
              <PrivacyText>
                At no time does Bridge have access to your emails. Think of
                Bridge as a personal assistant to help you send and manage
                intros on your behalf. You can revoke access at any time and
                delete your account if Bridge is no longer useful for you.
              </PrivacyText>
            </div>
          )}
        </Body>
      </GoogleSyncWrapper>
    )
  }
}

function mapStateToProps({ auth }) {
  return {
    user: auth.user,
  }
}

export default connect(
  mapStateToProps,
  { createContacts, addToken, updateUser }
)(withSnackbar(GoogleSync))

import React, { Component } from 'react'
import { connect } from 'react-redux'

import Form from './Form'
import Confirmation from './Confirmation'
import { Flash } from 'components/shared'

import { resetErrorMessage as resetContactsErrorMessage } from 'intropath-core/actions/contacts'

import { updateContacts } from 'intropath-core/actions/update'

import { findShareByEmail, share, resetErrorMessage } from 'actions/share'

class Container extends Component {
  state = {
    status: 'ready',
  }

  componentWillMount() {
    this.props.updateContacts(false, false)
  }

  render() {
    const { status } = this.state
    const {
      user,
      errorMessage,
      resetErrorMessage,
      contactsLoaded,
      contacts,
      contactsErrorMessage,
      resetContactsErrorMessage,
    } = this.props

    if (!contactsLoaded) return null

    if (status === 'done') {
      return <Confirmation onClickShareAgain={this.handleShareAgain} />
    }

    const showMessageInput =
      user.tokens && user.tokens.length > 0 ? true : false

    // TODO Remove temporary is_special_user hack once https://gitlab.com/intropath/intro-extension/issues/13 has been done
    const isSpecialUser =
      user.id.toUpperCase() === '8E9BBEB7-A832-4EE8-9C73-88035FD37710' || // Connor
      user.id.toUpperCase() === 'B80FA875-66D7-491F-8300-C85F0AFB62BA' || // Connor
      user.id.toUpperCase() === '8C93C279-F89A-493A-B8E7-51F53017E1D4' || // Chico
      user.id.toUpperCase() === 'CA69A6C7-8115-447C-8AFC-01F76E07EB5D' // Chico
        ? true
        : false
    const initialMessage = isSpecialUser
      ? 'Hi,\n\nI want to share my network of 2608 contacts in 1000+ companies with you.'
      : 'Hi,\n\nI want to share my network with you.'
    const initialValues = showMessageInput ? { message: initialMessage } : {}
    initialValues.contacts_enabled = true

    return (
      <div className="page intro">
        <div className="container">
          {errorMessage && (
            <Flash
              type="error"
              message={errorMessage}
              clearMessage={resetErrorMessage}
            />
          )}
          {contactsErrorMessage && (
            <Flash
              type="error"
              message={contactsErrorMessage}
              clearMessage={resetContactsErrorMessage}
            />
          )}
          <header
            style={{ textAlign: 'center', marginBottom: 40, marginTop: 10 }}
          >
            <h1>Share Network</h1>
          </header>
          {status === 'ready' && (
            <Form
              contacts={contacts}
              showMessageInput={showMessageInput}
              initialValues={initialValues}
              onSubmit={this.handleFormSubmit}
            />
          )}
        </div>
      </div>
    )
  }

  handleShareAgain = () =>
    this.setState({
      status: 'ready',
    })

  handleFormSubmit = ({ ...values }) => {
    if (!values.contact.email) {
      if (values.contact_email) {
        values.contact.email = values.contact_email
      } else if (values.contact_name) {
        values.contact.email = values.contact.name
        values.contact.name = values.contact_name
      }
    }

    this.props.findShareByEmail(values.contact.email).then(response => {
      const confirmMsg =
        "You've already shared your network with " +
        (values.contact.name ? values.contact.name : values.contact.email) +
        '. Are you sure you want to continue?'
      // eslint-disable-next-line
      if (
        response.status === 404 ||
        (response.status === 200 && window.confirm(confirmMsg))
      ) {
        this.props.share(values).then(response => {
          this.setState({ status: 'done' })
        })
      }
    })
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    errorMessage: state.share.error,
    contactsLoaded: state.contacts.loaded,
    contacts: state.contacts.list,
    contactsErrorMessage: state.contacts.error,
  }
}

export default connect(
  mapStateToProps,
  {
    findShareByEmail,
    share,
    resetErrorMessage,
    updateContacts,
    resetContactsErrorMessage,
  }
)(Container)

import React from 'react'
import { Button } from 'components/shared'
import { connect } from 'react-redux'
import { sendEmailConfirmation } from 'intropath-core/actions/auth'
import { withSnackbar } from 'notistack/build/index'

import { Alert } from 'components/shared'

const ConfirmationAlert = React.memo(
  ({
    confirmed,
    authenticated,
    sendEmailConfirmation,
    enqueueSnackbar,
    intros,
  }) => {
    if (!authenticated || confirmed || !intros) return null

    const send = () => {
      sendEmailConfirmation()
        .then(() => {
          enqueueSnackbar('Confirmation Email Sent')
        })
        .catch(() => {
          enqueueSnackbar('Error! Please, try later')
        })
      return false
    }

    return (
      <Alert>
        You have received {intros} intros to date.
        <br />
        To view details of these intros please Sync your Gmail or verify your
        email.
        <br />
        <Button onClick={send} linkButton>
          Send Confirmation Email
        </Button>
      </Alert>
    )
  }
)

function mapStateToProps({ auth, count: { overview } }) {
  return {
    confirmed: auth.user ? auth.user.confirmed : true,
    authenticated: auth.authenticated,
    intros: overview.hidden_received_intros,
  }
}

export default connect(
  mapStateToProps,
  { sendEmailConfirmation }
)(withSnackbar(ConfirmationAlert))

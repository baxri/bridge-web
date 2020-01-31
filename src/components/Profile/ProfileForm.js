import React from 'react'
import { reduxForm } from 'redux-form'
import styled from 'styled-components'
import { Row, Col } from 'reactstrap'
import media from 'utils/styledMediaQueryFix'
import history from 'utils/history'

import GmailAccountsTable from './GmailAccountsTable'
import { Button, Field as CustomField } from 'components/shared'

const FormAction = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 0;

  ${media.lessThan('large')`
    flex-direction: column;
    align-items: center;
  `}
`

const FormButtons = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    margin-right: 5px;
  }

  a {
    margin-left: 5px;
  }
  ${media.lessThan('large')`
    margin-bottom: 15px;

  `}
`

/* TODO Add back in once LinkedIn import is fixed
const ImportLinkedin = styled.div`
  text-align: right;
  padding: 15px 0;
  ${media.lessThan('large')`
    text-align: center;
  `}
`
*/

const form = reduxForm({
  form: 'profile',
  validate,
})

function validate(form) {
  const errors = {}

  if (!form.first_name) errors.first_name = 'Please enter a first name'

  if (!form.last_name) errors.last_name = 'Please enter a last name'

  return errors
}

const onCancelClick = e => {
  e.preventDefault()
  history.push('/')
}

const ProfileForm = ({ handleSubmit, handleDelete }) => (
  <form onSubmit={handleSubmit}>
    <Row>
      <Col lg={6} xs={12}>
        <CustomField
          label="First Name"
          id="first_name"
          name="first_name"
          type="text"
        />

        <CustomField
          label="Last Name"
          id="last_name"
          name="last_name"
          type="text"
        />
      </Col>
    </Row>

    <FormAction>
      <FormButtons>
        <Button type="submit">Save</Button>
        <Button secondary onClick={onCancelClick}>
          Cancel
        </Button>
      </FormButtons>

      <div>
        <Button alt="true" danger type="button" onClick={handleDelete}>
          Delete Account
        </Button>
      </div>
    </FormAction>

    <GmailAccountsTable />

    {/* TODO Add back in once LinkedIn import is fixed
    <ImportLinkedin>
      <Button link
        className='import-linkedin'
        to="/connect/linkedin"
      >
        Import LinkedIn Contacts
      </Button>
    </ImportLinkedin>
    */}
  </form>
)

export default form(ProfileForm)

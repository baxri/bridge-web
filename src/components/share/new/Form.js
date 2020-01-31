import React, { Component } from 'react'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import EmailValidator from 'email-validator'
import { trim } from 'lodash'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Row, Col } from 'reactstrap'

import { getSuggestedContacts } from 'components/shared/components/Autosuggest/AutoSuggestContacts'
import extractFirstName from 'utils/extractFirstName'

import {
  Button,
  AutosuggestTagsInputField,
  FormGroupField,
  Textarea,
} from 'components/shared'

const renderCheckbox = ({ meta, input, ...props }) => (
  <input type="checkbox" checked={input.value} {...input} {...props} />
)

class Form extends Component {
  componentDidMount() {
    this.contactInput.focus()
  }

  componentWillReceiveProps({ contact_name, initialValues }) {
    if (contact_name && contact_name !== this.props.contact_name) {
      const initialMessageValue = initialValues.message || ''
      this.props.change(
        'message',
        initialMessageValue.replace(
          'Hi,',
          `Hi ${extractFirstName(contact_name)},`
        )
      )
    }
  }

  handleFormChange = (e, newValue) => {
    const initialMessageValue = this.props.initialValues
      ? this.props.initialValues.message
      : null
    if (
      initialMessageValue &&
      newValue &&
      newValue.name &&
      newValue.name.length > 0 &&
      !EmailValidator.validate(newValue.name)
    ) {
      this.props.change(
        'message',
        initialMessageValue.replace(
          'Hi,',
          `Hi ${extractFirstName(newValue.name)},`
        )
      )
    }
    this.props.change('contact_email', '')
    this.props.change('contact_name', '')
  }

  render() {
    const { handleSubmit, showMessageInput, contact } = this.props

    return (
      <form className="intro-form" onSubmit={handleSubmit}>
        <Row className="row-centered">
          <Col lg={6} className="col-centered offset-lg-3">
            <div>
              <AutosuggestTagsInputField
                ref={el =>
                  (this.contactInput = el && el.getRenderedComponent())
                }
                inputProps={{
                  placeholder: 'e.g. John Smith',
                }}
                label="Share network with"
                name="contact"
                parse={value => (value.length ? value[0] : null)}
                maxTags={1}
                onChange={this.handleFormChange}
                autosuggestProps={{
                  suggestions: this.props.contacts,
                  getSuggestionMatch,
                  renderSuggestion,
                  getSuggestions: getSuggestedContacts,
                  getSuggestionValue,
                  limit: 50,
                }}
              />
            </div>
            {contact && !contact.name && (
              <FormGroupField
                label={`What is ${extractFirstName(contact.email)}'s name?`}
                name="contact_name"
              />
            )}
            {contact && !contact.email && (
              <FormGroupField
                label={`What is ${extractFirstName(contact.name)}'s email?`}
                name="contact_email"
              />
            )}
            {showMessageInput && (
              <Row>
                <Col lg={12} xs={12}>
                  <label>Message</label>
                  <FormGroupField
                    name="message"
                    rows="4"
                    component={Textarea}
                    className=""
                  />
                </Col>
              </Row>
            )}
            <Row>
              <Col lg={12} xs={12}>
                <div className="checkbox">
                  <label style={{ marginTop: 30 }}>
                    <Field name="contacts_enabled" component={renderCheckbox} />{' '}
                    Include contact details
                  </label>
                </div>
              </Col>
            </Row>
            <Button
              style={{ marginTop: '20px' }}
              type="submit"
              id="share-contact"
            >
              Share Network
            </Button>
          </Col>
        </Row>
      </form>
    )
  }
}

const getSuggestionMatch = suggestion => {
  return `${suggestion.name} ${suggestion.email}`
}

function renderSuggestion(suggestion) {
  return (
    <span>
      <span>{suggestion.name}</span>
      {suggestion.name && ' '}
      <small>{suggestion.email}</small>
    </span>
  )
}

const getSuggestionValue = ({ name, email }) => trim(name) || email

const validate = values => {
  const errors = {}

  if (!values.contact) {
    errors.contact = 'Please enter a name'
  } else if (values.contact.name && !values.contact.email) {
    if (EmailValidator.validate(values.contact.name)) {
      if (!values.contact_name) {
        errors.contact_name = 'Please enter a name'
      }
    } else if (!EmailValidator.validate(values.contact_email)) {
      errors.contact_email = 'Please enter an email'
    }
  }

  return errors
}

const form = reduxForm({
  form: 'shareForm',
  validate,
  enableReinitialize: true,
})

const formSelector = formValueSelector('shareForm')

const extractContact = state => {
  let contact = formSelector(state, 'contact')

  if (contact && !contact.email && EmailValidator.validate(contact.name))
    contact = { ...contact, name: '', email: contact.name }

  return contact
}

const mapStateToProps = (state, { initialValues }) => {
  const values = {
    initialValues: {
      ...initialValues,
      ...(initialValues &&
        initialValues.contact && {
          contact: {
            name: initialValues.contact_name,
            email: initialValues.contact_email,
          },
        }),
    },
    contact: extractContact(state),
    contact_name: formSelector(state, 'contact_name'),
  }
  return values
}

export default compose(
  connect(mapStateToProps),
  form
)(Form)

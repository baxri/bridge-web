import React, { Component } from 'react'
import { isEmail } from 'validator'
import PropTypes from 'prop-types'
import { isMobile } from 'react-device-detect'
import ConnectorMessage from 'components/shared/components/ConnectorMessage'
//import ConfirmationSuccess from './ConfirmationSuccess'
import { ConfirmWrapper } from './styled'

import extractFirstName from 'utils/extractFirstName'
import Header from './Header'
import Field from './Field'
import { withSnackbar } from 'notistack'
import { linkedinRegex } from 'utils/validation'

const validationErrorFieldsNames = {
  reason: 'why would you like the intro',
  bio: 'bit about yourself',
  from: 'your name',
  from_email: 'your email',
}

const validate = (fld, value) => {
  if (
    ['reason', 'bio', 'from', 'from_email'].includes(fld) &&
    value.length === 0
  ) {
    return `Please enter a ${validationErrorFieldsNames[fld]}`
  }

  if (fld === 'from' && value.length < 3)
    return `Please enter at least 3 characters`

  if (fld === 'from_email' && value.length > 0 && !isEmail(value))
    return `Please enter a valid email`

  if (
    fld === 'linkedin_profile_url' &&
    value.length > 0 &&
    !linkedinRegex.test(value)
  ) {
    return 'Invalid LinkedIn URL'
  }

  return false
}

const count = (fld, value) => {
  if (!['bio', 'reason'].includes(fld)) return [false, '']

  return [value.length < 50 || value.length > 500, `${value.length} characters`]
}

const FormField = React.memo(
  ({ name, value = '', active, onChange, onBlur, ...rest }) => {
    const error = validate(name, value)
    const [warning, message] = count(name, value)

    return (
      <Field
        name={name}
        value={value}
        warning={warning}
        valid={!error}
        error={!active && error}
        message={message}
        onChange={onChange(name)}
        onBlur={onBlur(name)}
        {...rest}
      />
    )
  }
)

class ConfirmFormNoAuth extends Component {
  state = {
    values: {},
    active: {},
    submiting: false,
  }

  componentDidMount() {
    this.setValues()
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.intro && this.props.intro) {
      this.setValues()
    }
  }

  setValues() {
    if (!this.props.intro) return

    const values = {},
      active = {}

    ;['reason', 'bio', 'linkedin_profile_url', 'from', 'from_email'].forEach(
      k => {
        values[k] = this.props.intro[k] || ''
        active[k] = true
      }
    )

    this.setState({ values, active })
  }

  onChange = fld => e => {
    const { values, active } = this.state
    values[fld] = e.target.value
    active[fld] = true

    this.setState({
      values: { ...values },
      active: { ...active },
    })
  }

  onBlur = fld => e => {
    const { active, values } = this.state

    active[fld] = false
    if (values[fld]) values[fld] = e.target.value.trim()

    this.setState({ active: { ...active }, values: { ...values } })
  }

  onSend = () => {
    const { introId, token } = this.props

    if (this.state.submiting) {
      return false
    }

    this.setState({ submiting: true }, () => {
      this.props
        .confirmIntroductionNoAuth(introId, this.state.values, token, true)
        .then(() => {
          this.props.enqueueSnackbar('Forwardable Sent', {})
          this.props.mixpanelAccept()
          //this.setState({ submiting: false })
        })
        .catch(e => {
          this.setState({ submiting: false })
          this.props.enqueueSnackbar('Error! Please, try later', {})
        })
    })
  }

  isValid() {
    return Object.keys(this.state.values)
      .map(k => !!validate(k, this.state.values[k]))
      .reduce((prev, current) => prev || current, false)
  }

  renderForm(type = 'n1Forwardable') {
    const { intro } = this.props
    const { values, active, submiting } = this.state
    const isForwardable = type === 'n1Forwardable'

    const toName = intro ? extractFirstName(intro.to) : ''
    const reasonLabel = isForwardable
      ? `Why would you like an intro to ${toName}? (Tip - Write this as if you were writing directly to ${toName})`
      : `Why would you like an intro to ${toName}?`
    const linkedInLabel = isForwardable
      ? `Your LinkedIn (Optional):`
      : `Your LinkedIn:`

    return (
      <ConfirmWrapper>
        {isForwardable && (
          <Header
            title="Create Forwardable"
            onAction={this.onSend}
            actionTitle={submiting ? 'Sending...' : 'Send'}
            actionProps={{
              disabled: this.isValid() || submiting,
            }}
          />
        )}
        {!isForwardable && <Header title="Create Forwardable" />}

        <ConnectorMessage type={type} intro={intro} />

        <FormField
          name="reason"
          label={reasonLabel}
          type="textarea"
          info="(recommended 50 - 500 characters)"
          value={values.reason}
          active={active.reason}
          onChange={this.onChange}
          onBlur={this.onBlur}
          disabled={!isForwardable}
        />

        <FormField
          name="bio"
          label={`Tell ${toName} a bit about yourself:`}
          type="textarea"
          info="(recommended 50 - 500 characters)"
          value={values.bio}
          active={active.bio}
          onChange={this.onChange}
          onBlur={this.onBlur}
          disabled={!isForwardable}
        />

        {(isForwardable || values.linkedin_profile_url) && (
          <FormField
            name="linkedin_profile_url"
            label={linkedInLabel}
            type="text"
            optional
            value={values.linkedin_profile_url}
            active={active.linkedin_profile_url}
            onChange={this.onChange}
            onBlur={this.onBlur}
            disabled={!isForwardable}
          />
        )}

        <FormField
          name="from"
          label="Your Name:"
          type="text"
          info="(min 3)"
          value={values.from}
          active={active.from}
          onChange={this.onChange}
          onBlur={this.onBlur}
          disabled={!isForwardable}
        />
        <FormField
          name="from_email"
          label="Your Email:"
          type={isMobile ? 'email' : 'text'}
          value={values.from_email}
          active={active.from_email}
          onChange={this.onChange}
          onBlur={this.onBlur}
          disabled={!isForwardable}
        />

        {isForwardable && (
          <Header
            title=""
            onAction={this.onSend}
            actionTitle={submiting ? 'Sending...' : 'Send'}
            actionProps={{
              disabled: this.isValid() || submiting,
            }}
          />
        )}
      </ConfirmWrapper>
    )
  }

  render() {
    const { intro } = this.props

    if (!intro) return null

    if (
      intro.status &&
      (intro.status !== 'initialized' && intro.status !== 'confirmed')
    ) {
      return this.renderForm('n1ForwardableWrongStatus')
    }

    return this.renderForm()
  }
}

ConfirmFormNoAuth.propTypes = {
  intro: PropTypes.object,
}

export default withSnackbar(ConfirmFormNoAuth)

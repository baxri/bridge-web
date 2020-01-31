// TODO Should be using redux-form but typing in the inputs was very slow for some reason, needs investigating & fixing!

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { validate as isEmail } from 'email-validator'

import extractFirstName from 'utils/extractFirstName'
import { IntroContext, LoadingData as Spinner } from 'components/shared'

import autosize from 'autosize'

import Input from '../new/Input'
import { StyledButton } from './styled'

class PublishForm extends Component {
  constructor(props) {
    super()

    const { to_email, note } = this.initialState(props)

    this.state = {
      to_email,
      to_email_error: false,
      to_invalid_email_error: false,
      note,
      note_error: false,
      edited: false,
    }
  }

  componentDidMount() {
    this.textarea && autosize(this.textarea)
    this.setState(this.initialState(this.props))
  }

  componentWillUnmount() {
    this.textarea && autosize.destroy(this.textarea)
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.initialState(nextProps))
  }

  initialState = props => {
    const { intro } = props
    if (!intro) {
      return {}
    }

    const { to_email } = intro

    let note
    const edited = this.state ? this.state.edited : false

    if (edited) {
      note = this.state.note
    } else {
      note = intro.note
    }

    if (!edited && (!note || note.length < 1)) {
      note = `Hi ${extractFirstName(
        intro.to
      )},\n\nWould you be interested in an intro to ${intro.from}?`
      if (intro.linkedin_profile_url) {
        note += `\n${intro.linkedin_profile_url}`
      }
    }

    return { to_email, note, intro }
  }

  validate = () => {
    const { to_email, note } = this.state
    const to_email_error = !to_email || to_email.length < 1 ? true : false
    const to_invalid_email_error =
      !to_email_error && !isEmail(to_email) ? true : false
    const note_error = !note || note.length < 1 ? true : false
    this.setState({ to_email_error, to_invalid_email_error, note_error })
    return !to_email_error && !to_invalid_email_error && !note_error
  }

  onChangeToEmail = to_email => {
    this.setState({ to_email })
  }

  onChangeNote = note => {
    this.setState({ note: note, edited: true })
  }

  onSubmit = () => {
    const { to_email, note } = this.state
    if (this.validate()) {
      this.props.onSubmit({
        ...this.props.intro,
        to_email,
        note,
      })
    }
  }

  render() {
    const { submitting } = this.props
    const {
      intro,
      to_email_error,
      to_invalid_email_error,
      note_error,
    } = this.state

    if (!intro) {
      return (
        <div style={{ width: '100%', textAlign: 'center' }}>
          <Spinner loading size={6} />
        </div>
      )
    }

    return (
      <div>
        <Input
          label={`${intro.to}'s Email`}
          id="to_email"
          value={this.state.to_email}
          onChange={e => {
            this.onChangeToEmail(`${e.target.value}`)
          }}
        />
        {to_email_error && (
          <div className="invalid-feedback" style={{ display: 'block' }}>
            Please enter an email
          </div>
        )}
        {to_invalid_email_error && (
          <div className="invalid-feedback" style={{ display: 'block' }}>
            Please enter a valid email
          </div>
        )}

        <Input
          style={{ minHeight: 150 }}
          label={`Your message to ${intro.to}`}
          id="note"
          value={this.state.note}
          onChange={e => {
            this.onChangeNote(`${e.target.value}`)
          }}
          type="textarea"
          rows={5}
          innerRef={ref => (this.textarea = ref)}
        />
        {note_error && (
          <div className="invalid-feedback" style={{ display: 'block' }}>
            Please enter a note
          </div>
        )}

        <div className="text-right">
          <StyledButton
            disabled={submitting}
            onClick={this.onSubmit}
            id="publish-intro-btn"
          >
            {submitting ? 'Forwarding...' : 'Forward Intro'}
          </StyledButton>
        </div>

        <div style={{ marginTop: 10 }}>
          <label>{`Context provided by ${intro.from}`}</label>
          <IntroContext
            name={intro.from}
            bio={intro.bio}
            reason={intro.reason}
            avatarUrl={intro.from_profile_pic_url}
            linkedinUrl={intro.linkedin_profile_url}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    intro: state.introduction.intro ? { ...state.introduction.intro } : null,
  }
}

const enhance = compose(connect(mapStateToProps))

export default enhance(PublishForm)

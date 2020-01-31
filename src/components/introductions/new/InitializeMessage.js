import React from 'react'
import { When } from 'react-if'
import { connect } from 'react-redux'
import { compose } from 'redux'
import styled from 'styled-components'
import { validate as isEmail } from 'email-validator'
import { isURL } from 'validator'
import autosize from 'autosize'

import { Button } from 'components/shared'
import { withConsumer } from 'context/NewIntroContext'
import { InitializeMessageWrapper as Wrapper, FormMessage } from './styled'
import Input from './Input'
import { MixpanelContext } from 'utils/mixpanelContext'

const ErrorMsg = styled.div`
  display: block;
  position: relative;
  margin-top: -14px;
  margin-bottom: 16px;
`

// screen = [init, edit]
class InitializeMessage extends React.Component {
  constructor(props) {
    super()

    const isValid = this.isValid(props)

    this.state = {
      screen: isValid ? 'init' : 'edit',
      isValid,
      isEmpty: isValid,
      errors: {},
      submit: false,
      touched: {
        email: false,
        from_name: false,
        to_name: false,
      },
    }
  }

  componentDidMount() {
    this.textarea && autosize(this.textarea)
  }

  componentWillUnmount() {
    this.textarea && autosize.destroy(this.textarea)
  }

  static contextType = MixpanelContext

  isValid = props => {
    const { receivers, receiverIndex, from } = props
    const intro = from[0]
    const receiver = receivers[receiverIndex]
    return !!(intro.email && intro.name && receiver.name)
  }

  onBlur = field => evt => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    })
  }

  validateInput = () => {
    const intro = this.props.from[0]
    const receiver = this.props.receivers[0]

    this.validate_form(intro, receiver)
  }

  validate_form = (intro, receiver) => {
    let errors = {}

    if (intro.email === '') {
      errors.email = 'Please enter an email'
    } else if (!isEmail(intro.email)) {
      errors.email = 'Please enter a valid email'
    }

    if (intro.name === '') {
      errors.from_name = 'Please enter a name'
    }

    if (receiver.name === '') {
      errors.to_name = 'Please enter a name'
    }

    if (receiver.linkedin !== '' && !isURL(receiver.linkedin)) {
      errors.to_linkedin = 'Please enter a valid LinkedIn URL'
    }

    if (receiver.email !== '' && !isEmail(receiver.email)) {
      errors.to_email = 'Please enter a valid email'
    }

    this.setState({ errors })
  }

  isMatchToPreviousIntro = (previousIntro, newIntroFrom, newIntroTo) => {
    const previousIntroFromEmail = previousIntro.from_email
      ? previousIntro.from_email.toLowerCase()
      : null
    const previousIntroToEmail = previousIntro.to_email
      ? previousIntro.to_email.toLowerCase()
      : null

    const newIntroFromEmail = newIntroFrom.email
      ? newIntroFrom.email.toLowerCase()
      : null
    const newIntroToEmail = newIntroTo.email
      ? newIntroTo.email.toLowerCase()
      : null

    const isMatch =
      previousIntroFromEmail !== null &&
      newIntroFromEmail !== null &&
      previousIntroToEmail !== null &&
      newIntroToEmail !== null &&
      previousIntroFromEmail === newIntroFromEmail &&
      previousIntroToEmail === newIntroToEmail

    return isMatch
  }

  onSubmit = () => {
    const {
      submitting,
      introductions,
      from,
      receivers,
      receiverIndex,
    } = this.props
    if (submitting) {
      return
    }

    this.setState({ errors: {}, submit: true })

    const intro = from[0]
    const receiver = receivers[receiverIndex]

    const hasPreviousIntro = introductions.some(int =>
      this.isMatchToPreviousIntro(int, intro, receiver)
    )

    this.validate_form(intro, receiver)

    if (hasPreviousIntro) {
      if (
        window.confirm(
          "You've made this intro before. Are you sure you want to continue?"
        )
      ) {
        this.handleSubmit()
      }
    } else if (Object.keys(this.state.errors).length === 0) {
      this.handleSubmit()
    }
  }

  handleSubmit = () => {
    const isValid = this.isValid(this.props)
    if (isValid) {
      this.props.submit(() => {
        this.setState({ screen: 'init', isValid })
      })
      this.intro_created(this.props)
    } else {
      this.setState({ isValid })
    }
  }

  intro_created(props) {
    const { user, receiverIndex } = this.props
    const user_id = user ? user.id : ''
    const receiver = props.receivers[receiverIndex]
    const linkedInUrl = receiver['linkedin_profile_url']
    const includedsLinkedIn =
      linkedInUrl && linkedInUrl.length > 0 ? true : false
    const edited = receiver['initialMessage'] !== receiver['message']
    this.context.mixpanel.identify(user_id)
    this.context.mixpanel.track('INTRO_CREATED', {
      UserId: user_id,
      FromContactId: props.from[0]['id'],
      ToContactId: props.receivers[receiverIndex]['id'],
      IncludedsLinkedIn: includedsLinkedIn,
      Edited: edited,
    })
  }

  render() {
    const { submit, errors, touched } = this.state
    const {
      submitting,
      onChange,
      onChangeFrom,
      receiverIndex,
      receivers,
      from,
    } = this.props
    const receiver = receivers[receiverIndex]
    const intro = from[0]
    const introFirstName = intro.name ? intro.name.split(' ')[0] : ''
    const receiverFirstName = receiver.name ? receiver.name.split(' ')[0] : ''
    const linkedInPlaceholder = receiverFirstName
      ? `Copy & paste ${receiverFirstName}'s LinkedIn (optional)`
      : 'Copy & paste their LinkedIn (optional)'

    const showEmailError = errors.email && (submit || touched.email)
    const showFromNameError = errors.from_name && (submit || touched.from_name)
    const showToNameError = errors.to_name && (submit || touched.to_name)

    return (
      <div id="initialize-message">
        <Wrapper>
          <FormMessage>
            <When condition={intro.emptyField === 'email'}>
              <Input
                label={`${intro.name}'s email`}
                id="intro-f-email"
                value={intro.email}
                onBlur={this.onBlur('email')}
                onChange={event => {
                  onChangeFrom('email')(event)
                  this.validateInput()
                }}
                className={`${this.state.errors.email && 'is-invalid'}`}
              />
            </When>
            {showEmailError && (
              <ErrorMsg className="invalid-feedback">
                {this.state.errors.email}
              </ErrorMsg>
            )}

            <When condition={intro.emptyField === 'name'}>
              <Input
                label={`${intro.email}'s name`}
                id="intro-f-name"
                value={intro.name}
                onBlur={this.onBlur('from_name')}
                onChange={event => {
                  onChangeFrom('name')(event)
                  this.validateInput()
                }}
                className={`${this.state.errors.from_name && 'is-invalid'}`}
              />
            </When>
            {showFromNameError && (
              <ErrorMsg className="invalid-feedback">
                {this.state.errors.from_name}
              </ErrorMsg>
            )}

            <When condition={receiver.emptyField === 'name'}>
              <Input
                label={`${receiver.email}'s name`}
                id="intro-name"
                value={receiver.name}
                onBlur={this.onBlur('to_name')}
                onChange={event => {
                  onChange('name')(event)
                  this.validateInput()
                }}
                className={`${this.state.errors.to_name && 'is-invalid'}`}
              />
            </When>
            {showToNameError && (
              <ErrorMsg className="invalid-feedback">
                {this.state.errors.to_name}
              </ErrorMsg>
            )}

            <Input
              label={`Intro message to ${intro.name}`}
              id="intro-message"
              value={receiver.message}
              onChange={onChange('message')}
              type="textarea"
              rows={5}
              innerRef={ref => (this.textarea = ref)}
            />

            <Input
              label={`${receiver.name || receiver.email}'s LinkedIn`}
              id="intro-linkedin"
              defaultValue={receiver.linkedin_profile_url}
              onChange={event => {
                onChange('linkedin')(event)
                this.validateInput()
              }}
              placeholder={linkedInPlaceholder}
              className={`${this.state.errors.to_linkedin && 'is-invalid'}`}
            />
            {this.state.errors.to_linkedin && (
              <ErrorMsg className="invalid-feedback">
                {this.state.errors.to_linkedin}
              </ErrorMsg>
            )}

            <When condition={receiver.emptyField === 'email'}>
              <Input
                label={`${receiver.name}'s email`}
                id="intro-email"
                value={receiver.email}
                placeholder={'(optional)'}
                onChange={event => {
                  onChange('email')(event)
                  this.validateInput()
                }}
                className={`${this.state.errors.to_email && 'is-invalid'}`}
              />
            </When>
            {this.state.errors.to_email && (
              <ErrorMsg className="invalid-feedback">
                {this.state.errors.to_email}
              </ErrorMsg>
            )}
          </FormMessage>
        </Wrapper>

        <div className="text-right" style={{ marginLeft: 15, marginRight: 15 }}>
          <Button
            disabled={submitting}
            onClick={this.onSubmit}
            mobile={{ block: true }}
            id="new-intro-start"
          >
            {submitting ? `Sending...` : `Send to ${introFirstName}`}
          </Button>
        </div>
      </div>
    )
  }
}

const enhance = compose(
  withConsumer,
  connect(state => ({
    introductions: state.introduction.list,
    user: state.auth.user,
  }))
)

export default enhance(InitializeMessage)

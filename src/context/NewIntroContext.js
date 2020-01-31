import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { createIntroduction } from 'intropath-core/actions/introduction'

const Context = React.createContext()

// receivers = {
//   receiver_id: null,
//   profile_pic_url: null,
//   name: null,
//   message: null,
//   linkedin: null,
// }

class Provider extends React.Component {
  state = {
    submitting: false,
    from: [],
    receivers: [],
    screen: 'select_contact',
    receiverIndex: 0,
    message_edited: false,
  }

  setValues = (field, value, callback) => {
    let state = { [field]: value }
    if (field === 'receivers' && this.state.from.length) {
      const from = this.state.from[0]
      const initializeReceiver = value.map(v => {
        if (!v.message) {
          const firstName = from.name ? from.name.split(' ')[0] : from.email
          v.initialMessage = `Hi ${firstName},\n\nJust following up to make sure you want that intro to ${v.name ||
            v.email}?`
          v.message = v.initialMessage
          v.linkedin = v.linkedin_profile_url || ''
        }
        return v
      })
      state = { [field]: initializeReceiver }
    }
    this.setState(state, () => callback && callback())
  }

  onChange = field => event => {
    const receivers = [...this.state.receivers]
    receivers[this.state.receiverIndex][field] = event.target.value
    this.setState({ receivers })
    this.formatMessage(field)
  }

  onChangeFrom = field => event => {
    const from = [...this.state.from]
    from[0][field] = event.target.value
    this.setState({ from })
    this.formatMessage(field)
  }

  formatMessage = field => {
    const { from, receivers, receiverIndex } = this.state
    const intro = from[0]
    const receiver = receivers[receiverIndex]

    if (field === 'message' && !this.state.message_edited) {
      this.setState({ message_edited: true })
    }

    if (field === 'name' && !this.state.message_edited) {
      const introFirstName = intro.name ? intro.name.split(' ')[0] : intro.email
      receiver.message = !this.state.message_edited
        ? `Hi ${introFirstName},\n\nJust following up to make sure you want that intro to ${receiver.name ||
            receiver.email}?`
        : receiver.message
      this.setState({ receivers })
    }
  }

  next = screen => {
    this.setState({ screen })
  }

  goBackToIntros = () => {
    this.props.history.push('/introductions')
  }

  cancel = () => {
    const { from } = this.state
    if (!from[0]) {
      return this.goBackToIntros()
    } else if (window.confirm('Are you sure want to cancel this intro?')) {
      this.goBackToIntros()
    }
  }

  changeReceiver = receiverIndex => {
    this.setState({ receiverIndex })
  }

  submit = callback => {
    if (this.state.submitting) {
      return
    } // Do not submit more than once
    this.setState({ submitting: true })
    const { from, receivers, receiverIndex } = this.state
    const intro = from[0]
    const receiver = receivers[receiverIndex]
    const data = {
      from: intro.name,
      from_email: intro.email,
      message: receiver.message,
      to: receiver.name,
      to_email: receiver.email,
      to_linkedin_profile_url: receiver.linkedin,
    }
    this.props.createIntroduction(data).then(response => {
      this.setState({ submitting: false })
      // if multiple
      callback()
      if (receiverIndex < receivers.length - 1) {
        this.changeReceiver(receiverIndex + 1)
      } else {
        const introId = response && response.intro ? response.intro.id : null
        if (introId) {
          this.setState({ screen: 'confirmation' })
        } else {
          this.props.history.push('/')
        }
      }
    })
  }

  done = () => {
    this.props.history.push('/')
  }

  render() {
    const value = {
      ...this.state,
      next: this.next,
      cancel: this.cancel,
      onChange: this.onChange,
      submit: this.submit,
      done: this.done,
      changeReceiver: this.changeReceiver,
      setValues: this.setValues,
      onChangeFrom: this.onChangeFrom,
    }

    return (
      <Context.Provider value={value}>
        {this.props.loaded && this.props.children}
      </Context.Provider>
    )
  }
}

const withConsumer = Component => props => (
  <Context.Consumer>
    {context => <Component {...{ ...context, ...props }} />}
  </Context.Consumer>
)

const withProvider = Component => props => (
  <Provider {...props}>
    <Component {...props} />
  </Provider>
)

const enhance = compose(
  connect(
    state => ({ loaded: state.contacts.loaded }),
    { createIntroduction }
  ),
  withProvider
)

export { Provider, withConsumer, enhance as withProvider }

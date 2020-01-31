import React from 'react'
import extractFirstName from 'utils/extractFirstName'
import extractLastName from 'utils/extractLastName'
import createContactFromIntro from 'utils/createContactFromIntro'
import Linkify from 'react-linkify'
import nl2br from 'react-newline-to-break'
import {
  ConnectorMessageWrapper,
  AvatarWrapper,
  MessageWrapper,
  Title,
  Message,
  Tip,
  MakeChangesLink,
} from './styled'
import Avatar from 'components/shared/components/Avatar'

class Messages {
  static getMessage(type, connector, n1, n2, intro) {
    if (!Messages[type]) {
      console.warn(`Incorrect connector message type ${type}`)
      return null
    }

    return Messages[type](connector, n1, n2, intro)
  }

  static getN2Name(n2) {
    return n2.linkedin_profile_url ? (
      <a
        href={n2.linkedin_profile_url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {n2.name}
      </a>
    ) : (
      n2.name
    )
  }

  static n1Forwardable(connector, n1, n2, intro) {
    const greeting = n1 && n1.name ? `Hi ${extractFirstName(n1.name)},` : `Hi,`
    const n2Name = Messages.getN2Name(n2)
    const initializedMessage = (
      <React.Fragment>
        I am using Bridge to make intros smarter and easier. Can you please
        provide the information below that I can forward on to {n2Name}.
      </React.Fragment>
    )
    const alreadyConfirmedMessage = (
      <React.Fragment>
        I’ve received the info below, but have not yet sent it along to {n2Name}
        . You can update your info and resend, or leave as is if everything
        looks ok.
      </React.Fragment>
    )
    return (
      <React.Fragment>
        {(!intro.message || intro.status === 'confirmed') && (
          <React.Fragment>
            {greeting}
            <br />
          </React.Fragment>
        )}
        {intro.message && intro.status === 'initialized' && (
          <Linkify>{nl2br(intro.message)}</Linkify>
        )}
        <br />
        {intro.status !== 'confirmed' && initializedMessage}
        {intro.status === 'confirmed' && alreadyConfirmedMessage}
      </React.Fragment>
    )
  }

  static n1ForwardableWrongStatus(connector, n1, n2, intro) {
    const statuses = {
      confirmed: 'confirmed',
      published: 'forwarded',
      rejected: 'declined',
      canceled: 'declined',
      canceled_by_owner: 'declined',
      accepted: 'completed',
    }
    const status = statuses[intro.status] || false
    if (!status) {
      return (
        <React.Fragment>
          Hi {extractFirstName(n1.name)},<br />
          <br />
          This intro has unknown status: {intro.status}.
        </React.Fragment>
      )
    }

    const n2Name = Messages.getN2Name(n2)

    const message =
      intro.status === 'published' ? (
        <React.Fragment>
          Thanks for providing context for the intro to {n2Name} — much
          appreciated!
          <br />
          <br />
          I’ve passed your information along, and if {extractFirstName(
            n2.name
          )}{' '}
          accepts I will connect you both.
        </React.Fragment>
      ) : (
        <React.Fragment>
          This intro to {n2Name} has been {status}.
        </React.Fragment>
      )

    return (
      <React.Fragment>
        Hi {extractFirstName(n1.name)},<br />
        <br />
        {message}
      </React.Fragment>
    )
  }

  static n1Success(connector, n1, n2, intro) {
    const url = `/introductions/${intro.id}/confirm?token=${intro.initialized_token}`
    return (
      <React.Fragment>
        Thanks {extractFirstName(n1.name)}, I will review your message shortly!
        <br />
        <br />
        In the meantime, you can still{' '}
        <MakeChangesLink>
          <a id="make-intro-changes-link" href={url}>
            make changes to your information
          </a>
        </MakeChangesLink>{' '}
        if I haven’t sent it along.
      </React.Fragment>
    )
  }

  static n2Success(connector, n1, n2) {
    return (
      <React.Fragment>
        Thanks {extractFirstName(n2.name)}, I just connected you both!
      </React.Fragment>
    )
  }

  static noFeedback(connector, n1, n2) {
    return (
      <React.Fragment>
        Thanks, your feedback is important to me so please do let me know if and
        when you do have some feedback.
      </React.Fragment>
    )
  }

  static n1Feedback(connector, n1, n2) {
    return Messages._feedback(n1.name)
  }

  static n2Feedback(connector, n1, n2) {
    return Messages._feedback(n2.name)
  }

  static n1Cancel(connector, n1, n2) {
    return Messages._cancel(n1.name)
  }

  static n2Cancel(connector, n1, n2) {
    return Messages._cancel(n2.name)
  }

  static n1Feedback_great(connector, n1, n2) {
    return Messages._feedback_great(n1.name)
  }

  static n2Feedback_great(connector, n1, n2) {
    return Messages._feedback_great(n2.name)
  }

  static n1Feedback_okay(connector, n1, n2) {
    return Messages._feedback_okay(n1.name)
  }

  static n2Feedback_okay(connector, n1, n2) {
    return Messages._feedback_okay(n2.name)
  }

  static n1Feedback_not_good(connector, n1, n2) {
    return Messages._feedback_not_good(n1.name)
  }

  static n2Feedback_not_good(connector, n1, n2) {
    return Messages._feedback_not_good(n2.name)
  }

  static _feedback(name) {
    return (
      <React.Fragment>
        Thanks {extractFirstName(name)}. Your feedback really helps! If there
        are any other intros I can help you with, please let me know
      </React.Fragment>
    )
  }

  static _feedback_great() {
    return (
      <React.Fragment>
        Nice! Appreciate if you can let me know why the intro worked. I'll try
        to make more great intros for you in the future.
      </React.Fragment>
    )
  }

  static _feedback_okay() {
    return (
      <React.Fragment>
        The intro was ok. Appreciate if you can let me know why, so that I can
        make better intros for you in future.
      </React.Fragment>
    )
  }

  static _feedback_not_good() {
    return (
      <React.Fragment>
        Sorry to hear that! Appreciate if you can let me know why the intro did
        not work, so that I can make better intros for you in future.
      </React.Fragment>
    )
  }

  static _cancel(name) {
    return (
      <React.Fragment>
        Thanks {extractFirstName(name)}, I made sure that intro is now declined.
      </React.Fragment>
    )
  }
}

const ConnectorMessage = ({ type, intro, customText = '' }) => {
  const connector = createContactFromIntro(intro || {}, 'broker')
  const n1 = createContactFromIntro(intro || {}, 'from')
  const n2 = createContactFromIntro(intro || {}, 'to')
  const isIntro = !!intro

  return (
    <ConnectorMessageWrapper>
      {isIntro && (
        <AvatarWrapper>
          <Avatar {...connector} size="55px" />
        </AvatarWrapper>
      )}
      <MessageWrapper isIntro={isIntro}>
        {isIntro ? (
          <React.Fragment>
            <Title>
              <strong>{extractFirstName(connector.name)}</strong>{' '}
              {extractLastName(connector.name)}
            </Title>
            <Message>
              {customText
                ? customText
                : Messages.getMessage(type, connector, n1, n2, intro)}
            </Message>
          </React.Fragment>
        ) : (
          <Message>{customText}</Message>
        )}
        {type === 'n1Forwardable' && (
          <Tip>
            TIP:{' '}
            <a
              href="https://www.entrepreneur.com/article/247692"
              target="_blank"
              rel="noopener noreferrer"
            >
              How to write great forwardable content.
            </a>
          </Tip>
        )}
      </MessageWrapper>
    </ConnectorMessageWrapper>
  )
}

export default ConnectorMessage

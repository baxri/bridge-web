import React from 'react'
import styled from 'styled-components'
import {
  ThankYouWrapper,
  CountSection,
  CountMessage,
  ReferralText,
} from './styled'
import { Button } from 'components/shared'
import history from 'utils/history'
import ConnectorMessage from '../ConnectorMessage'
import extractFirstName from 'utils/extractFirstName'

const BackToIntro = ({ back_to }) => {
  if (!back_to) return null

  const onClick = () => {
    history.push(`/introductions/${back_to}`)
  }

  return (
    <div style={{ margin: '20px' }}>
      <Button style={{ width: 300 }} onClick={onClick}>
        Back to Intro
      </Button>
    </div>
  )
}

const ConnectorMessageContainer = styled.div`
  max-width: 326px;
  margin: 0 auto;
`

const gotoNextIntro = next_intro => {
  history.push(
    `/introductions/${next_intro.id}/confirm?token=${next_intro.initialized_token}&email=${next_intro.from_email}&utm_source=introduction_mailer&utm_medium=email&utm_campaign=initialize_intro`
  )
}

const Thankyou = ({
  type,
  onClick,
  intro,
  next_intro,
  show_count_me_in = false,
  errorMessage = '',
  back_to,
}) => (
  <ThankYouWrapper id="success-page">
    <ConnectorMessageContainer>
      <ConnectorMessage type={type} intro={intro} customText={errorMessage} />
    </ConnectorMessageContainer>
    <hr
      align="center"
      width="20%"
      style={{ marginTop: 40, marginBottom: 40 }}
    />
    <BackToIntro back_to={back_to} />
    {next_intro ? (
      <CountSection style={{ marginTop: 118 }}>
        <CountMessage id="count" style={{ height: 90 }}>
          <div>
            You have an intro to{' '}
            <span style={{ fontWeight: 600 }}>{next_intro.to}</span> waiting for
            you. If you would like the intro then click on Approve Next Intro.
          </div>
        </CountMessage>
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <Button
              style={{ maxWidth: 300 }}
              onClick={() => gotoNextIntro(next_intro)}
            >
              Approve Next Intro
            </Button>
          </div>
        </div>
      </CountSection>
    ) : show_count_me_in ? (
      <CountSection>
        <CountMessage id="count">
          <div>
            {extractFirstName(intro.broker)} is using{' '}
            <span style={{ fontWeight: 600 }}>Bridge</span> to manage intros.
            <br />
            <br /> With Bridge, making intros is easy. Bridge handles all the
            boring admin stuff like email threads, opt-ins and follow-ups for
            you. This way you can focus on what's truly important - connecting
            great people!
          </div>
        </CountMessage>
        <div className="page contact contact-2" style={{ marginTop: 50 }}>
          <div className="container">
            <div style={{ textAlign: 'center' }}>
              <ReferralText>
                Love helping and introducing people? Join Bridge and bring
                seamless intros to your network.
              </ReferralText>
              <Button style={{ maxWidth: 300 }} onClick={onClick}>
                Apply to Join
              </Button>
            </div>
          </div>
        </div>
      </CountSection>
    ) : null}
  </ThankYouWrapper>
)

export default Thankyou

import React from 'react'

import { Icons } from 'components/shared'
import {
  ConfirmationWrapper,
  ConfirmationTitleWrapper,
  ConfirmationMessageWrapper,
  StyledButton,
} from './styled'

const PublishConfirmation = ({
  intro,
  nextIntro,
  onReviewNextIntro,
  onDone,
}) => {
  return (
    <ConfirmationWrapper>
      <ConfirmationTitleWrapper>
        <div style={{ margin: 5 }}>
          <Icons.Check size="75px" />
        </div>
        <p style={{ textAlign: 'center' }}>{'Intro Forwarded!'}</p>
      </ConfirmationTitleWrapper>
      <ConfirmationMessageWrapper>
        <p>{`Intro has been forwarded to ${
          intro.to.split(' ')[0]
        }. We will make the intro if it is accepted.`}</p>
        <p>{`We've also updated ${intro.from.split(' ')[0]} on progress.`}</p>
      </ConfirmationMessageWrapper>
      {nextIntro && (
        <div className="text-center" style={{ marginBottom: 10 }}>
          <StyledButton onClick={onReviewNextIntro} id="publish-intro-next">
            Review Next Intro
          </StyledButton>
        </div>
      )}
      <div className="text-center">
        <StyledButton alt="true" onClick={onDone} id="publish-intro-done">
          Done
        </StyledButton>
      </div>
    </ConfirmationWrapper>
  )
}

export default PublishConfirmation

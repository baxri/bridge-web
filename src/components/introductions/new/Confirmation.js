import React from 'react'

import { withConsumer } from 'context/NewIntroContext'
import { Button } from 'components/shared'
import { Icons } from 'components/shared'
import {
  ConfirmationWrapper,
  ConfirmationTitleWrapper,
  ConfirmationMessageWrapper,
} from './styled'

const Confirmation = ({ from, done }) => {
  const intro = from[0]
  return (
    <ConfirmationWrapper id="new-intro-confirmation">
      <ConfirmationTitleWrapper>
        <div style={{ margin: 5 }}>
          <Icons.Check size="75px" />
        </div>
        <p style={{ textAlign: 'center' }}>{'Nice work!'}</p>
      </ConfirmationTitleWrapper>
      <ConfirmationMessageWrapper>
        <p>{`Your message has been sent to ${intro.name}.`}</p>
        <p style={{ marginBottom: 5 }}>
          {'On accepting, they will provide the following info:'}
        </p>
        <p style={{ marginLeft: 15 }}>
          1) Their Bio
          <br />
          2) Reason for wanting the intro
          <br />
          3) Their LinkedIn Profile
        </p>
      </ConfirmationMessageWrapper>
      <div className="text-right">
        <Button onClick={done} mobile={{ block: true }} id="new-intro-start">
          Done
        </Button>
      </div>
    </ConfirmationWrapper>
  )
}

export default withConsumer(Confirmation)

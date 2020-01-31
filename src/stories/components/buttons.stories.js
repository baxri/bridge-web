import React from 'react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { Button } from 'components/shared'

storiesOf('COMPONENTS|Button', module)
  .add('Default', () => {
    return (
      <div style={{ textAlign: 'center' }}>
        <Button>Ok</Button> <br />
        <br />
        <Button secondary>Ok</Button> <br />
        <br />
        <Button danger>Ok</Button> <br />
        <br />
        <Button alt>Ok</Button> <br />
        <br />
        <Button alt secondary>
          Ok
        </Button>{' '}
        <br />
        <br />
        <Button alt danger>
          Ok
        </Button>{' '}
        <br />
        <br />
      </div>
    )
  })
  .add('Small', () => {
    return (
      <div style={{ textAlign: 'center' }}>
        <Button small>Ok</Button> <br />
        <br />
        <Button small secondary>
          Ok
        </Button>{' '}
        <br />
        <br />
        <Button small danger>
          Ok
        </Button>{' '}
        <br />
        <br />
        <Button small alt>
          Ok
        </Button>{' '}
        <br />
        <br />
        <Button small alt secondary>
          Ok
        </Button>{' '}
        <br />
        <br />
        <Button small alt danger>
          Ok
        </Button>{' '}
        <br />
        <br />
      </div>
    )
  })
  .add('Disabled', () => {
    return (
      <div style={{ textAlign: 'center' }}>
        <Button disabled>Ok</Button> <br />
        <br />
        <Button disabled secondary>
          Ok
        </Button>{' '}
        <br />
        <br />
        <Button disabled danger>
          Ok
        </Button>{' '}
        <br />
        <br />
        <Button disabled alt>
          Ok
        </Button>{' '}
        <br />
        <br />
        <Button disabled alt secondary>
          Ok
        </Button>{' '}
        <br />
        <br />
        <Button disabled alt danger>
          Ok
        </Button>{' '}
        <br />
        <br />
      </div>
    )
  })
  .add('Loading', () => {
    return (
      <div style={{ textAlign: 'center' }}>
        <Button loading>Ok</Button> <br />
        <br />
        <Button loading secondary>
          Ok
        </Button>{' '}
        <br />
        <br />
        <Button loading danger>
          Ok
        </Button>{' '}
        <br />
        <br />
        <Button loading alt>
          Ok
        </Button>{' '}
        <br />
        <br />
        <Button loading alt secondary>
          Ok
        </Button>{' '}
        <br />
        <br />
        <Button loading alt danger>
          Ok
        </Button>{' '}
        <br />
        <br />
      </div>
    )
  })
  .add('Loading small', () => {
    return (
      <div style={{ textAlign: 'center' }}>
        <Button small loading>
          Ok
        </Button>{' '}
        <br />
        <br />
        <Button small loading secondary>
          Ok
        </Button>{' '}
        <br />
        <br />
        <Button small loading danger>
          Ok
        </Button>{' '}
        <br />
        <br />
        <Button small loading alt>
          Ok
        </Button>{' '}
        <br />
        <br />
        <Button small loading alt secondary>
          Ok
        </Button>{' '}
        <br />
        <br />
        <Button small loading alt danger>
          Ok
        </Button>{' '}
        <br />
        <br />
      </div>
    )
  })
  .add('Text button', () => {
    return (
      <div style={{ textAlign: 'center' }}>
        <Button transparent>Button</Button> <br />
        <br />
        <Button transparent secondary>
          Button
        </Button>{' '}
        <br />
        <br />
        <Button transparent danger>
          Button
        </Button>{' '}
        <br />
        <br />
      </div>
    )
  })
  .add('Full width', () => {
    return (
      <div style={{ textAlign: 'center' }}>
        <Button full>Ok</Button> <br />
        <br />
        <Button full secondary>
          Ok
        </Button>{' '}
        <br />
        <br />
        <Button full danger>
          Ok
        </Button>{' '}
        <br />
        <br />
        <Button full alt>
          Ok
        </Button>{' '}
        <br />
        <br />
        <Button full alt secondary>
          Ok
        </Button>{' '}
        <br />
        <br />
        <Button full alt danger>
          Ok
        </Button>{' '}
        <br />
        <br />
      </div>
    )
  })

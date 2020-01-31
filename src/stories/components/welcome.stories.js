import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links'

import { Welcome } from '@storybook/react/demo'

const Container = storyFn => <div style={{ margin: 20 }}>{storyFn()}</div>

storiesOf('Welcome', module)
  .addDecorator(Container)
  .add('to Storybook', () => <Welcome showApp={linkTo('COMPONENTS|Button')} />)

import { configure, addDecorator } from '@storybook/react'
import { configureViewport, INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import requireContext from 'require-context.macro'

import Container from '../src/stories/container'

addDecorator(Container)

const req = requireContext('../src/stories', true, /\.stories\.js$/) // <- import all the stories at once

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)

configureViewport({
  viewports: {
    ...INITIAL_VIEWPORTS,
  },
})

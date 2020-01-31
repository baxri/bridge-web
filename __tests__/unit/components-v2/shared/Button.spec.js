import React from 'react'
import { shallow } from 'enzyme'

import { Button } from 'components/shared'

describe('<Button />', () => {
  it('render button', () => {
    const btn = shallow(<Button>Button</Button>)
    expect(btn.props().children).toBe('Button')
  })

  it('have borderless', () => {
    const btn = shallow(<Button borderless>Button</Button>)
    expect(btn).toMatchSnapshot()
  })
})

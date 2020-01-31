import React from 'react'
import { shallow } from 'enzyme'

import { CardOverview } from 'components/shared'

describe('<CardOverview />', () => {
  it('should displayed the props', () => {
    const card = shallow(<CardOverview count="1" text="hello" linkTo="/" />)
    expect(card.containsAllMatchingElements([<h2>1</h2>, <div>hello</div>]))
  })

  it('should match snapshot', () => {
    const card = shallow(<CardOverview count="1" text="hello" linkTo="/" />)
    expect(card).toMatchSnapshot()
  })
})

import React from 'react'
import { Link } from 'react-router-dom'

import Wrapper from './Wrapper'

const Intro = () => (
  <Wrapper>
    <p>You haven't made any intros yet</p>
    <Link to="/introductions/new">add a new intro</Link>
  </Wrapper>
)

export default Intro

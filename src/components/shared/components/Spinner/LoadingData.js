import React from 'react'
import styled from 'styled-components'

import Spinner from './Spinner'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: calc(100vh - 130px);
  width: 100%;
  flex-direction: column;
`

const LoadingData = props => (
  <Wrapper>
    <Spinner {...{ ...props, size: 6 }} />
  </Wrapper>
)

export default LoadingData

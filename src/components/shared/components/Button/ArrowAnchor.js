import React from 'react'
import styled from 'styled-components'

import { Icons } from 'components/shared'

export const Wrapper = styled.a`
  color: ${props => {
    if (props.danger) return '#D0021B'
    if (props.black) return '#000000'
    return '#047BFE'
  }} !important;
  display: flex;
  align-items: center;
  cursor: pointer;
`

const ArrowAnchor = ({ children, ...props }) => (
  <Wrapper {...props}>
    <Icons.ArrowRight /> {children}
  </Wrapper>
)

export default ArrowAnchor

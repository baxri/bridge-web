import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background-color: #f8f8f8;
  padding: 10px;
  font-size: 14px;
  text-align: center;
  margin: 0 -15px;
`

const Alert = React.memo(({ children }) => {
  return <Container>{children}</Container>
})

export default Alert

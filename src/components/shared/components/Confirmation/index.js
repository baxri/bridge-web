import React from 'react'

import { Header, YButton, NButton } from './styled'

const Confirmation = ({ message, onYes, onNo }) => (
  <div className="container">
    <Header>{message}</Header>
    <YButton onClick={onYes}>YES</YButton>
    <NButton onClick={onNo}>NO</NButton>
  </div>
)

export default Confirmation

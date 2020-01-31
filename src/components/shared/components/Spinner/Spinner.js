import React from 'react'
import { SyncLoader } from 'react-spinners'

const Spinner = props => <SyncLoader {...props} />

Spinner.defaultProps = {
  size: 30,
  color: '#333333',
  loading: false,
  sizeUnit: 'px',
}

export default Spinner

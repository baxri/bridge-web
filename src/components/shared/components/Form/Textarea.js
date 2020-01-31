import React from 'react'
import cx from 'classnames'

export default ({ input, className, ...props }) => {
  const classes = ['form-control', className]
  return <textarea className={cx(classes)} {...input} {...props} />
}

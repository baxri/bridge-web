import React from 'react'
import { Field } from 'redux-form'
import cx from 'classnames'

class FormGroupField extends React.Component {
  renderComponent = field => {
    const { meta, ...props } = field
    const { label, id, name, component: Component } = this.props
    const hasError = meta.touched && meta.invalid
    const htmlFor = id || name
    const containerClsses = [
      // "form-group",
      {
        'app-has-error': hasError,
      },
    ]

    return (
      <div className={cx(containerClsses)}>
        {label && <label htmlFor={htmlFor}>{label}</label>}
        <Component ref={el => (this.component = el)} {...props} id={htmlFor} />
        {hasError && <span className="help-block">{meta.error}</span>}
      </div>
    )
  }

  render() {
    return <Field {...this.props} component={this.renderComponent} />
  }
}

const renderComponent = ({ input, className, ...props }) => {
  const classes = ['form-control', className]
  return <input type="text" className={cx(classes)} {...input} {...props} />
}

FormGroupField.defaultProps = {
  component: renderComponent,
}

export default FormGroupField

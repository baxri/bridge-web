import React from 'react'
import styled from 'styled-components'
import { Input, FormGroup, Label, FormFeedback } from 'reactstrap'
import autosize from 'autosize'

const StyledInput = styled(Input)`
  border-radius: 0;
  border-color: #d4d4d4 !important;
  -webkit-box-shadow: none;
  box-shadow: none;
  border-radius: 0 !important;
  resize: none;
`

class TextArea extends React.Component {
  componentDidMount() {
    this.props.autosize && this.ref && autosize(this.ref)
  }

  componentWillUnmount() {
    if (this.props.autosize && this.ref) {
      autosize.destroy(this.ref)
    }
  }

  render() {
    const {
      input,
      meta: { error, touched },
      style,
      autosize,
      ...props
    } = this.props
    if (props.hasOwnProperty('defaultValue')) {
      delete input.value
    }

    return (
      <FormGroup>
        <Label for={props.id}>{props.label}</Label>

        <StyledInput
          innerRef={ref => (this.ref = ref)}
          rows="4"
          type="textarea"
          valid={touched && !error}
          style={autosize ? { minHeight: 100 } : style}
          {...{ ...input, ...props }}
        />

        {touched && error && (
          <FormFeedback style={{ display: 'block' }} valid={touched && !error}>
            {error}
          </FormFeedback>
        )}
      </FormGroup>
    )
  }
}

TextArea.defaultProps = {
  autosize: false,
  style: {},
}

export default TextArea

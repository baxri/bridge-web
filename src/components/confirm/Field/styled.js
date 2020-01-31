import styled from 'styled-components'
import * as gs from '../new-style'
import { colorPlaceholder } from '../../introductions/new-v2/gmail-style'
import Textarea from 'react-textarea-autosize'

export const StyledField = styled.div`
  margin: 20px ${gs.horizontalMargin}px;
`
export const FieldLabel = styled.div`
  display: flex;
`
export const FieldLabelText = styled.label`
  ${gs.fontBase};
  flex: 100;
  color: ${p => (!p.disabled && p.optional ? '#82879C' : 'inherit')};
`
export const StyledFieldStatus = styled.div`
  color: ${p => (p.warning ? '#E7A830' : '#0ACF83')};
  display: ${p => (p.valid ? 'block' : 'none')};
  flex: 1;
`
export const FieldInput = styled.input`
  ${gs.fontBase};
  font-size: 16px;
  line-height: 44px;
  height: 46px;
  width: 100%;
  padding: 0 6px;
  border-radius: 4px;
  border: 1px solid #aeb3be;
  &:focus {
    border-color: black;
    outline: 0;
  }
  &:disabled {
    background: white;
    border-color: white;
    padding: 0;
    line-height: 32px;
    height: 32px;
  }
`

export const FieldMessage = styled.div`
  ${gs.fontBase};
  font-size: 12px;
  line-height: 15px;
  color: ${p => (p.error ? '#E13535' : p.warning ? '#E7A830' : '#82879C')};
  display: inline-block;
  padding-right: 4px;
`

export const FieldInfo = styled.div`
  ${gs.fontBase};
  font-size: 12px;
  line-height: 15px;
  color: #82879c;
  display: inline-block;
`

export const FieldTextarea = styled(Textarea)`
  ${gs.fontBase};
  font-size: 16px;
  line-height: 20px;
  display: block;
  resize: none;
  width: 100%;
  min-height: 72px;
  padding: 6px 6px;
  border-radius: 4px;
  border: 1px solid #aeb3be;
  &:focus {
    border-color: black;
    outline: 0;
  }
  &:disabled {
    background: white;
    border-color: white;
    padding: 0;
    min-height: 32px;
  }
  ::placeholder {
    color: ${colorPlaceholder};
    opacity: 1;
  }
`

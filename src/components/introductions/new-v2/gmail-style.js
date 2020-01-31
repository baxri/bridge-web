import { css } from 'styled-components'
import styled from 'styled-components'

export const colorActive = '#007bff'

export const colorMain = 'black'

export const colorGray = '#D1D1D1'

export const colorLightGray = '#E7E7E7'

export const colorDarkGray = '#979797'

export const colorPlaceholder = '#626262'

export const colorButtonBorder = '#E5E5E5'

export const colorError = '#E15454'

export const horizontalMargin = 20

export const fontBase = css`
  font-family: Roboto, sans-serif;
  font-size: 14px;
  line-height: 16px;
  font-weight: 300;
  color: ${colorMain};
`

export const fontMedium = css`
  ${fontBase};
  font-weight: 500;
`

export const fontHeader = css`
  ${fontMedium};
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
`

export const HeaderButton = styled.button`
  ${fontHeader};
  border: 0;
  background-color: transparent;
  color: ${colorActive};
  padding: 16px ${horizontalMargin}px;
  outline: none !important;
  :disabled {
    opacity: 0.1;
    color: ${colorMain};
  }
`

export const Input = styled.input`
  ${fontBase};
  background-color: transparent;
  border: 0;
  height: 30px;
  line-height: 30px;
  &:focus {
    border: 0;
    outline: 0;
  }
  ::placeholder {
    ${fontBase};
    line-height: 30px;
    color: ${colorPlaceholder};
    text-decoration: none;
    opacity: 1;
  }
`

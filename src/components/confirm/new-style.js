import { css } from 'styled-components'
//import styled from 'styled-components'

export const colorActive = '#007bff'

export const colorMain = 'black'

export const colorGray = '#D1D1D1'

export const colorLightGray = '#E7E7E7'

export const colorDarkGray = '#979797'

export const colorPlaceholder = '#626262'

export const colorButtonBorder = '#E5E5E5'

export const colorError = '#E15454'

export const horizontalMargin = 10

export const fontBase = css`
  // font-family: Roboto, sans-serif;
  font-size: 14px;
  line-height: 18px;
  color: ${colorMain};
`

export const fontMedium = css`
  ${fontBase};
  font-weight: 500;
`

export const fontHeader = css`
  ${fontBase};
  font-size: 14px;
  line-height: 18px;
  font-weight: bold;
`

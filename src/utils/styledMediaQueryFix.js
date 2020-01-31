import { css } from 'styled-components'

/**
 * Original styled-media-query has weird behavior where lessThan and greaterThan works inclusive and overlaps
 * so both lessThan('large') and greaterThan('large') trigger in case of 768px view width
 *
 * This fix decreases size in case of lessThan making it non inclusive
 * and work in synch with bootstrap breakpoints
 *
 */

/**
 * Default media breakpoints
 * @type {Object}
 */
export const defaultBreakpoints = {
  huge: '1200px',
  large: '992px',
  medium: '768px',
  small: '576px',
}

function getSizeFromBreakpoint(
  breakpointValue,
  breakpoints = {},
  decrease = false
) {
  let val = '0'
  if (breakpoints[breakpointValue]) {
    val = breakpoints[breakpointValue]
  } else if (parseInt(breakpointValue)) {
    val = breakpointValue
  } else {
    console.error(
      'styled-media-query: No valid breakpoint or size specified for media.'
    )
  }

  if (decrease && val !== '0' && (val + '').indexOf('.') === -1) {
    val = val.replace('px', '') - 1 + '.98px'
  }

  return val
}

/**
 * Media query generator
 * @param {Object} breakpoints - Map labels to breakpoint sizes
 * @return {Object} - Media generators for each breakpoint
 */
export function generateMedia(breakpoints = defaultBreakpoints) {
  const lessThan = breakpoint => (...args) => css`
    @media (max-width: ${getSizeFromBreakpoint(
        breakpoint,
        breakpoints,
        true
      )}) {
      ${css(...args)}
    }
  `

  const greaterThan = breakpoint => (...args) => css`
    @media (min-width: ${getSizeFromBreakpoint(breakpoint, breakpoints)}) {
      ${css(...args)}
    }
  `

  const between = (firstBreakpoint, secondBreakpoint) => (...args) => css`
    @media (min-width: ${getSizeFromBreakpoint(
        firstBreakpoint,
        breakpoints
      )}) and (max-width: ${getSizeFromBreakpoint(
        secondBreakpoint,
        breakpoints,
        true
      )}) {
      ${css(...args)}
    }
  `

  const oldStyle = Object.keys(breakpoints).reduce(
    (acc, label) => {
      const size = breakpoints[label]

      acc.to[label] = (...args) => {
        console.warn(
          `styled-media-query: Use media.lessThan('${label}') instead of old media.to.${label} (Probably we'll deprecate it)`
        )
        return css`
          @media (max-width: ${size}) {
            ${css(...args)}
          }
        `
      }

      acc.from[label] = (...args) => {
        console.warn(
          `styled-media-query: Use media.greaterThan('${label}') instead of old media.from.${label} (Probably we'll deprecate it)`
        )
        return css`
          @media (min-width: ${size}) {
            ${css(...args)}
          }
        `
      }

      return acc
    },
    { to: {}, from: {} }
  )

  return Object.assign(
    {
      lessThan,
      greaterThan,
      between,
    },
    oldStyle
  )
}

/**
 * Media object with default breakpoints
 * @return {object} - Media generators for each size
 */
export default generateMedia()

/**
 * Usage: styled.div` ${media.from.medium`background: #000;`} `;
 * With this code, background for small and medium sizes will be `default` and for more than medium, will be `#000`
 */

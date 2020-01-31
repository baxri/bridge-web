import { colors } from 'components/theme'

const createLinearGradient = color =>
  `linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), ${color}`

export const bgColors = {
  primary: colors.primary,
  secondary: colors.slate20,
  alternative: 'white',
  danger: colors.ruby,
}

export const activeColors = {
  primary: createLinearGradient(colors.primary),
  secondary: createLinearGradient(colors.slate20),
  alternative: createLinearGradient(bgColors.alternative),
  danger: createLinearGradient(colors.ruby),
}

export const textColors = {
  primary: 'white',
  secondary: colors.charcoal,
  alternative: {
    primary: colors.primary,
    secondary: colors.charcoal,
    danger: colors.ruby,
  },
  danger: bgColors.alternative,
}

export const textButtonColors = {
  ...bgColors,
  secondary: colors.charcoal,
}

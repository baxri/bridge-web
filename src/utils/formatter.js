export const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]
export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const nth = d => {
  if (d > 3 && d < 21) return 'th'
  switch (d % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

export const toDateHeading = dateUTC => {
  const d =
    typeof dateUTC === 'string' ? new Date(Date.parse(dateUTC)) : dateUTC

  const today = new Date()
  const isToday =
    today.getDate() === d.getDate() &&
    today.getMonth() === d.getMonth() &&
    today.getFullYear() === d.getFullYear()

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const isYesterday =
    yesterday.getDate() === d.getDate() &&
    yesterday.getMonth() === d.getMonth() &&
    yesterday.getFullYear() === d.getFullYear()

  if (isToday) {
    return 'Today'
  } else if (isYesterday) {
    return 'Yesterday'
  } else {
    return (
      DAYS[d.getDay()] +
      ', ' +
      MONTHS[d.getMonth()] +
      ' ' +
      d.getDate() +
      nth(d.getDate())
    )
  }
}

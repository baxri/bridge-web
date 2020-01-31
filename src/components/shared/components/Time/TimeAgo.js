import React from 'react'
import TimeAgo from 'react-timeago'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import enShort from 'react-timeago/lib/language-strings/en-short'

enShort.suffixAgo = 'ago'
const formatter = buildFormatter(enShort)

const toTimeAMPM = dateUTC => {
  const d =
    typeof dateUTC === 'string' ? new Date(Date.parse(dateUTC)) : dateUTC

  const dateTime = {}
  dateTime.hours = d.getHours()
  dateTime.mins = d.getMinutes()

  // See https://stackoverflow.com/a/8888498
  const ampm = dateTime.hours >= 12 ? 'PM' : 'AM'
  dateTime.hours = dateTime.hours % 12
  dateTime.hours = dateTime.hours ? dateTime.hours : 12 // the hour '0' should be '12'
  dateTime.mins = dateTime.mins < 10 ? '0' + dateTime.mins : dateTime.mins

  const time = dateTime.hours + ':' + dateTime.mins + ' ' + ampm

  // 4:22 PM
  return time
}

export default props => {
  const { fulldate, date } = props
  if (fulldate) {
    return <span>{toTimeAMPM(date)}</span>
  } else {
    return <TimeAgo {...props} formatter={formatter} />
  }
}

import extractFirstName from './extractFirstName'

export default function emailToName(intro, email) {
  const name = intro.from_email === email ? intro.from : intro.to
  return extractFirstName(name)
}

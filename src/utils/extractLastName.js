export default function extractLastName(name = '') {
  if (!name) {
    return ''
  }

  return name
    .split(' ')
    .slice(1)
    .join(' ')
}

export default function extractFirstName(name = '') {
  if (!name) {
    return ''
  }
  return name.split(' ')[0]
}

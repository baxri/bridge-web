export default function removeSalutations(name) {
  return (name || '').replace(/^(mr|mrs|miss|ms|dr)\.? /i, '')
}

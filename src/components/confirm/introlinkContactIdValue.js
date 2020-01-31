import Cookies from 'js-cookie'

export default function introlinkContactIdValue(newId = false) {
  const key = 'introlinkContactId'
  if (newId === false) return Cookies.get(key)

  Cookies.set(key, newId, {
    path: '/',
    expires: 30,
  })
}

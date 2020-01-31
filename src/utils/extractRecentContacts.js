import { sortBy } from 'lodash'

const getContactKey = (name, email) => `${name}-${email}`

export default function extractRecentContacts(intros) {
  const sortedIntros = sortBy(intros, 'created_at').reverse()
  const recentContacts = []
  let index = 0

  while (recentContacts.length <= 10 && index < sortedIntros.length) {
    const intro = sortedIntros[index]
    const fromKey = getContactKey(intro.from, intro.from_email)
    const toKey = getContactKey(intro.to, intro.to_email)

    if (intro.from_email && !recentContacts.some(c => c.key === fromKey))
      recentContacts.push({
        key: fromKey,
        name: intro.from,
        email: intro.from_email,
      })

    if (intro.to_email && !recentContacts.some(c => c.key === toKey))
      recentContacts.push({ key: toKey, name: intro.to, email: intro.to_email })

    index++
  }

  return recentContacts
}

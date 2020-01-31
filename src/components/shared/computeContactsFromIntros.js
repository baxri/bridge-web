import { map, orderBy } from 'lodash'

import fastFilter from 'utils/fastFilter'
import sortContacts from 'utils/contactSort'

const INDEX_KEYS = ['name', 'email']
const LIMIT = 50

const newContactInfo = (name, email) => ({
  name,
  email,
  waiting: 0,
  replies: 0,
  noreplies: 0,
  completed: 0,
})

const computeContactsFromIntros = (contacts, intros, filters) => {
  const _contacts = Object.assign({}, contacts)

  const intros_counts = Object.assign({})

  intros.forEach(intro => {
    if (intros_counts[intro.from_email] === undefined) {
      intros_counts[intro.from_email] = Object.assign({
        involved: 0,
        mostRecentIntroTime: 0,
      })
    }
    if (intros_counts[intro.to_email] === undefined) {
      intros_counts[intro.to_email] = Object.assign({
        involved: 0,
        mostRecentIntroTime: 0,
      })
    }
    intros_counts[intro.from_email].involved += 1
    intros_counts[intro.to_email].involved += 1

    const introDateTime = new Date(intro.created_at).getTime()
    if (intros_counts[intro.from_email].mostRecentIntroTime < introDateTime) {
      intros_counts[intro.from_email].mostRecentIntroTime = introDateTime
    }
    if (intros_counts[intro.to_email].mostRecentIntroTime < introDateTime) {
      intros_counts[intro.to_email].mostRecentIntroTime = introDateTime
    }
  })

  const contactsArray = map(_contacts, (contact, key) => {
    const { name, email } = contact
    const contactWithDefaults = Object.assign(
      newContactInfo(name, email),
      contact
    )
    const introsCount = intros_counts[contact.email]
      ? intros_counts[contact.email].involved
      : 0
    const mostRecentIntroTime = intros_counts[contact.email]
      ? intros_counts[contact.email].mostRecentIntroTime
      : 0

    return {
      ...contactWithDefaults,
      key,
      norepliesSort: -contactWithDefaults.noreplies,
      introsCount,
      mostRecentIntroTime,
    }
  })

  let { query } = filters

  if (query === undefined || query.length < 1) {
    return contactsArray.filter(c => c.id)
  }

  return sortContacts(
    fastFilter(
      orderBy(contactsArray, ['introductions_count'], ['desc']),
      INDEX_KEYS,
      query,
      LIMIT
    ),
    query
  )
}

export default computeContactsFromIntros

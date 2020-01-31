import { sortBy } from 'lodash'

export const orderAllByLatest = intros => {
  return sortBy(intros, i => i.created_at).reverse()
}

export const filterIntrosForContact = (intros, contact) => {
  const introsForContact = []

  intros.forEach(intro => {
    if (intro.to_email === contact.email) {
      const introForContact = {
        ...intro,
        email: intro.from_email,
        name: intro.from,
      }
      introsForContact.push(introForContact)
    }
    if (intro.from_email === contact.email) {
      const introForContact = {
        ...intro,
        email: intro.to_email,
        name: intro.to,
      }
      introsForContact.push(introForContact)
    }
  })

  return introsForContact
}

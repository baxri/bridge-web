// Lowercases and strips non alphanumerics but not spaces
function normalize(s) {
  if (!s) return null
  return s.replace(/[^\w\s]/gi, '').toLowerCase()
}

function normalizeContact(contact, query) {
  // const q = query.toLowerCase()
  const q = query ? normalize(query) : null

  const normalizedName = normalize(contact.name)
  const normalizedNameIndex =
    normalizedName && q ? normalizedName.indexOf(q) : -1

  const normalizedEmail = normalize(contact.email)
  const normalizedEmailIndex =
    normalizedEmail && q ? normalizedEmail.indexOf(q) : -1

  // Note that -1 is swapped with MAX_VALUE for easier comparison later
  return {
    name: normalizedName,
    email: normalizedEmail,
    index: {
      name:
        normalizedNameIndex >= 0 && q ? normalizedNameIndex : Number.MAX_VALUE,
      email:
        normalizedEmailIndex >= 0 && q
          ? normalizedEmailIndex
          : Number.MAX_VALUE,
    },
  }
}

function sortContacts(contacts, query) {
  contacts.sort((aContact, bContact) => {
    const a = normalizeContact(aContact, query)
    const b = normalizeContact(bContact, query)

    // Try to first sort by index if query is not null
    if (a.index.name === 0 && a.index.name < b.index.name) {
      return -1
    } else if (
      a.index.email === 0 &&
      a.index.email < b.index.name &&
      a.index.email < b.index.email
    ) {
      return -1
    } else if (b.index.name === 0 && b.index.name < a.index.name) {
      return 1
    } else if (
      b.index.email === 0 &&
      b.index.email < a.index.name &&
      b.index.email < a.index.email
    ) {
      return 1
    } else {
      // Index is the same
      // sort alphabetically by name if available otherwise sort alphabetically by email
      if (!a.name) {
        return 1
      } else if (!b.name) {
        return -1
      } else if (a.name !== b.name) {
        return a.name.localeCompare(b.name)
      } else if (!a.email) {
        return 1
      } else if (!b.email) {
        return -1
      } else {
        return a.email.localeCompare(b.email)
      }
    }
  })
  return contacts
}

export default sortContacts

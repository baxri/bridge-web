import { some } from 'lodash'

export const strip = s => {
  return s.replace(/[^a-zA-Z0-9.@ ]/g, '')
}

const fastFilter = (array, indexKeys, query, limit) => {
  let indexItem = 0
  let items = []

  const search = strip(query).toLowerCase()

  // If search is one character, e.g. B, then first filter the array to just include
  // those with names or emails beginning with that character as the limit
  // will be reached quickly and these items will be incorrectly truncated
  if (search.length === 1) {
    array = array.filter(a => {
      if (
        (a.name && a.name.length > 0 && a.name[0].toLowerCase() === search) ||
        (a.email && a.email.length > 0 && a.email[0].toLowerCase() === search)
      ) {
        return true
      }
      return false
    })
  }

  for (let count = 0; indexItem < array.length && count < limit; ) {
    const item = array[indexItem]
    const index = indexKeys.map(key => (item[key] || '').toLowerCase())

    const updated_name = strip(index[0])
    index[0] = updated_name
    const updated_email = strip(index[1])
    index[1] = updated_email

    const isMatch = some(index, i => i.includes(search))

    if (isMatch) {
      items.push(item)
      count = items.length
    }

    indexItem++
  }

  return items
}

export default fastFilter

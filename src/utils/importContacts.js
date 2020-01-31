import { get } from 'lodash'

const { $ } = window
const MAX_RESULTS = 500

export default function importContacts(token, onFetchCount, onFetch) {
  let totalCount = 0

  return fetchContacts(token, 1)
    .then(data => (totalCount = extractContactsCount(data)))
    .then(() => onFetchCount(totalCount))
    .then(() => fetchAllContacts(token, totalCount, 1, onFetch))
}

function fetchAllContacts(token, totalCount, startIndex, onFetch) {
  if (startIndex >= totalCount) return null

  return fetchContacts(token, MAX_RESULTS, startIndex)
    .then(data => onFetch(extractContacts(data)))
    .then(() =>
      fetchAllContacts(token, totalCount, startIndex + MAX_RESULTS, onFetch)
    )
}

function fetchContacts(token, maxResults = MAX_RESULTS, startIndex = 1) {
  return new Promise((resolve, reject) => {
    // See https://stackoverflow.com/a/28949895
    token['g-oauth-window'] = null

    // Note: Using https://www.googleapis.com instead of https://www.google.com
    // fixes 'Refused to execute script' issue (see https://gist.github.com/lupeke/6233678#gistcomment-2716390)
    $.ajax({
      url: `https://www.googleapis.com/m8/feeds/contacts/default/full?alt=json&start-index=${startIndex}&max-results=${maxResults}`,
      dataType: 'json',
      data: token,
    }).then(data => resolve(data), error => reject(error))
  })
}

function extractContactsCount(data) {
  return Number(get(data, 'feed.openSearch$totalResults.$t', 0))
}

function extractContacts(data) {
  const entries = get(data, 'feed.entry', [])
  const contacts = []

  entries.forEach(entry => {
    const name = get(entry, 'title.$t', '')
    const profile_pic_url = extractProfilePicUrl(entry)

    get(entry, 'gd$email', []).forEach(email =>
      contacts.push({
        name,
        profile_pic_url,
        email: (email.address || '').toLowerCase(),
      })
    )
  })

  return contacts
}

function extractProfilePicUrl(entry) {
  const link = (entry.link || []).find(
    l => l.rel === 'http://schemas.google.com/contacts/2008/rel#photo'
  )
  return link ? link.href : null
}

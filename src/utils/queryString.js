import qs from 'query-string'

export function merge(oldQuery, newQuery) {
  const merged = Object.assign({}, qs.parse(oldQuery), newQuery)
  return '?' + qs.stringify(merged)
}

export function parse(search) {
  return qs.parse(search)
}

export function stringify(parsedQuery) {
  return qs.stringify(parsedQuery)
}

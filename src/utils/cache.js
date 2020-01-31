const cache = {}

export function getCache(key) {
  return cache[key]
}

export function setCache(key, value) {
  cache[key] = value
}

export const RELOAD_TIME = 1000 * 60 * 60

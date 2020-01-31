import { compressToUTF16, decompressFromUTF16 } from 'lz-string'
import IStorage from 'intropath-core/utils/iStorage'

function getCompressedKey(key) {
  return key + '_compressed'
}

export function getItem(key) {
  try {
    // Try and get item using compressed key, if null then try and get it using given key
    const compressedData = localStorage.getItem(getCompressedKey(key))
    const data =
      compressedData !== null
        ? JSON.parse(decompressFromUTF16(compressedData))
        : JSON.parse(localStorage.getItem(key) || null)
    return data ? data.value : null
  } catch (e) {
    return null
  }
}

export function setItem(key, value) {
  const compressedItem = compressToUTF16(JSON.stringify({ value }))
  localStorage.setItem(getCompressedKey(key), compressedItem)
}

export function removeItem(key) {
  localStorage.removeItem(key)
  localStorage.removeItem(getCompressedKey(key))
}

export class Storage extends IStorage {
  async get(name) {
    return getItem(name)
  }

  async set(name, val) {
    setItem(name, val)
  }

  async remove(name) {
    removeItem(name)
  }
}

export default class SafeTimeout {
  constructor() {
    this._destroyed = false
    this._store = {}
  }

  static refresh(oldTimeout) {
    if (oldTimeout && oldTimeout.destroy) {
      oldTimeout.destroy()
    }

    return new SafeTimeout()
  }

  set(fn, time) {
    if (this._destroyed) return null
    const id = window.setTimeout(fn, time)
    this._store[id] = 1
    return id
  }

  clear(id) {
    if (this._destroyed || !id) return
    window.clearTimeout(id)
    delete this._store[id]
  }

  destroy() {
    this.clearAll()
    this._destroyed = true
  }

  clearAll() {
    Object.keys(this._store).forEach(i => this.clear(i))
  }
}

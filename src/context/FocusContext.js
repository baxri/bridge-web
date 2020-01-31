import React from 'react'

const Context = React.createContext()

class Provider extends React.Component {
  constructor(props) {
    super(props)

    this.index = {}
    this.order = []

    this.value = {
      focusSet: this.focus.bind(this),
      focusCurrent: this.current.bind(this),
      focusRegister: this.register.bind(this),
      focusUnregister: this.remove.bind(this),
      focusSetOnNext: this.focusNext.bind(this),
      focusSetOnPrev: this.focusPrev.bind(this),
    }
  }

  searchElement(name) {
    if (typeof name === 'string') {
      if (this.index[name]) {
        return this.index[name]
      }
    } else if (name.test) {
      for (let i = 0; i < this.order.length; ++i) {
        if (name.test(this.order[i].n)) {
          return this.index[this.order[i].n]
        }
      }
    }

    return false
  }

  /**
   * Set focus by name or regexp
   *
   * @param name string|RegExp
   * @param preventScroll boolean
   * @returns {boolean}
   */
  focus(name, preventScroll = false) {
    //console.log(name)
    const el = this.searchElement(name)

    if (!el) {
      // Element is not registered yet so focus after registration
      this.scheduled = { name: name, preventScroll }
      return false
    }

    if (el.current.name === this.current()) return true

    //console.log('focusing')
    el.current.focus({ preventScroll })

    return true

    // const el = document.querySelector(`[name='${name}']`)
    // console.log(el)
    // el && el.focus()
    //
    // return true
  }

  focusNext(pattern = null, preventScroll = false) {
    return this.focusSibling(true, pattern, preventScroll)
  }

  focusPrev(pattern = null, preventScroll = false) {
    return this.focusSibling(false, pattern, preventScroll)
  }

  focusSibling(shouldBeNext, pattern = null, preventScroll = false) {
    const { order } = this
    const current = this.current()
    let ci = false
    const start = shouldBeNext ? 0 : order.length - 1
    const end = shouldBeNext ? order.length : -1
    const incr = shouldBeNext ? 1 : -1
    for (let i = start; i !== end; i += incr) {
      if (ci) {
        if (!pattern || (pattern.test && pattern.test(order[i].n))) {
          return this.focus(order[i].n, preventScroll)
        }
      }
      if (order[i].n === current) ci = true
    }

    return false
  }

  current() {
    return document.activeElement && document.activeElement.name
  }

  register(name, ref) {
    const { index } = this
    index[name] = ref
    this.updateIndex()
    if (
      this.scheduled &&
      (this.scheduled.name === name ||
        (this.scheduled.name.test && this.scheduled.name.test(name)))
    ) {
      //console.log('scheduled - ' + name)
      ref.current.focus({ preventScroll: this.scheduled.preventScroll })
      this.scheduled = null
    }
  }

  updateIndex() {
    // const els = document.querySelectorAll('[name]')
    // // console.log(els)
    // console.log(this.index)
    // let order = [], n = 0
    // for(let i = 0; i < els.length; ++i){
    //   if(this.index[els[i].name]){
    //     order.push({n: els[i].name, i: (els[i].tabIndex || 0) * 1000 + (n++)})
    //   }
    // }

    //console.log(this.index)

    // works correct only with tabIndex
    this.order = Object.keys(this.index).map((name, i) => ({
      n: name,
      i: (this.index[name].current.tabIndex || 0) * 1000 + i,
    }))

    this.order.sort((a, b) => {
      return a.i - b.i
    })

    //console.log(this.order)
  }

  remove(name) {
    const { index } = this
    delete index[name]
    this.updateIndex()
  }

  render() {
    return (
      <Context.Provider value={this.value}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

class FocusableField extends React.Component {
  ref = React.createRef()
  componentDidMount() {
    this.props.focusContext.focusRegister(this.props.name, this.ref)
  }

  componentWillUnmount() {
    this.props.focusContext.focusUnregister(this.props.name)
  }

  render() {
    const { component, refProp = 'ref', focusContext, ...props } = this.props
    const Component = component
    const ref = { [refProp]: this.ref }
    return <Component {...props} {...ref} />
  }
}

const Focusable = props => (
  <Context.Consumer>
    {context => <FocusableField {...props} focusContext={context} />}
  </Context.Consumer>
)

const withFocusControl = Component => props => (
  <Context.Consumer>
    {context => <Component {...{ ...context, ...props }} />}
  </Context.Consumer>
)

export { Provider, Focusable, withFocusControl }

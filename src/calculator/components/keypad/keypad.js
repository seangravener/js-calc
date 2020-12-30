import api from '../../data/service.js'
import events from '../../data/events.js'
import { Component } from '../base/Component.js'
import { Key } from '../base/Key.js'
import { templateFn, keypadLayout } from './keypad.template.js'
import { styles } from './keypad.styles.js'

let _keyCache = []
class KeypadComponent extends Component {
  get currentKey() {
    return _keyCache[_keyCache.length - 1] || {}
  }

  get previousKey() {
    return _keyCache[_keyCache.length - 2] || {}
  }

  constructor() {
    super()

    this.init()
    this.render()
  }

  init() {
    this.styles = styles
    this.templateFn = templateFn
    this.locals = { layout: keypadLayout }

    this.el.addEventListener('click', this.handleKeyPress.bind(this))
    this.hotkeys = hotkeys('*', this.handleKeyPress.bind(this))
    events.listenTo('input:next', () => this.render())
  }

  handleKeyPress(event) {
    let key = new Key(event)

    if (key.isDefined) {
      _keyCache.push(key)
      this.press(key).then((locals) => {
        events.publish(`input:next`, locals)
      })
    }
  }

  press(key) {
    const { previousKey, currentKey } = this
    const locals = { previousKey, currentKey, api }

    return new Promise(key.resolver(locals))
  }

  clear() {
    _keyCache = []
  }

  connectedCallback() {
    this.render()
  }
}

customElements.define('calc-keypad', KeypadComponent)
export { KeypadComponent }

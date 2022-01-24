import api, { StateService } from '../../data/state.service.js'
import events from '../../data/events.js'
import { Component } from '../base/Component.js'
import { Key } from '../base/Key.js'
import { templateFn, keypadLayout } from './keypad.template.js'
import { styles } from './keypad.styles.js'

let _keyCache = []
class KeypadComponent extends Component {
  get currentKey() {
    return this.stateService.current.currentKey
    // return _keyCache[_keyCache.length - 1] || {}
  }

  get previousKey() {
    return this.stateService.current.previousKey
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
    this.stateService = StateService.load()
    this.locals = { layout: keypadLayout }

    this.el.addEventListener('click', this.handleKeyPress.bind(this))
    this.hotkeys = hotkeys('*', this.handleKeyPress.bind(this))
    events.listenTo('input:next', () => this.render())
  }

  handleKeyPress(event) {
    let key = new Key(event)

    if (key.isDefined) {
      this.press$(key).then(() => {
        events.publish(`input:next`, this.stateService.current)
      })
    }
  }

  async press$(key) {
    _keyCache.push(key)
    // somethin here?
    return this.stateService.set$(key)
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

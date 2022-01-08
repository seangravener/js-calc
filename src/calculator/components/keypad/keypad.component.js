import api from '../../data/service.js'
import events from '../../data/events.js'
import { Component } from '../base/Component.js'
import { Key } from '../base/Key.js'
import { templateFn, keypadLayout } from './keypad.template.js'
import { styles } from './keypad.styles.js'
import { StateService } from '../../data/state.service.js'

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
    this.stateService = StateService.load()
    this.locals = { layout: keypadLayout }

    this.el.addEventListener('click', this.handleKeyPress.bind(this))
    this.hotkeys = hotkeys('*', this.handleKeyPress.bind(this))
    events.listenTo('input:next', () => this.render())
  }

  handleKeyPress(event) {
    let key = new Key(event)

    if (key.isDefined) {
      this.press(key).then((locals) => {
        events.publish(`input:next`, locals)
      })
    }
  }

  press(key) {
    _keyCache.push(key)
    const { previousKey, currentKey } = this
    const fsmachine = this.stateService.fsmachine
    const locals = { previousKey, currentKey, api }

    // return Promise instead
    const value = fsmachine.transition(fsmachine.value, key.type, locals)
    const { onEnter, onExit, numKey, opKey } = value

    onEnter(locals)

    //return new Promise((resolve, reject) => resolve({ value, ...locals }))
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

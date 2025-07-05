import { Key } from '../base/Key.js'
import events from '../../data/events.js'
import { styles } from './keypad.styles.js'
import { Component } from '../base/Component.js'
import { StateService } from '../../data/state.service.js'
import { templateFn, keypadLayout } from './keypad.template.js'

class KeypadComponent extends Component {
  #keyCache = []
  #maxCacheSize = 50
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
    const key = new Key(event)

    if (key.isDefined) {
      this.press$(key).then(() => {
        events.publish(`input:next`, this.stateService.current)
      })
    }
  }

  async press$(key) {
    this.#keyCache.push(key)
    if (this.#keyCache.length > this.#maxCacheSize) {
      this.#keyCache.shift()
    }
    return this.stateService.set$(key)
  }

  clear() {
    this.#keyCache.length = 0
  }

  get keyHistory() {
    return [...this.#keyCache]
  }

  get lastKey() {
    return this.#keyCache.at(-1) ?? null
  }

  get keyCount() {
    return this.#keyCache.length
  }

  connectedCallback() {
    this.render()
  }
}

customElements.define('calc-keypad', KeypadComponent)
export { KeypadComponent }

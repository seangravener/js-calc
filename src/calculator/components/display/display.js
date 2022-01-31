import api from '../../data/state.service.js'
import events from '../../data/events.js'
import { Component } from '../base/Component.js'
import { styles } from './display.styles.js'
import { templateFn } from './display.template.js'

class DisplayComponent extends Component {
  constructor() {
    super()
    this.init()
  }

  init() {
    this.styles = styles
    this.templateFn = templateFn
    this.locals = api.displayService.current

    events.listenTo('input:next', (state) => {
      this.locals = state.displayService.current
      this.render()
    })
  }

  connectedCallback() {
    this.render()
  }
}

customElements.define('calc-display', DisplayComponent)
export { DisplayComponent }

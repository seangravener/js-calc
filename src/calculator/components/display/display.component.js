import events from '../../data/events.js'
import { styles } from './display.styles.js'
import { Component } from '../base/Component.js'
import { templateFn } from './display.template.js'
import stateService from '../../data/state.service.js'
import displayService from '../../data/display.service.js'

class DisplayComponent extends Component {
  constructor() {
    super()
    this.init()
  }

  init() {
    this.styles = styles
    this.templateFn = templateFn
    this.locals = stateService.displayService.current

    events.listenTo('input:next', (state) => {
      this.locals = displayService.current
      this.render()
    })
  }

  connectedCallback() {
    this.render()
  }
}

customElements.define('calc-display', DisplayComponent)
export { DisplayComponent }

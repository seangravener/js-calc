import { Component } from '../base/Component.js'
import { EventBus } from '../../data/events.js'
import { StateService } from '../../data/state.service.js'
import { templateFn } from './calculator.template.js'

class CalculatorComponent extends Component {
  events = EventBus.load()
  api = StateService.load()

  constructor() {
    super()

    this.locals = {}
    this.templateFn = templateFn
  }

  connectedCallback() {
    this.render()
  }
}

customElements.define('calc-app', CalculatorComponent)
export { CalculatorComponent }

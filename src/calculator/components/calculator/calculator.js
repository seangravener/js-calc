import { Component } from "../base/component.js";
import { Memory } from "../../data/memory.js";
import { EventBus } from "../../data/events.js";
import { DataService } from "../../data/service.js";

import { templateFn } from "./calculator.template.js";

class CalculatorComponent extends Component {
  events = EventBus.load();
  api = DataService.load();
  // @todo load memory from service. `inputs` service api is enough.
  // memory = Memory.load();

  constructor() {
    super();

    this.locals = {};
    this.templateFn = templateFn;
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("app-calc", CalculatorComponent);
export { CalculatorComponent };

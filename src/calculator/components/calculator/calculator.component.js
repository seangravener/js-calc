import { Component } from "../base/component.js";
import { Memory } from "../../data/memory.js";
import { EventBus } from "../../data/events.js";
import { Inputs } from "../../data/inputs.js";

import { templateFn } from "./calculator.template.js";

class CalculatorComponent extends Component {
  events = EventBus.load();
  inputs = Inputs.load();
  // @todo load memory from service. `inputs` service api is enough.
  memory = Memory.load();

  constructor() {
    super();

    this.locals = {};
    this.templateFn = templateFn;
  }

  connectedCallback() {
    this.render();
  }
}

export { CalculatorComponent };

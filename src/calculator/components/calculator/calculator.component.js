import { Memory } from "../../data/memory.js";
import { EventBus } from "../../data/events.js";
import { Inputs } from "../../data/inputs.js";

import { Component } from "../base/component.js";
import { KeypadComponent } from "../keypad/keypad.component.js";
import { DisplayComponent } from "../display/display.component.js";
import { templateFn } from "./calculator.template.js";

class CalculatorComponent extends Component {
  events = EventBus.load();
  inputs = Inputs.load();
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

customElements.define("app-calc", CalculatorComponent);
customElements.define("calc-display", DisplayComponent);
customElements.define("calc-keypad", KeypadComponent);

export { CalculatorComponent };

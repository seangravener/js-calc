// Nested components: https://stackoverflow.com/questions/38976819/composing-v1-nested-web-components

// import { styles } from "./layout.styles.js";
import { KeypadComponent } from "../keypad/keypad.component.js";
import { DisplayComponent } from "../display/display.component.js";
import { templateFn } from "./layout.template.js";
import { Component } from "../base/component.js";
class CalcComponent extends Component {
  constructor(state) {
    super();

    Object.assign(this, state)
    this.locals = {}
    this.templateFn = templateFn;
  }

  connectedCallback() {

    this.render();
    console.log("connected calccomponent!");
  }
}

customElements.define("app-calc", CalcComponent);
customElements.define("calc-display", DisplayComponent);
customElements.define("calc-keypad", KeypadComponent);

export { CalcComponent };

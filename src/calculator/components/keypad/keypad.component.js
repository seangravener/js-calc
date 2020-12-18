import { Component } from "../base/component.js";
import { css } from "./keypad.styles.js";
import { templateFn, keypadLayout } from "./keypad.template.js";

class KeypadComponent extends Component {
  constructor() {
    super();

    this.init()
    this.render();
  }

  init() {
    this.styles = css;
    this.templateFn = templateFn;
    this.locals = { layout: keypadLayout }
  }

  connectedCallback() {
    console.log(this.styleEl)
    console.log("connected buttons!");
  }
}

export { KeypadComponent };

import { Component } from "../base/component.js";
import { templateFn } from "./keypad.template.js";
// import { keys } from "./keypad.layout.js";

class KeypadComponent extends Component {
  constructor() {
    super();

    this.locals = { title: "these are local to you, keypad." }; // keys
    this.templateFn = templateFn;
    this.render();
  }

  connectedCallback() {
    console.log("connected buttons!");
  }
}

export { KeypadComponent };

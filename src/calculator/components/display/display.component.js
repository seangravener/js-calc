import { Component } from "../base/component.js";
import { templateFn } from "./display.template.js";
class DisplayComponent extends Component {
  constructor() {
    super();

    this.locals = { operation: "operation value!!" };
    this.templateFn = templateFn;
    this.render();
  }

  connectedCallback() {
    console.log("connected display!");
  }
}

export { DisplayComponent };

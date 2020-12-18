import { Component } from "../base/component.js";
import { css } from "./display.styles.js";
import { templateFn } from "./display.template.js";
class DisplayComponent extends Component {
  constructor() {
    super();

    this.init();
    this.render();
  }

  init() {
    this.styles = css;
    this.templateFn = templateFn;
    this.locals = { operator: "+", history: "1 + 2", output: "3" };
  }

  connectedCallback() {
    console.log("connected display!");
  }
}

export { DisplayComponent };

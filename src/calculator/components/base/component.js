// Nested components: https://stackoverflow.com/questions/38976819/composing-v1-nested-web-components
import * as layout from "../layout/layout.component.js";

class Component extends HTMLElement {
  constructor() {
    super();

    this.locals = {};
    this.templateFn = Component.noop;
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    console.log("connected!");
  }

  debug() {
    console.log(this);
    return this;
  }

  render(locals = this.locals) {
    this.shadowRoot.innerHTML = this.templateFn(locals);
  }

  static noop = () => {};
}

export { Component };

import { newEl, noop } from "../../lib/functions.js";

class Component extends HTMLElement {
  locals = {};
  styles = "";
  templateFn = noop;

  get el() {
    return this.shadowRoot;
  }

  get styleEl() {
    return newEl("style", this.styles);
  }

  get markup() {
    return this.templateFn(this.locals);
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  render(locals = this.locals) {
    this.shadowRoot.innerHTML = this.markup;
    this.shadowRoot.prepend(this.styleEl);
  }
}

export { Component };

import { newEl } from "../../lib/functions.js";

class Component extends HTMLElement {
  locals = {};
  styles = "";
  templateFn = Component.noop;

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

  connectedCallback() {
    console.log("connected!");
  }

  debug() {
    console.log(this);
    return this;
  }

  render(locals = this.locals) {
    this.shadowRoot.innerHTML = this.markup;
    this.shadowRoot.prepend(this.styleEl);
  }

  static noop = () => {};
}

export { Component };

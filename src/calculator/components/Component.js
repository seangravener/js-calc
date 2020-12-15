// Nested components: https://stackoverflow.com/questions/38976819/composing-v1-nested-web-components
class Component extends HTMLElement {
  constructor(state) {
    super(state);
  }

  connectedCallback() {
    console.log("connected!");
  }

  debug() {
    console.log(this);
    return this;
  }
}

export { Component };

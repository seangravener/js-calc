import { Component } from "../component.js";
import { template } from "./display.template.js";
class DisplayComponent extends Component {
  constructor(state) {
    super(state);

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = template;
  }

  connectedCallback() {
    console.log("connected display!");
  }
}

export { DisplayComponent };

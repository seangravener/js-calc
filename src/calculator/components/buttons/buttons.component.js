import { Component } from "../component.js";
import { template } from "./buttons.template.js";
class ButtonsComponent extends Component {
  constructor(state) {
    super(state);

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = template;
  }

  connectedCallback() {
    console.log("connected buttons!");
  }
}

export { ButtonsComponent };

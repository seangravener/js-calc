import api from "../../data/service.js";
import events from "../../data/events.js";
import { Component } from "../base/Component.js";
import { styles } from "./display.styles.js";
import { templateFn } from "./display.template.js";

class DisplayComponent extends Component {
  constructor() {
    super();

    this.init();
    this.render();
  }

  init() {
    this.styles = styles;
    this.templateFn = templateFn;
    this.locals = { ...this.locals, history: api.history, ...api.get() };

    events.listenTo("api:change", (locals) => {
      this.locals = { history: api.history, ...locals };
      this.render();
    });
  }

  connectedCallback() {
    console.log("connected display!");
  }
}

customElements.define("calc-display", DisplayComponent);
export { DisplayComponent };

import api from "../../data/service.js";
import events from "../../data/events.js";
import { Component } from "../base/Component.js";
import { styles } from "./display.styles.js";
import { templateFn } from "./display.template.js";

class DisplayComponent extends Component {
  constructor() {
    super();

    this.init();
  }

  init() {
    const locals = api.get();
    const display = api.display;

    this.styles = styles;
    this.templateFn = templateFn;
    this.locals = { ...this.locals, ...locals, display };

    events.listenTo("output:next", (locals) => {
      this.locals = { ...this.locals, ...locals };
      console.log(this.locals);
      this.render();
    });
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("calc-display", DisplayComponent);
export { DisplayComponent };

import api from "../../data/service.js";
import events from "../../data/events.js";
import { Component } from "../base/component.js";
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

    // watch locals for changes with Proxy?
    this.locals = api.get()

    events.listenTo("api:save", (locals) => {
      console.log('api locals after save: ', locals)
      this.locals = locals;
      this.render()
    });
  }

  connectedCallback() {
    console.log("connected display!");
  }
}

customElements.define("calc-display", DisplayComponent);
export { DisplayComponent };

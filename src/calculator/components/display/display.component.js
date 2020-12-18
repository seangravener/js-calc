import { Component } from "../base/component.js";
import { css } from "./display.styles.js";
import { templateFn } from "./display.template.js";
import inputs from "../../data/inputs.js";
import events from "../../data/events.js";

class DisplayComponent extends Component {
  constructor() {
    super();

    this.init();
    this.render();
  }

  init() {
    this.styles = css;
    this.templateFn = templateFn;

    // watch locals for changes with Proxy?
    this.locals = inputs.get()

    events.listenTo("save", (locals) => {
      console.log('save!', locals)
      this.locals = locals;
      this.render()
    });
  }

  connectedCallback() {
    console.log("connected display!");
  }
}

export { DisplayComponent };

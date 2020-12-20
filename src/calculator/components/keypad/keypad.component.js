import { Component } from "../base/component.js";
import { templateFn, keypadLayout } from "./keypad.template.js";
import { css } from "./keypad.styles.js";
import { Key } from "../base/key.js";

class KeypadComponent extends Component {
  constructor() {
    super();

    this.init();
    this.render();
  }

  init() {
    this.styles = css;
    this.templateFn = templateFn;
    this.locals = { layout: keypadLayout };
    this.hotkeys = hotkeys("*", (event) => this.handleKeyPress(event.key));
  }

  handleKeyPress(symbol) {
    const key = new Key(symbol);

    if (key.isDefined) {
      key.press().then(({ key, api }) => {
        console.log(key, api);
        this.render();
      });
    }
  }

  connectedCallback() {
    this.render();
  }
}

export { KeypadComponent };

import { Component } from "../base/component.js";
import { Key } from "../base/key.js";
import { templateFn, keypadLayout } from "./keypad.template.js";
import { styles } from "./keypad.styles.js";

class KeypadComponent extends Component {
  constructor() {
    super();

    this.init();
    this.render();
  }

  init() {
    this.styles = styles;
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

customElements.define("calc-keypad", KeypadComponent);
export { KeypadComponent };

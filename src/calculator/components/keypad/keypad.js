import { Component } from "../base/Component.js";
import { Key } from "../base/Key.js";
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

    this.el.addEventListener("click", this.handleKeyPress.bind(this));
    this.hotkeys = hotkeys("*", this.handleKeyPress.bind(this));
  }

  handleKeyPress(event) {
    const key = new Key(event);

    if (key.isDefined) {
      key.press$().then(({ key, api }) => {
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

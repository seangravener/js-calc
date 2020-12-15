// Nested components: https://stackoverflow.com/questions/38976819/composing-v1-nested-web-components

// import { styles } from "./layout.styles.js";
import { ButtonsComponent } from "../buttons/buttons.component.js";
import { DisplayComponent } from "../display/display.component.js";
import { template } from "./layout.template.js";
class CalcComponent extends HTMLElement {
  constructor(state) {
    super();

    this.attachShadow({ mode: "open" });
    // const localStyles = document.createElement('styles')
    // localStyles.innerHTML = styles
    // this.shadowRoot.appendChild(localStyles)
    this.shadowRoot.innerHTML = template;
  }

  connectedCallback() {
    console.log("connected!");
  }

  debug() {
    console.log(this);
    return this;
  }
}

customElements.define("app-calculator", CalcComponent);
customElements.define("calc-display", DisplayComponent);
customElements.define("calc-buttons", ButtonsComponent);

export { CalcComponent };

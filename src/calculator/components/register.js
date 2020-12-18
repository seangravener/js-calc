import { KeypadComponent } from "./keypad/keypad.component.js";
import { DisplayComponent } from "./display/display.component.js";
import { CalculatorComponent } from "./calculator/calculator.component.js";

const registerComponents = () => {
  customElements.define("app-calc", CalculatorComponent);
  customElements.define("calc-display", DisplayComponent);
  customElements.define("calc-keypad", KeypadComponent);
};

export {
  registerComponents,
  KeypadComponent,
  DisplayComponent,
  CalculatorComponent,
};

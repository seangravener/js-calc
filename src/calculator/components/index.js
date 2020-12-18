import {
  registerComponents,
  CalculatorComponent,
  KeypadComponent,
  DisplayComponent,
} from "./base/component.register.js";

// @todo have components register themselves (decorator pattern)
registerComponents();

export { CalculatorComponent, KeypadComponent, DisplayComponent };

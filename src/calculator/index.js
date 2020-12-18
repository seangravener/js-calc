import { CalculatorComponent } from "./components/calculator/calculator.component.js";

const singleton = () => {
  return new CalculatorComponent();
};

export { CalculatorComponent };
export default singleton();

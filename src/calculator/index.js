import { CalculatorComponent } from "./components/index.js";

const singleton = () => {
  return new CalculatorComponent();
};

export { CalculatorComponent };
export default singleton();

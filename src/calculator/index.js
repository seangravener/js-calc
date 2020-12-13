import { CalculatorComponent } from "./component/calculator.component.js";
import { Memory } from "./data/memory.js";
import { EventBus } from "./data/events.js";
import { Inputs } from "./data/inputs.js";

const _state = new CalculatorComponent({
  events: EventBus.load(),
  inputs: Inputs.load(),
  memory: Memory.load(),
  // ui: Ui.load(),
});

const singleton = () => {
  return new CalculatorComponent(_state)
};

export { CalculatorComponent }
export default singleton()
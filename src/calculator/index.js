import { CalculatorComponent } from "./ui/calculator.js";
import { Memory } from "./data/memory.js";
import { EventBus } from "./data/events.js";
import { Inputs } from "./data/inputs.js";

const _instance = new CalculatorComponent({
  events: EventBus.load(),
  inputs: Inputs.load(),
  memory: Memory.load(),
  // ui: Ui.load(),
});

export { CalculatorComponent }
export default _instance
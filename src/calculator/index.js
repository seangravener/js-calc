import { CalcComponent } from "./components/layout/layout.component.js";
import { Memory } from "./data/memory.js";
import { EventBus } from "./data/events.js";
import { Inputs } from "./data/inputs.js";

const _state = new CalcComponent({
  events: EventBus.load(),
  inputs: Inputs.load(),
  memory: Memory.load(),
  // ui: Ui.load(),
});

const singleton = () => {
  return new CalcComponent(_state)
};

export { CalcComponent }
export default singleton()

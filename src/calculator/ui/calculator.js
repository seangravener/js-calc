import Component from "./component.js";
import { Memory } from "../data/memory.js";
import { EventBus } from "../data/events.js";
import { Inputs } from "../data/inputs.js";


const _state = {
  events: EventBus.load(),
  inputs: Inputs.load(),
  memory: Memory.load(),
  // ui: Ui.load(),
};

class Calculator extends Component {
  constructor(state) {
    super({ ...state, ..._state });
  }
}

export default Calculator;

import { Totalizator } from "./totalizator.js";
import { State } from "./state.js"

const services = {
  totalizator: Totalizator.load(),
  state: State.load()
};

export default { services };

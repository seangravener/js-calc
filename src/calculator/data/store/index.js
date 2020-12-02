import Calculator from "../../ui/calculator.js";
import Memory from "./memory.js";
import EventBus from "./events.js.js.js";

const memory = new Memory();
const events = new Event()
const calculator = new Calculator({ memory, events });

export { memory };
// export default calculator;

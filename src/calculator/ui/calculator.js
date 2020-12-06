import Component from "./component.js";
import { operators } from "../lib/functions.js";
import { Memory } from "../data/memory.js";
import { EventBus } from "../data/events.js";
import { Totalizator } from "../data/totalizator.js";
import { State } from "../data/state.js";


const startup = {
  state: State.load(),
  events: EventBus.load(),
  memory: Memory.load(),
  totalizator: Totalizator.load(),
  // ui: Ui.load(),
};

class Calculator extends Component {
  constructor(state) {
    super({ state, ...startup });
  }
}

export default Calculator;

// use state api to set calculation props
// use state api to getAnswer()
// use state api to bind currOperator with the last memory bit [...'+']

// in state api:
// use totalizator api to compute()(), getOperands(), setOperands(), setCurrOperator

// in totalizator api:
// use memory as the authority for [operandA, 'operator', operandB, 'currOperator' ]
// use use memory to get and store totalizator's state bits



/**
 * compute('+')(2, 3)
 */
const compute = (operator) => {
  return (a, b) => {
    return operators[operator](a, b);
  };
};

//   compute(operator, a, b) {
//     memory.store(b, operator)
//     input.value = a // input shares state with totalizer
//     const answer = appState.answer

//     memory.set([1, '+', 1, ''])
//   }

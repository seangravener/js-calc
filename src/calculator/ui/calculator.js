import Component from "./component.js";
import { operators } from "../lib/functions.js";
import { Memory } from "../data/memory.js";
import { EventBus } from "../data/events.js";
import { Totalizator } from "../data/totalizator.js";
import { State } from "../data/state.js";


const startup = {
  state: State.load(),
  totalizator: Totalizator.load(),
  memory: Memory.load(),
  events: EventBus.load(),
  // ui: Ui.load(),
};

class Calculator extends Component {
  constructor(state) {
    super({ state, ...startup });
  }
}

export default Calculator;

// use state api to set operands
// use state api to getAnswer()
// use state api to bind currOperator with the last memory bit [...'+']

// in state api:
// use totalizator api to compute()(), getOperands(), setOperands(), setCurrOperator
// use mem api to crud
// use memory as the authority for [operandA, 'operator', operandB, 'currOperator' ]

// in totalizator api:
// use state to get and set totalizator's state bits.
//   ^^ or use state.operandA in totalizator <--



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

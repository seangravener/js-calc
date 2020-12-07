import Component from "./component.js";
import { operators } from "../lib/functions.js";
import { Memory } from "../data/memory.js";
import { EventBus } from "../data/events.js";
import { Totalizator } from "../data/totalizator.js";
import { Inputs } from "../data/inputs.js";


const _state = {
  events: EventBus.load(),
  inputs: Inputs.load(),
  memory: Memory.load(),
  totalizator: Totalizator.load(),
  // ui: Ui.load(),
};

class Calculator extends Component {
  constructor(state) {
    super({ ...state, ..._state });
  }
}

export default Calculator;

// use input api to set operands
// use input api to getAnswer()
// use input api to bind currOperator with the last memory bit [...'+']

// in input api:
// use totalizator api to compute()(), getOperands(), setOperands(), setCurrOperator
// use mem api to crud
// use memory as the authority for [operandA, 'operator', operandB, 'currOperator' ]

// in totalizator api:
// use inputs to get and set totalizator's state bits.
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

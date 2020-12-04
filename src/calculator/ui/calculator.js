import Component from "../data/models/component.js";
import store from "../data/store/instance.js";
import services from "../data/services/instance.js";
class Calculator extends Component {
  // get operand() {}

  constructor() {
    super({ store, ...services });


    // put everything on the component here. forget "service, store"
    console.log(this.services.state.currentOperand);
    this.services.state.currentOperand = 100;
  }

  // bind keyboard / ui

  // compute() {}
}

export default Calculator;

//   compute(operator, a, b) {
//     memory.store(b, operator)
//     input.value = a // input shares state with totalizer
//     const answer = appState.answer

//     memory.set([1, '+', 1, ''])
//   }

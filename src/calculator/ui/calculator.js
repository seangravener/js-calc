import Component from "../data/models/component.js";
import store from "../data/store/index.js";
class Calculator extends Component {
  constructor() {
    super({ store });
  }
}

export default Calculator;


  //   compute(operator, a, b) {
  //     memory.store(b, operator)
  //     input.value = a // input shares state with totalizer
  //     const answer = appState.answer

  //     memory.set([1, '+', 1, ''])
  //   }

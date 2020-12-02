import { events, input, memory, totalizator } from "./lib/index.js";

class Component {
  constructor(props) {
    Object.assign(this, props);
  }

  render() {}

  debug() {
    console.log(this);
  }
}

class Calculator extends Component {
  constructor() {
    super({ events, input, memory, totalizator });

    events.listenTo(['memory:store'], (a) => console.log('memory:store -->', a))
    events.listenTo(['memory:store'], (a) => console.log('memory:store -->', a))
    events.listenTo(['memory:store1'], (a) => console.log('memory:store 1-->', a))
    events.listenTo(['memory:store2'], (a) => console.log('memory:store 2-->', a))

    memory.store(1, "+")

    events.publish('memory:store', 'woot!')
  }

//   compute(operator, a, b) {
//     memory.store(b, operator)
//     input.value = a // input shares state with totalizer
//     const answer = appState.answer

//     memory.set([1, '+', 1, ''])
//   }

}

const calc = new Calculator();
console.log(calc);

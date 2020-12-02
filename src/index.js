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

    events.listenTo('memory:store', (a) => console.log('memory:store -->', a))

    memory.store(1, "+")
  }
}

const calc = new Calculator();
console.log(calc);

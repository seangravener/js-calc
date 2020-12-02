import Component from "../data/models/component.js";

class Calculator extends Component {
  constructor({ memory, events }) {
    super({ memory, events });

    events.listenTo(["memory:store"], (a) =>
      console.log("memory:store -->", a)
    );
    events.listenTo(["memory:store"], (a) =>
      console.log("memory:store -->", a)
    );
    events.listenTo(["memory:store1"], (a) =>
      console.log("memory:store 1-->", a)
    );
    events.listenTo(["memory:store2"], (a) =>
      console.log("memory:store 2-->", a)
    );

    // memory.store(1, "+")

    // store.memory.store(1, "+");
    // calc.memory.store();

    events.publish("memory:store", "woot!");
  }

  //   compute(operator, a, b) {
  //     memory.store(b, operator)
  //     input.value = a // input shares state with totalizer
  //     const answer = appState.answer

  //     memory.set([1, '+', 1, ''])
  //   }
}

export default Calculator

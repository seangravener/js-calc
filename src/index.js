import memory from "./lib/index.js";

class Component {
  constructor(props) {
    Object.assign(this, props);
  }

  render() {}
}

class Calculator extends Component {
  constructor() {
    super({ memory });
  }
}

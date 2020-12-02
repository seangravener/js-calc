class Component {
  constructor(props) {
    Object.assign(this, props);
  }

  render() {}

  debug() {
    console.log(this);
    return this;
  }
}

export default Component;

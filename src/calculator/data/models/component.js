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

export { Component };
export default Component;

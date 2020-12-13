class Component {
  constructor(props) {
    Object.assign(this, props);

    // overload initial memry
    // if (locals.memory) this.memory.reset({ chunks: locals.memory})
  }

  debug() {
    console.log(this);
    return this;
  }
}

export { Component };

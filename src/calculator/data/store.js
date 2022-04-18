import eventBus, { EventBus } from './events'

/**
 * store returns copy of current state
 * commit method calls mutation
 * dispatch method calls actions
 */

class Store {
  actions = {}
  mutations = {}
  state = {}
  status = 'resting'
  events = new EventBus()
  // events = eventBus

  constructor({ actions, mutations, state }) {
    this.actions = actions || this.actions
    this.mutations = mutations || this.mutations

    this.state = new Proxy(state, this.onStateChangeHandler)
  }

  onStateChangeHandler(state, key, value) {
    this.state[key] = value
    console.log(`stateChange: ${key}: ${value}`)
    this.events.publish('stateChange', this.state)

    if (self.status !== 'mutation') {
      console.warn(`You should use a mutation to set ${key}`)
    }

    self.status = 'resting'

    return true
  }

  dispatch(actionKey, payload) {
    if (typeof this.actions[actionKey] !== 'function') {
      console.error(`Action ${actionKey} doesn\'t exist`)
      return false
    }

    this.status = 'action'
    this.actions[actionKey](this, payload)

    return true
  }

  commit(mutationKey, payload) {
    if (typeof this.actions[mutationKey] !== 'function') {
      console.error(`Action ${mutationKey} doesn\'t exist`)
      return false
    }

    this.status = 'mutation'
    let localState = this.mutations[mutationKey](this.state, payload)
    this.state = { ...this.state, localState }

    return true
  }
}

export { Store }

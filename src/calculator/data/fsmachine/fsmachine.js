import events from '../events.js'
import { _STATE_ } from '../state.service.js'
import { _DISPLAY_ } from '../display.service.js'

let _value = ''
let _definition = { initialState: '' }
let _previous = { fromStateId: '', withTransition: '', toStateId: '' }
let _state = [{ ..._STATE_, display: _DISPLAY_ }]

class FSMachine {
  machineId = ''

  get state() {
    return { ..._state, value: this.value }
  }

  // @todo remove redunent .current props from services
  set state(state) {
    _state.push({ ..._state, ...state })
    events.publish('output:next', this.state)
  }

  get definition() {
    return _definition
  }

  set definition(definition) {
    _definition = definition || _definition
  }

  get value() {
    return _value || this.definition.initialState
  }

  set _value(value) {
    _value = value
  }

  get previous() {
    return _previous
  }

  constructor(definition = {}) {
    this.machineId = definition.machineId
    this.definition = { ...this.definition, ...definition }

    this.value = definition.value || this.value
  }

  async transition$(fromStateId, transitionId) {
    let fromState, withTransition, toState
    // if (!transitionId) return

    if (isValidTransition(fromStateId, transitionId, this.definition)) {
      fromState = this.definition[fromStateId]
      withTransition = fromState.transitions[transitionId]
      toState = this.definition[withTransition.toStateId]

      this.state = await withTransition.action
        .call(this, { api: this })
        .then(() => fromState.actions.onExit.call(this, { api: this }))
        .then(() => toState.actions.onEnter.call(this, { api: this }))

      // withTransition.action.call(this, { api: this })
      // fromState.actions.onExit.call(this, { api: this })
      // toState.actions.onEnter.call(this, { api: this })

      _value = withTransition.toStateId
      _previous = {
        fromStateId: _value,
        transitionId,
        toStateId: withTransition.toStateId
      }
    }

    return new Promise((resolve, reject) => {
      resolve({
        value: _value
      })
    })
  }

  reset() {
    _value = ''
    _previous = { fromStateId: '', withTransition: '', toStateId: '' }
  }

  static isStateDefined(fromStateId) {
    return !!_definition[fromStateId]
  }
}

const isValidTransition = (stateId, transitionId, definition) => {
  if (!FSMachine.isStateDefined(stateId)) {
    return false
  } else if (
    !definition[stateId].transitions[transitionId] ||
    !definition[definition[stateId].transitions[transitionId].toStateId]
  ) {
    return false
  }

  return true
}

export { FSMachine }

/**
 * Specs:
 * [x] Each state can define actions that occur when a machine enters or exits that state. Actions will typically have side effects.
 * [x] One state is defined as the initial state. When a machine starts to execute, it automatically enters this state.
 * [x] Each state can define actions that occur when a machine enters or exits that state. Actions will typically have side effects.
 * [x] Each state can define events that trigger a transition.
 * [x] A transition defines how a machine would react to the event, by exiting one state and entering another state.
 * [x] A transition can define actions that occur when the transition happens. Actions will typically have side effects.
 *
 * Inspired by
 * https://statecharts.dev/what-is-a-state-machine.html
 * https://kentcdodds.com/blog/implementing-a-simple-state-machine-library-in-javascript
 */

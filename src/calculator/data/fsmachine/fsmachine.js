let _value = ''
let _definition = { initialState: '' }
let _history = { fromStateId: '', withTransition: '', toStateId: '' }

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

export class FSMachine {
  machineId = ''

  get definition() {
    return _definition
  }

  set definition(definition) {
    _definition = definition || _definition
  }

  get value() {
    return _value || this.definition.initialState
  }

  get history() {
    return _history
  }

  constructor(definition = {}) {
    this.machineId = definition.machineId
    this.definition = { ...this.definition, ...definition }

    _value = definition.value || this.value
  }

  transition$(fromStateId, transitionId, locals = {}) {
    let fromState, withTransition, toState

    if (isValidTransition(fromStateId, transitionId, this.definition)) {
      fromState = this.definition[fromStateId]
      withTransition = fromState.transitions[transitionId]
      toState = this.definition[withTransition.toStateId]

      withTransition.action(locals)
      fromState.actions.onExit(locals)
      toState.actions.onEnter(locals)

      _value = withTransition.toStateId
      _history = {
        fromStateId: _value,
        transitionId,
        toStateId: withTransition.toStateId
      }
    }

    return new Promise((resolve, reject) => {
      resolve({
        value: _value,
        ...locals
      })
    })
  }

  reset() {
    _value = ''
    _history = { fromStateId: '', withTransition: '', toStateId: '' }
  }

  static isStateDefined(fromStateId) {
    return !!_definition[fromStateId]
  }
}

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

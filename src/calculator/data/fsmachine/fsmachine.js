import events from '../events.js'

let _value = ''
let _definition = { initialState: '' }
let _previous = { fromStateId: '', withTransition: '', toStateId: '' }

class FSMachine {
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

  get previous() {
    return _previous
  }

  constructor(definition = {}) {
    this.machineId = definition.machineId
    this.definition = { ...this.definition, ...definition }

    _value = definition.value || this.value
  }

  async transition$(fromStateId, transitionId) {
    let fromState, withTransition, toState
    // if (!transitionId) return

    if (isValidTransition(fromStateId, transitionId, this.definition)) {
      fromState = this.definition[fromStateId]
      withTransition = fromState.transitions[transitionId]
      toState = this.definition[withTransition.toStateId]

      // console.log('calling transition', withTransition)
      withTransition.action.call(this, { api: this })
      fromState.actions.onExit.call(this, { api: this })
      toState.actions.onEnter.call(this, { api: this })

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

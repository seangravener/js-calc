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

function isStateDefined(fromStateId, stateDefinitions) {
  return !!stateDefinitions[fromStateId]
}

export function createMachine(stateDefinition = {}) {
  const machine = {
    value: stateDefinition.initialState,
    transition(fromStateId, transitionId) {
      let fromState, withTransition, toState

      if (!isStateDefined(fromStateId, stateDefinition)) return
      fromState = stateDefinition[fromStateId]
      withTransition = fromState.transitions[transitionId]
      toState = stateDefinition[withTransition.toStateId]

      withTransition.action()
      fromState.actions.onExit()
      toState.actions.onEnter()
      machine.value = withTransition.toStateId

      return machine.value
    }
  }

  return machine
}

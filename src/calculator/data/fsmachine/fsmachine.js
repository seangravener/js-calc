function isStateDefined(fromStateId, stateDefinitions) {
  return !!stateDefinitions[fromStateId]
}

export default function createMachine(stateDefinition = {}) {
  const machine = {
    value: stateDefinition.value || stateDefinition.initialState,
    transition$(fromStateId, transitionId, locals = {}) {
      let fromState, withTransition, toState

      if (!isStateDefined(fromStateId, stateDefinition)) return
      fromState = stateDefinition[fromStateId]
      withTransition = fromState.transitions[transitionId]

      console.log('fromStateId', 'transitionId', 'withTransition')
      console.log(fromStateId, transitionId, withTransition)
      if (
        !withTransition ||
        !stateDefinition[fromState.transitions[transitionId].toStateId]
      ) {
        console.log('no withTransition', fromStateId, transitionId)
        return new Promise((resolve, reject) => {
          resolve({
            value: machine.value,
            ...locals
          })
        })
      }
      toState = stateDefinition[withTransition.toStateId]

      console.log('**stateDefinition')
      console.log(stateDefinition, '\n -->LOCALS', locals)

      withTransition.action(locals)
      fromState.actions.onExit(locals)
      toState.actions.onEnter(locals)
      machine.value = withTransition.toStateId

      return new Promise((resolve, reject) => {
        resolve({
          value: machine.value,
          ...locals
        })
      })
    },
    transition(fromStateId, transitionId, locals = {}) {
      let fromState, withTransition, toState

      if (!isStateDefined(fromStateId, stateDefinition)) return
      fromState = stateDefinition[fromStateId]
      withTransition = fromState.transitions[transitionId]
      toState = stateDefinition[withTransition.toStateId]

      // wrap in Promise?
      withTransition.action({ fromStateId, transitionId, ...locals })
      fromState.actions.onExit({ toState, transitionId, ...locals })
      toState.actions.onEnter({ fromStateId, transitionId, ...locals })
      machine.value = withTransition.toStateId

      return {
        value: machine.value,
        withTransitionAction: withTransition.action,
        onExit: fromState.actions.onExit,
        onEnter: fromState.actions.onEnter
      }

      return machine.value
    }
  }

  return machine
}

export class FSMachine {
  definition = { initialState: '' }
  machine = { machineId: '', value: '', transition() {} }

  constructor(definition = {}) {
    this.definition = { ...this.definition, ...definition }
    this.machine = createMachine(this.definition)
  }

  createMachine(definition = this.definition) {
    this.machine = createMachine(definition)
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

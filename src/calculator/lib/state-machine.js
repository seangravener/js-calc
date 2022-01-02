// https://statecharts.dev/what-is-a-state-machine.html
// https://kentcdodds.com/blog/implementing-a-simple-state-machine-library-in-javascript

/**
 * Specs:
 * [x] Each state can define actions that occur when a machine enters or exits that state. Actions will typically have side effects.
 * [x] One state is defined as the initial state. When a machine starts to execute, it automatically enters this state.
 * [x] Each state can define actions that occur when a machine enters or exits that state. Actions will typically have side effects.
 * [x] Each state can define events that trigger a transition.
 * [x] A transition defines how a machine would react to the event, by exiting one state and entering another state.
 * [] A transition can define actions that occur when the transition happens. Actions will typically have side effects.
 */

// state definition
const machine = createMachine({
  initialState: 'off',
  off: {
    actions: {
      onEnter() {
        console.log('off:onEnter')
      },
      onExit() {
        console.log('off:onEnter')
      }
    },
    transitions: {
      toggle: {
        target: 'on',
        action() {
          console.log('This is a transition action for "toggle" off->on')
        }
      }
    }
  },
  on: {
    actions: {
      onEnter() {
        console.log('on:onEnter')
      },
      onExit() {
        console.log('on:onEnter')
      }
    },
    transitions: {
      toggle: {
        target: 'off',
        action() {
          console.log('This is a transition action for "toggle" on->off')
        }
      }
    }
  }
})

function createMachine(stateMachineDefinition) {
  const machine = {
    value: stateMachineDefinition.initialState,
    transition(currentState, event) {
      const currentStateDefinition = stateMachineDefinition[currentState]
      const destinationTransition = currentStateDefinition.transitions[event]

      if (!destinationTransition) {
        return
      }

      const destinationState = destinationTransition.target
      const destinationStateDefinition =
        stateMachineDefinition[destinationState]

      destinationTransition.action()
      currentStateDefinition.actions.onExit()
      destinationStateDefinition.actions.onEnter()

      machine.value = destinationState

      return machine.value
    }
  }
}

let state = machine.value
console.log(`current state: ${state}`)

state = machine.transition(state, 'toggle')
console.log(`current state: ${state}`)

state = machine.transition(state, 'toggle')
console.log(`current state: ${state}`)

import { createMachine } from '@xstate/fsm'

const calcStateMachine = createMachine({
  id: 'toggle',
  initial: 'inactive',
  states: {
    inactive: { on: { TOGGLE: 'active' } },
    active: { on: { TOGGLE: 'inactive' } }
  }
})

// export default calcStateMachine
export default calcStateMachine
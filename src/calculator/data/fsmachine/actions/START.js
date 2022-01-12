export const START = {
  actions: {
    onEnter(locals) {
      // eventbus -> 'this.id'
      // events.publish(this.machineId, this)
    },
    onExit(locals) {
      
    }
  },

  transitions: {
    numKey: {
      toStateId: 'FIRST_ARG',
      action(locals) {
        const { currentKey, api } = locals
        

        if (api) {
          api.display.set(currentKey || '0')
        }
        // display = num || 0
      }
    },
    dotKey: {
      toStateId: 'FIRST_ARG_FLOAT',
      action({ api }) {
        // api.display.value = '0.';
        // display = '0.'
      }
    }
  }
}

// export class FSMachineBaseAction {
//   actions = { onEnter() {}, onExit() {} }
//   transitions = {}

//   constructor({ actions, transitions }) {
//     this.actions = { ...this.actions, ...actions }
//     this.transitions = { ...this.transitions, ...transitions }
//   }
// }

// export class FSMachineAction extends FSMachineBaseAction {
//   transitionId = ''

//   constructor(transitionId, { actions, transitions }) {
//     super({ actions, transitions })
//     this.transitionId = transitionId
//   }
// }

// const machine = new FSMachineAction()
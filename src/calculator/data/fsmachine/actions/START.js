export const START = {
  actions: {
    onEnter() {
      // console.log('START action: onEnter');
      // eventbus -> 'this.id'
      // events.publish(this.machineId, this)
    },
    onExit() {
      // console.log('START action: onExit');
    }
  },

  transitions: {
    numKey: {
      toStateId: 'FIRST_ARG',
      action() {
        // display = num
      }
    },
    dotKey: {
      toStateId: 'FIRST_ARG_FLOAT',
      action() {
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

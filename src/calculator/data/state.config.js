export const calcMachineDefinition = {
  initialState: 'off',
  off: {
    actions: {
      onEnter() {
        console.log('off action: onEnter')
      },
      onExit() {
        console.log('off action: onExit')
      }
    },
    transitions: {
      toggle: {
        toStateId: 'on',
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
        toStateId: 'off',
        action() {
          console.log('This is a transition action for "toggle" on->off')
        }
      }
    }
  }
}
export const actions = { onEnter() {}, onExit() {} }

export const transitions = {
  numKey: {
    toStateId: 'FIRST_ARG',
    action({ currentKey, api }) {
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

export const START = { actions, transitions }

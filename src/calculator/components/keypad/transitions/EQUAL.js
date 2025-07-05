import { CONTROLS } from '../../../lib/constants.js'

export const actions = { onEnter() { }, onExit() { } }

export const transitions = {
  numKey: {
    toStateId: 'FIRST_ARG',
    action({ api }) {
      api.displayService.set({ operandA: api.currentKey.symbol, operator: '', operandB: '' })
    }
  },
  eqKey: {
    toStateId: 'EQUAL',
    action({ api }) {
      const { operandA, operator, operandB } = api.displayService.current
      if (operator && operandB) {
        const result = api.displayService.totalizator.compute([[operandA, operator], [operandB, null]])
        api.displayService.set({
          operandA: result,
          operator: '',
          operandB: ''
        })
      }
    }
  },
  dotKey: {
    toStateId: 'FIRST_ARG_FLOAT',
    action({ api }) {
      api.displayService.set({ operandA: `0${CONTROLS.DOT}`, operator: '', operandB: '' })
    }
  },
  opKey: {
    toStateId: 'OP',
    action({ api }) {
      api.displayService.set({
        operator: api.currentKey.symbol,
        operandA: api.displayService.value,
        operandB: ''
      })
    }
  },
  reset: {
    toStateId: 'START',
    action({ api }) {
      api.displayService.reset()
    }
  }
}

export const EQUAL = { actions, transitions }

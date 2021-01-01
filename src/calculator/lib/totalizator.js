import { arithmetic, arraysMatch } from './functions.js'
import { _nullMemoryChunk_ } from '../data/memory.js'

class Totalizator {
  constructor() {}

  compute(memory) {
    const last = memory.slice(-1)[0] || []
    const snapshot = arraysMatch(last, _nullMemoryChunk_)
      ? memory
      : [...memory, _nullMemoryChunk_]

    return snapshot.length ? `${snapshot.reduce(this.memoryReducer)[0]}` : '0'
  }

  memoryReducer(chunk, [operandB, nextOperator = '']) {
    const [operandA, operator] = chunk
    const nextOperandA =
      operator && `${operandB}`
        ? arithmetic(operator)(operandA, operandB)
        : operandA

    return [nextOperandA, nextOperator]
  }
}

export { Totalizator }
export default new Totalizator()

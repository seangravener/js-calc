import { arithmetic } from './functions.js'

class Totalizator {
  constructor() {}

  compute(memory) {
    return memory.length ? `${memory.reduce(this.memoryReducer)[0]}` : '0'
  }

  memoryReducer(chunk, [operandB, nextOperator = '']) {
    let [operandA, operator] = [`${chunk[0]}`, chunk[1]]
    operandA =
      operandB && operator ? arithmetic(operator)(operandA, operandB) : operandA

    return [operandA, nextOperator]
  }
}

export { Totalizator }
export default new Totalizator()

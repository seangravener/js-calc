import totalizator from '../lib/totalizator.js'
import { arraysMatch } from '../lib/functions.js'

let _instance = undefined

const _zero_ = '0'
const _nullMemoryChunk_ = [_zero_, null]
let _memory = [_nullMemoryChunk_]

class Memory {
  get memory() {
    return _memory
  }

  set memory(chunks) {
    const toStr = (value) => Memory.toString(value)
    _memory = chunks.map(([operandA, operator]) => [toStr(operandA), operator])
  }

  get length() {
    return this.memory.length
  }

  get operandA() {
    return this.length > 1 ? `${totalizator.compute(this.memory)}` : _zero_
  }

  get operandB() {
    return this.get(1).operandB
  }

  set operandB(operandB) {
    this.setPosition(1, { operandB })
  }

  get operator() {
    return this.get(1).operator || ''
  }

  set operator(operator) {
    this.setPosition(1, { operator })
  }

  constructor(memory = _memory) {
    this.memory = memory
  }

  asFloats() {
    const { operator, operandB } = this.get(1)
    const active = { operandB, operandA: this.operandA }
    const operands = Object.keys(active).reduce((values, key) => {
      return { ...values, ...{ [key]: parseFloat(active[key]) } }
    }, {})

    return { operator, ...operands }
  }

  validateStartChunk() {
    const [startChunk, ...rest] = this.recall()
    if (arraysMatch(startChunk, _nullMemoryChunk_)) {
      this.memory.shift()
    }
  }

  normalizeChunks(chunks) {
    const [first = [], ...rest] = chunks
    return !Array.isArray(first) ? [[first, ...rest]] : chunks
  }

  storeChunks(chunks = []) {
    const { memory, normalizeChunks } = this
    let forStore = [...memory, ...normalizeChunks(chunks)]

    // When operator is given, append empty row
    if (!!forStore[forStore.length - 1][1]) {
      forStore = [...forStore, _nullMemoryChunk_]
    }

    this.memory = forStore
    this.validateStartChunk()
    return this
  }

  // setChunks(chunks = [_nullMemoryChunk_]) {
  //   chunks.forEach((chunk, i) => {
  //     const [operandB, operator] = chunks[i]

  //     if (i < this.memory.length) {
  //       this.setPosition(i + 1, { operator, operandB })
  //     } else {
  //       this.storeChunks([operandB, operator])
  //     }
  //   })

  //   return this.memory
  // }

  setPosition(position, locals) {
    const positionValue = this.get(position)
    const index = this.memory.length - position
    const { operator, operandB } = { ...positionValue, ...locals }

    positionValue
      ? (this.memory[index] = [operandB, operator])
      : this.storeChunks([operandB, operator])

    return { operator, operandB }
  }

  get(position) {
    const chunks = this.recall(position)
    const operandA = Memory.compute(this.recall()) // not position aware?
    const [operandB, operator] = chunks[0]

    return this.length >= position ? { operandA, operator, operandB } : {}
  }

  recall(count) {
    if (count < 0) {
      return this.memory.slice(0, count)
    }

    return count ? this.memory.slice(-count) : this.memory
  }

  clear() {
    this.memory = [_nullMemoryChunk_]
  }

  allClear() {
    this.clear()
  }

  static toString(obj) {
    return `${obj}`.replace(/[, ]+/g, '')
  }

  static compute(memory) {
    return totalizator.compute(memory)
  }

  // @todo tidy up instantiation defaults
  static load(memory = _memory) {
    return _instance || (_instance = new Memory(memory))
  }
}

export { Memory, _zero_, _nullMemoryChunk_ }
export default Memory.load()

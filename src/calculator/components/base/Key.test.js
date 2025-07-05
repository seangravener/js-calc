import { Key } from './Key.js'

describe('Key symbol mapping', () => {
  const createMockEvent = (key, textContent = null) => ({
    key,
    target: { textContent }
  })

  test('should map x to * for multiplication', () => {
    const event = createMockEvent(null, 'x')
    const key = new Key(event)
    expect(key.symbol).toBe('*')
  })

  test('should map − to - for subtraction', () => {
    const event = createMockEvent(null, '−')
    const key = new Key(event)
    expect(key.symbol).toBe('-')
  })

  test('should map < to Del for backspace', () => {
    const event = createMockEvent(null, '<')
    const key = new Key(event)
    expect(key.symbol).toBe('Del')
  })

  test('should map Enter to =', () => {
    const event = createMockEvent('Enter')
    const key = new Key(event)
    expect(key.symbol).toBe('=')
  })

  test('should map Escape to C', () => {
    const event = createMockEvent('Escape')
    const key = new Key(event)
    expect(key.symbol).toBe('C')
  })

  test('should preserve ÷ symbol unchanged', () => {
    const event = createMockEvent(null, '÷')
    const key = new Key(event)
    expect(key.symbol).toBe('÷')
  })

  test('should identify correct key types', () => {
    const opEvent = createMockEvent(null, '*')
    const opKey = new Key(opEvent)
    expect(opKey.type).toBe('opKey')

    const numEvent = createMockEvent(null, '5')
    const numKey = new Key(numEvent)
    expect(numKey.type).toBe('numKey')

    const resetEvent = createMockEvent(null, 'C')
    const resetKey = new Key(resetEvent)
    expect(resetKey.type).toBe('reset')
  })
})

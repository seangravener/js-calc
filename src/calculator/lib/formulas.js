const controlOperations = {
  Enter: (a, b) => a,
  '=': (a, b) => a
}

const mathOperations = {
  '*': (a, b) => a * b,
  '-': (a, b) => a - b,
  '÷': (a, b) => a / b,
  '+': (a, b) => a + b
}

export { controlOperations, mathOperations }

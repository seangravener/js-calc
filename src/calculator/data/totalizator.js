import inputs from "./inputs.js";
import { arithmetic, operators } from "../lib/functions.js";

let _instance = undefined;

class Totalizator {
  constructor() {}

  compute(memory) {
    const snapshot = memory;
    // console.log("reduce!\n", snapshot.reduce(this.memoryReducer, 0));
    return snapshot.length
      ? snapshot.reduce(this.memoryReducer, 0)
      : "Err. Nothing in memory to compute.";
  }

  memoryReducer(operandA, [operator, operandB]) {
    // console.log(operandA, operandB, operator);
      let ans = operandA;

      switch (operator) {
        case "+":
          ans = operandA + operandB;
          break;
        case "-":
          ans = operandA - operandB;
          break;
        case "*":
          ans = operandA * operandB;
          break;
        default:
      }

      // debugger;
      return ans;
  }

  // memoryReducer(state, value, index, memory) {
  //   if (!value) return state;

  //   const initState = { operandA: 0, operandB: 0, operator: "" };
  //   state = { ...initState, ...state };

  //   if (index === 1) {
  //     state.operandA = value;
  //     return state;
  //   }

  //   const mode = operators.includes(value) ? "operator" : "number";

  //   // const toggle = () => {}
  //   state = {
  //     ...state,
  //     operandB: mode === "number" ? value : state.operandB,
  //     operator: mode === "operator" ? value : state.operator,
  //     answer() {
  //       return arithmetic(state.operator, [state.operandA, state.operandB]);
  //     },
  //   };

  //   const isValid = () =>
  //     !!state.operandA && !!state.operandB && !!state.operator;

  //   if (isValid()) {
  //     state.operandA = arithmetic(state.operator, [
  //       state.operandA,
  //       state.operandB,
  //     ]);
  //     state.operandB = 0;
  //   } else if (mode === "number" && !state.operandB) {
  //     state.operandA = state.operandB;
  //   } else {
  //     console.log("else? set operator -->", state.operator, state);
  //   }

  //   debugger;
  //   return state;
  // }

  static load() {
    return _instance || (_instance = new Totalizator());
  }
}

export { Totalizator };
export default Totalizator.load();

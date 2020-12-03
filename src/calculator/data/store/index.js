import { Store } from "./store.js";

let _instance = undefined;
export const singleton = () => {
  return _instance || (_instance = new Store());
};

export { Store };
export default singleton();

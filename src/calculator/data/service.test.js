import { DataService } from "./service.js";

const api = DataService.load();

describe("DataService", () => {
  beforeEach(() => {
    api.current = { operandA: "0", operator: "", operandB: "" };
  });

  test("api should be an instance", () => {
    expect(api).toBeInstanceOf(DataService);
  });

  test("should set current chunk to [1, +]", () => {
    const state = { operator: "+", operandB: "1" };
    api.current = state;

    expect(api.current).toMatchObject(state);
  });

  test("should append digits '23' to current operandB", () => {
    const state = { operator: "", operandB: "1" };
    api.current = state;
    api.append("2");
    api.append("3");

    expect(api.current).toMatchObject({ operandB: "123" });
  });

  test("should backspace N digits from current operandB", () => {
    const state = { operandB: "123" };
    const expected = { operandB: "1" };

    api.current = state;
    api.backspace();
    api.backspace();
    expect(api.current).toMatchObject(expected);

    api.append("23");
    api.backspace(2);
    expect(api.current).toMatchObject(expected);

    api.append("23");
    api.backspace(3);
    api.backspace(3);
    expect(api.current).not.toMatchObject(expected);
    expect(api.current.operandB).toEqual("0");
  });

  test("#store() should store data and insert null row", () => {
    const newRows = [["1", "+"], ["2", "+"], ["3", "*"]];

  });

  test("#get(n) should return n's values", () => {});
});

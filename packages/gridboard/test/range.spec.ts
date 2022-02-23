import { expect, it, describe } from "vitest";
import { createRange } from "../src/collection";

describe("collection range", () => {
  
  it("should create range from number", () => {
    expect(Array.isArray(createRange(0, 10))).toBeTruthy();
    expect(createRange(0, 5)).toEqual([0, 1, 2, 3, 4]);
    expect(createRange(-3, 5)).toEqual([-3, -2, -1, 0 , 1, 2, 3, 4]);
  });

  it("should create range from number", () => {
    expect(Array.isArray(createRange(5, 0))).toBeTruthy();
    expect(createRange(5, 0)).toEqual([0, 1, 2, 3, 4]);
    expect(createRange(5, -3)).toEqual([-3, -2, -1, 0 , 1, 2, 3, 4]);
  });

});

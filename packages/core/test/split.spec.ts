import { expect, it, describe } from "vitest";
import { splitSpansStringToArray } from "../src/collection";

describe("split string into array", () => {
  it("should return an array from a string", () => {
    const result = splitSpansStringToArray("0,1, 2, 3,4 ");
    expect(result).toEqual(['0', '1', '2', '3', '4']);
  });
});


import { expect, it, describe } from "vitest";
import { calculateSkippingCells, createCellSpanDefinitions, createSpanFromString } from '../src/collection';
import { CellSpan } from "../src/types";


describe("create grid spans", () => {

  it('should return null when invalid', () => {
    expect(createSpanFromString('0:1')).toBeFalsy() 
    expect(createSpanFromString('')).toBeFalsy() 
    expect(createSpanFromString('00')).toBeFalsy() 
  })

  it("should return object from raw string", () => {
  
    const result = createSpanFromString('1:2!3:4')
    const expected: CellSpan  = {
      column: 1,
      row: 3,
      rowSpan: 4,
      columnSpan: 2,
    };

    expect(result).toBeTruthy();
    expect(result).toBeTypeOf('object');
    expect(result).toEqual(expected);

  }); 


  it('should return cell span definitions', () => {
    
    const result = createCellSpanDefinitions(4, [
      createSpanFromString("0:1!0:2"),
      createSpanFromString("1:3!1:3"),
    ]);
    
    expect(result).toBeTruthy();
    expect(result).toBeTypeOf('object');
    expect(result).toEqual({ 
      0: [1, 2],
      5: [3, 3]
    });
  });


  it('should not return skipping values', () => {
    const columnSize = 4;
    const result = calculateSkippingCells(
      createCellSpanDefinitions(columnSize, []),
      columnSize,
    );

    expect(Array.isArray(result)).toBeTruthy();
    expect(result.length).toBe(0);
  })

  it('should return skipping values', () => {
    const columnSize = 4;
    const result = calculateSkippingCells(
      createCellSpanDefinitions(columnSize, [
        createSpanFromString("0:1!0:2"),
        createSpanFromString("1:3!1:3"),
      ]),
      columnSize,
    );
    expect(Array.isArray(result)).toBeTruthy();
    expect(result.length).toBe(11);
    expect(result).toEqual([
      0, 4, 5, 6, 7, 9, 10, 11, 13, 14, 15
    ]);
  })
  

});

import { CellSpan, CellSpanDefinition } from "./types";

export function createRange(from: number, to: number): number[] {
  
  if (from > to) {
    const temp = from;
    from = to;
    to = temp;
  }

  const collection: number[] = [];
  for(let i = from; i < to; i++) collection.push(i); 
  return collection;
}

export function createSpanFromString(value: string): CellSpan | null {
 
  const regex = /(\d+)\:(\d+)\!(\d+)\:(\d+)/i;
  const result = regex.exec(value);
  if (!result) return null;

  const column = parseInt(result[1]);
  const columnSpan = parseInt(result[2]);
  const row = parseInt(result[3]);
  const rowSpan = parseInt(result[4]);

  return {
    column,
    row,
    columnSpan,
    rowSpan,
  };
}

export function createCellSpanDefinitions(
  columnSize: number,
  spans: CellSpan[],
): CellSpanDefinition {
  return Object.fromEntries(
    spans.filter(Boolean).map(cell => [
      cell.column * columnSize + cell.row,
      [cell.columnSpan, cell.rowSpan],
    ])
  )
}

export function calculateSkippingCells(
  spans: CellSpanDefinition,
  columnSize: number,
): number[] {
  return Object.entries(spans).flatMap(
    ([index, [columnSpan, rowSpan]]) => {
      const i = parseInt(index);
      return createRange(0, rowSpan).flatMap((rs) => {
        return createRange(i + columnSize * rs, i + columnSize * rs + columnSpan);
      });
    }
  )
}


export function splitSpansStringToArray(value: string): string[] {
  return value.trim().split(',').map(item => item.trim());
}
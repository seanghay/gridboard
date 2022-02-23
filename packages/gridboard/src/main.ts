import {
  calculateSkippingCells,
  createCellSpanDefinitions,
  createSpanFromString,
  splitSpansStringToArray,
} from "./collection";

import type { GridBoardConfig } from "./types";

export * from './types';

export function renderGrid(
  ctx: CanvasRenderingContext2D,
  config: GridBoardConfig
): void {
  ctx.save();

  const {
    columnSize,
    rowSize,
    width: w,
    height: h,
    gapSize,
    spans: spansString,
  } = config;

  const spans = createCellSpanDefinitions(
    columnSize,
    splitSpansStringToArray(spansString).map(
      (value) => createSpanFromString(value)!
    )
  );

  const skips = calculateSkippingCells(spans, columnSize);

  let cellIndex = 0;

  for (let col = 0; col < columnSize; col++) {
    for (let row = 0; row < rowSize; row++) {
      const index = row * columnSize + col;
      const itemWidth = (w + gapSize) / columnSize;
      const itemHeight = (h + gapSize) / rowSize;
      const span = spans[index];

      if (skips.includes(index) && !span) continue;

      let spanW = 1;
      let spanH = 1;

      if (span) {
        spanW = span[0];
        spanH = span[1];
      }

      const actualWidth = itemWidth * spanW - gapSize;
      const actualHeight = itemHeight * spanH - gapSize;

      if (config.render) {
        config!.render({
          position: cellIndex,
          currentColumn: col,
          currentRow: row,
          actualWidth,
          actualHeight,
          itemHeight,
          itemWidth,
        });
      }

      cellIndex++;
    }
  }

  ctx.restore();
}

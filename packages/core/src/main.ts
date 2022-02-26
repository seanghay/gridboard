import { CanvasRenderingContext2D  } from "canvas";

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
  
  // preserve canvas state
  ctx.save();

  const {
    columnSize,
    rowSize,
    width: w, // canvas width
    height: h, // canvas height
    gapSize = 0,
    spans: spansString = '',
  } = config;

  const spans = createCellSpanDefinitions(
    columnSize,
    splitSpansStringToArray(spansString).map(
      (value) => createSpanFromString(value)!
    )
  );

  const skips = calculateSkippingCells(spans, columnSize);

  let position = 0;

  for (let col = 0; col < columnSize; col++) {
    for (let row = 0; row < rowSize; row++) {
    
      const index = row * columnSize + col;
      const itemWidth = (w + gapSize) / columnSize;
      const itemHeight = (h + gapSize) / rowSize;
    
      const span = spans[index];

      // skip cells that overlapped with span cells
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
          position,
          row,
          column: col,
          cellWidth: actualWidth,
          cellHeight: actualHeight,
          estimatedHeight: itemHeight,
          estimatedWidth: itemWidth,
        });
      }

      // increase actual cell index
      position++;
    }
  }

  // restore previous canvas state
  ctx.restore();
}

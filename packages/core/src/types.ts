export type CellSpanDefinition = { [key: string]: number[] };

export type GridBoardRenderFunc = (context: GridBoardRenderContext) => Promise<void>;

export interface GridBoardRenderContext {
  position: number;
  row: number;
  column: number;
  cellWidth: number;
  cellHeight: number;
  estimatedWidth: number;
  estimatedHeight: number;
  x: number;
  y: number;
}

export interface GridBoardConfig {
  width: number;
  height: number;
  rowSize: number;
  columnSize: number;

  spans?: string;
  gapSize?: number;
  gapEdge?: boolean;
  render?: GridBoardRenderFunc;
}

export interface CellSpan {
  row: number;
  column: number;
  rowSpan: number;
  columnSpan: number;
}


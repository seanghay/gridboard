export type CellSpanDefinition = { [key: string]: number[] };

export type GridBoardRenderFunc = (context: GridBoardRenderContext) => void;

export interface GridBoardRenderContext {
  position: number;
  currentRow: number;
  currentColumn: number;
  actualWidth: number;
  actualHeight: number;
  itemWidth: number;
  itemHeight: number;
}

export interface GridBoardConfig {
  width: number;
  height: number;
  spans: string;
  
  gapSize: number;
  rowSize: number;
  columnSize: number;

  gapEdge?: boolean;
  render?: GridBoardRenderFunc;
}

export interface CellSpan {
  row: number;
  column: number;
  rowSpan: number;
  columnSpan: number;
}

